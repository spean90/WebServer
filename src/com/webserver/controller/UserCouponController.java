package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.webserver.common.PageBean;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IUserCouponService;

@Controller
@RequestMapping("userCoupon")
public class UserCouponController {

	@Resource
	private IUserCouponService userCouponService;
	
	public Object getUserCouponListByParams(UserCoupon userCoupon,PageBean pageBean){
		return userCouponService.getUserCouponListByParams(userCoupon, pageBean);
	}
}
