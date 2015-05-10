package com.webserver.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.Coupon;
import com.webserver.service.ICouponService;
/**
 * 优惠券
 * @author hsp
 *
 */
@Controller
@RequestMapping("coupon")
public class CouponController {

	@Resource
	private ICouponService couponService;
	
	@RequestMapping("getCouponListByParams")
	@ResponseBody
	public Object getCouponListByParams(Coupon coupon,PageBean pageBean) throws Exception {
		return couponService.getCouponListByParams(coupon, pageBean);
	}
	@RequestMapping("addCoupon")
	@ResponseBody
	public Object addCoupon(Coupon coupon, HttpServletRequest request) throws Exception {
		ResultBean resultBean = new ResultBean();
		coupon.setCreateTime(DateUtil.getDateTimeString(new Date()));
		couponService.addCoupon(coupon, request);
		return resultBean;
	}
	@RequestMapping("deleteCouponById")
	@ResponseBody
	public Object deleteCouponById(Long couponId, HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		couponService.deleteCouponById(couponId, request);
		return resultBean;
	}
	@RequestMapping("updateCoupon")
	@ResponseBody
	public Object updateCoupon(Coupon coupon, HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		coupon.setCreateTime(DateUtil.getDateTimeString(new Date()));
		couponService.updateCoupon(coupon, request);
		return resultBean;
	}
	
}
