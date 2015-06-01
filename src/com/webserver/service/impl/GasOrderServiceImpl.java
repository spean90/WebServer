package com.webserver.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.DateUtil;
import com.webserver.dao.GasCardDao;
import com.webserver.dao.GasOrderDao;
import com.webserver.dao.SubProductDao;
import com.webserver.dao.UserCouponDao;
import com.webserver.modal.Backlog;
import com.webserver.modal.GasCard;
import com.webserver.modal.GasOrder;
import com.webserver.modal.SubProduct;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IBacklogService;
import com.webserver.service.IGasOrderService;
import com.webserver.service.IUserCouponService;

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

	@Override
	public PageData<GasOrder> getGasOrderListByParams(GasOrder gasOrder,
			PageBean pageBean) {
		PageData<GasOrder> pageData = new PageData<GasOrder>();
		List<GasOrder> rows = gasOrderDao.getGasOrderListByParams(gasOrder, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addGasOrder(GasOrder gasOrder) {
		return gasOrderDao.addGasOrder(gasOrder);
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
			gasCard.setGasAccount(gasOrder.getGasAccount());
			List<GasCard> list = gasCardDao.getGasCardListByParams(gasCard, null, null);
			gasCard = list.get(0);
			Backlog backlog = null;
			Calendar calendar = Calendar.getInstance();
			//calendar.set(Calendar.DAY_OF_MONTH, 1);
			//根据购买月份生成相印数量的代办；
			for (int i = 0; i < month; i++) {
				backlog = new Backlog();
				backlog.setUserId(gasOrder.getUserId());
				backlog.setAccount(gasCard.getGasAccount());
				backlog.setOwner(gasCard.getOwner());
				backlog.setCompany(gasCard.getCompany());
				backlog.setType(1);
				backlog.setOrderId(gasOrder.getOrderId());
				backlog.setCreateTime(DateUtil.getDateTimeString(new Date()));
				backlog.setRechargeTime(DateUtil.getDateString(calendar.getTime()));
				backlog.setSum(sum);
				backlog.setStatus(0);
				backlogServiceImpl.addBacklog(backlog);
				calendar.add(Calendar.MONTH, 1);
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

}
