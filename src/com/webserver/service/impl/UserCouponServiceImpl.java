package com.webserver.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.CouponDao;
import com.webserver.dao.CouponPackageDao;
import com.webserver.dao.OperLogDao;
import com.webserver.dao.UserCouponDao;
import com.webserver.modal.Coupon;
import com.webserver.modal.CouponPackage;
import com.webserver.modal.OperLog;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IUserCouponService;

@Service
public class UserCouponServiceImpl implements IUserCouponService {

	private Logger logger = LoggerFactory.getLogger(UserCouponServiceImpl.class);
	@Resource
	private UserCouponDao userCouponDao;
	@Resource
	private CouponPackageDao couponPackageDao;
	@Resource
	private CouponDao couponDao;
	@Resource
	private OperLogDao operLogDao;
	@Override
	public PageData<UserCoupon> getUserCouponListByParams(
			UserCoupon userCoupon, PageBean pageBean) {
		PageData<UserCoupon> pageData = new PageData<UserCoupon>();
		List<UserCoupon> rows = userCouponDao.getUserCouponListByParams(userCoupon, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public void addUserCoupon(UserCoupon userCoupon, HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("发送优惠券");
		operLog.setParams(StringUtil.toJson(userCoupon));
		try {
			userCouponDao.addUserCoupon(userCoupon);
		} catch (Exception e) {
			logger.error("发送优惠券err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
	}

	@Override
	public void addUserCouponByPackageId(Long userId, String couponPackageIds,
			HttpServletRequest request) {
		String[] packageIds = couponPackageIds.split(",");
		List<CouponPackage> packages = couponPackageDao.getCouponPackageListByIds(packageIds);
		if (packages!=null &&packages.size()>0) {
			List<Coupon> coupons = null;
			String couponIds = "";
			String[] cids = null;
			UserCoupon userCoupon = null;
			for (CouponPackage couponPackage : packages) {
				couponIds = couponPackage.getCouponIds();
				cids = couponIds.split(",");
				OperLog operLog = new OperLog(request);
				operLog.setOperAction("发送优惠礼包");
				operLog.setParams(StringUtil.toJson(couponPackage));
				for (String cid : cids) {
					userCoupon = new UserCoupon();
					userCoupon.setUserId(userId);
					userCoupon.setCouponId(Long.parseLong(cid));
					userCoupon.setCouponPackageId(couponPackage.getCouponPackageId());
					userCoupon.setCreateTime(DateUtil.getDateTimeString(new Date()));
					userCoupon.setStatus(1);
					userCouponDao.addUserCoupon(userCoupon);
				}
				operLogDao.addLog(operLog);
			}
		}
	}

}
