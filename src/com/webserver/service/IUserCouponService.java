package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserCoupon;

public interface IUserCouponService {

	public PageData<UserCoupon>  getUserCouponListByParams(UserCoupon userCoupon,PageBean pageBean);
	
	public void addUserCoupon(UserCoupon userCoupon,HttpServletRequest request);
}
