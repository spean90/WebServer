package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.CouponDao;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.Coupon;
import com.webserver.modal.OperLog;
import com.webserver.service.ICouponService;

/**
 * 优惠券
 * @author hsp
 *
 */
@Service
public class CouponServiceImpl implements ICouponService {
	@Resource
	private CouponDao couponDao;
	@Resource
	private OperLogDao operLogDao;
	private Logger logger = LoggerFactory.getLogger(CouponServiceImpl.class);
	
	@Override
	public PageData<Coupon> getCouponListByParams(Coupon coupon,
			PageBean pageBean) throws Exception {
		PageData<Coupon> pageData = new PageData<Coupon>();
		List<Coupon> rows = couponDao.getCouponListByParams(coupon, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addCoupon(Coupon coupon, HttpServletRequest request)
			{
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加优惠券");
		operLog.setParams(StringUtil.toJson(coupon));
		try {
			couponDao.addCoupon(coupon);
		} catch (Exception e) {
			logger.error("添加优惠券err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 1;
	}

	@Override
	public int updateCoupon(Coupon coupon, HttpServletRequest request){
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改优惠券");
		operLog.setParams(StringUtil.toJson(coupon));
		try {
			couponDao.updateCoupon(coupon);
		} catch (Exception e) {
			logger.error("修改优惠券err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}

	@Override
	public int deleteCouponById(Long couponId, HttpServletRequest request){
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("删除优惠券");
		operLog.setParams(couponId+"");
		try {
			couponDao.deleteCouponById(couponId);
		} catch (Exception e) {
			logger.error("优惠券err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}

	@Override
	public List<Coupon> getCouponListByIds(String[] couponIds) {
		return couponDao.getCouponListByIds(couponIds);
	}

}
