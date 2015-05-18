package com.webserver.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.ResultBean;
import com.webserver.modal.UserCoupon;
import com.webserver.service.IUserCouponService;

@Controller
@RequestMapping("userCoupon")
public class UserCouponController {

	@Resource
	private IUserCouponService userCouponService;
	
	@RequestMapping("getUserCouponListByParams")
	@ResponseBody
	public Object getUserCouponListByParams(UserCoupon userCoupon,PageBean pageBean){
		return userCouponService.getUserCouponListByParams(userCoupon, pageBean);
	}
	
	@RequestMapping("addUserCoupon")
	@ResponseBody
	public Object addUserCoupon(Long userId,String couponPackageIds,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (!StringUtils.isEmpty(couponPackageIds)) {
		}
		return resultBean;
	}
}
