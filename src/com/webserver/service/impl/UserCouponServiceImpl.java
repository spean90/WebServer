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
import com.webserver.dao.OperLogDao;
import com.webserver.dao.UserCouponDao;
import com.webserver.modal.OperLog;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IUserCouponService;

@Service
public class UserCouponServiceImpl implements IUserCouponService {

	private Logger logger = LoggerFactory.getLogger(UserCouponServiceImpl.class);
	@Resource
	private UserCouponDao userCouponDao;
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

}
