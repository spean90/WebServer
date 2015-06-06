package com.webserver.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.CouponDao;
import com.webserver.dao.GasCardDao;
import com.webserver.dao.GasOrderDao;
import com.webserver.dao.ProductDao;
import com.webserver.dao.SubProductDao;
import com.webserver.dao.UserCouponDao;
import com.webserver.modal.Backlog;
import com.webserver.modal.GasCard;
import com.webserver.modal.GasOrder;
import com.webserver.modal.Product;
import com.webserver.modal.SubProduct;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IBacklogService;
import com.webserver.service.IGasOrderService;

@Service
public class GasOrderServiceImpl implements IGasOrderService {
	
	private Logger logger = LoggerFactory.getLogger(GasOrderServiceImpl.class);
	@Resource
	private GasOrderDao gasOrderDao;
	@Resource
	private SubProductDao subProductDao;
	@Resource
	private GasCardDao gasCardDao;
	@Resource
	private IBacklogService backlogServiceImpl;
	@Resource
	private UserCouponDao userCouponDao;
	@Resource
	private CouponDao couponDao;
	@Resource
	private ProductDao productDao;

	@Override
	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,
			PageBean pageBean) {
		PageData<GasOrder> pageData = new PageData<GasOrder>();
		List<GasOrder> rows = gasOrderDao.getGasOrderListByParams(gasOrder, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}
	/**
	 * 验证优惠券有效性
	 * @param CouponId
	 * @return 优惠券金额
	 */
	public int checkCoupon(Long userCouponId,Long userId,Long subProductId){
		int result = 0;
		UserCoupon userCoupon = userCouponDao.getUserCouponById(userCouponId,userId);
		if (userCoupon!=null) {
			//如果是直冲、
			if (userCoupon.getType()==1 && subProductId==null) {
				return userCoupon.getSum();
			}else{
				String productIds = userCoupon.getProductIds();
				if (!StringUtil.isEmpty(productIds)) {
					String[] ids = productIds.split(",");
					for (int i = 0; i < ids.length; i++) {
						if(subProductId.equals(ids[i])){
							return userCoupon.getSum();
						}
					}
				}else{
					//支持所有套餐
					return userCoupon.getSum();
				}
			}
		}
		return 0;
	}

	@Override
	public ResultBean  addGasOrder(GasOrder gasOrder) {
		ResultBean resultBean = new ResultBean();
		gasOrder.setOrderId(UUID.randomUUID().toString().replace("-", ""));
		gasOrder.setCreateTime(DateUtil.getDateTimeString(new Date()));
		gasOrder.setStatus(1);
		Long userCouponId = gasOrder.getUserCouponId();
		//优惠券金额
		int couponSum = 0;
		//验证优惠券是否有效
		if (userCouponId!=null&&userCouponId!=0) {
			couponSum = checkCoupon(userCouponId, gasOrder.getUserId(), gasOrder.getSubProductId());
			if(couponSum==0){
				resultBean.setCode("1001");
				resultBean.setMsg("优惠券失效，订单异常");
				return resultBean;
			}
		}
		//验证套餐是否有效
		Product product = productDao.getProductById(gasOrder.getProductId());
		if (product==null) {
			resultBean.setCode("1001");
			resultBean.setMsg("套餐失效，订单异常");
			return resultBean;
		}
		//套餐订单 
		if (gasOrder.getSubProductId()!=null && gasOrder.getSubProductId()!=0) {
			SubProduct subProduct = subProductDao.getSubProductById(gasOrder.getSubProductId());
			if (subProduct==null) {
				resultBean.setCode("1001");
				resultBean.setMsg("套餐失效，订单异常");
				return resultBean;
			}
			double orderSum = product.getPrice()*subProduct.getMonth()*subProduct.getDiscount()*gasOrder.getAmount()-couponSum;
			if (orderSum!=gasOrder.getSum()) {
				resultBean.setCode("1001");
				resultBean.setMsg("金额计算有误，订单异常");
				return resultBean;
			}
		}else{
			//直冲订单
			double orderSum = product.getPrice()*0.99*gasOrder.getAmount()-couponSum;
			if (orderSum!=gasOrder.getSum()) {
				resultBean.setCode("1001");
				resultBean.setMsg("金额计算有误，订单异常");
				return resultBean;
			}
		}
		gasOrderDao.addGasOrder(gasOrder);
		resultBean.setObject(gasOrder);
		return resultBean;
	}

	@Override
	public PageData<Map<String, Object>> countProductByParams(GasOrder gasOrder,PageBean pageBean) {
		List<Map<String, Object>> rows = null;
		PageData<Map<String, Object>> pageData = new PageData<Map<String, Object>>();
		try {
			rows = gasOrderDao.countProductByParams(gasOrder,pageBean,pageData);
			pageData.setRows(rows);
		} catch (Exception e) {
			logger.error("err:",e);
		}
		return pageData;
	}

	@Override
	public int receiveOrder(GasOrder gasOrder, HttpServletRequest request) {
		int result =0;
		try {
			//确认收到钱，更新订单状态
			result = gasOrderDao.updateGasOrder(gasOrder);
			//根据订单生产代办事件
			//获取套餐价格和月份
			double price = 0;;
			int month = 1;
			double sum = 0;
			//如果是套餐、则获取买的月数、和每月需充值多少
			if (gasOrder.getSubProductId()!=null) {
				SubProduct subProduct = subProductDao.getSubProductById(gasOrder.getSubProductId());
				price = subProduct.getPrice();
				month = subProduct.getMonth();
				sum = price * gasOrder.getAmount();
			}else{
				//如果是直冲、则month=1;
				month=1;
				sum = gasOrder.getPaySum();
			}
			
			
			//获取油卡信息
			GasCard gasCard = new GasCard();
			gasCard.setGasId(gasOrder.getGasId());
			List<GasCard> list = gasCardDao.getGasCardListByParams(gasCard, null, null);
			gasCard = list.get(0);
			Backlog backlog = null;
			
			//根据购买月份生成相印数量的代办；
			for (int i = 0; i < month; i++) {
				Calendar calendar = Calendar.getInstance();
				calendar.add(Calendar.DAY_OF_MONTH, 1);
				calendar.add(Calendar.MONTH, i);
				backlog = new Backlog();
				backlog.setUserId(gasOrder.getUserId());
				backlog.setAccount(gasCard.getGasAccount());
				backlog.setOwner(gasCard.getOwner());
				backlog.setCompany(gasCard.getCompany());
				backlog.setType(1);
				backlog.setoId(gasOrder.getoId());
				backlog.setCreateTime(DateUtil.getDateTimeString(new Date()));
				backlog.setRechargeTime(DateUtil.getDateString(calendar.getTime()));
				backlog.setSum(sum);
				backlog.setStatus(0);
				backlogServiceImpl.addBacklog(backlog);
			}
			//如果有使用优惠券。则把优惠券设置为已使用
			Long couponId = gasOrder.getCouponId();
			if (couponId!=null && couponId!=0l) {
				UserCoupon userCoupon = new UserCoupon();
				userCoupon.setCouponId(couponId);
				userCoupon.setUserId(gasOrder.getUserId());
				List<UserCoupon> userCoupons = userCouponDao.getUserCouponListByParams(userCoupon, null, null);
				if (userCoupons!=null &&userCoupons.size()>0) {
					userCoupon = userCoupons.get(0);
					userCoupon.setStatus(0);
					userCouponDao.updateUserCoupon(userCoupon);
				}
			}
			
		} catch (Exception e) {
			logger.error("确认收款出错", e);
			throw new RuntimeException("确认收款出错");
		}
		return result;
	}
	@Override
	public void updateGasOrder(GasOrder gasOrder) {
		gasOrderDao.updateGasOrder(gasOrder);
	}
	@Override
	public ResultBean cancelGasOrder(GasOrder gasOrder) {
		ResultBean resultBean = new ResultBean();
		gasOrder = gasOrderDao.getGasOrderById(gasOrder);
		if (gasOrder!=null) {
			gasOrder.setDelStatus(1);
			gasOrderDao.updateGasOrder(gasOrder);
		}else{
			resultBean.setCode("1001");
			resultBean.setMsg("未找到给订单");
		}
		return resultBean;
	}
	@Override
	public  PageData<Map<String, Object>>countSumByUser(GasOrder gasOrder,PageBean pageBean) {
		PageData<Map<String, Object>> pageData = new PageData<Map<String,Object>>();
		List<Map<String, Object>> rows = gasOrderDao.countSumByUser(gasOrder, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}
	@Override
	public Object countProductDetail(GasOrder gasOrder) {
		List<Map<String, Object>> result = gasOrderDao.countProductDetail(gasOrder);
		return result;
	}
	@Override
	public GasOrder getGasOrderById(GasOrder gasOrder) {
		// TODO Auto-generated method stub
		return gasOrderDao.getGasOrderById(gasOrder);
	}

}
