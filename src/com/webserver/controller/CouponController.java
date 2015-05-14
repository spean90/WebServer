package com.webserver.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
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
	@RequestMapping("getCouponListByIds")
	@ResponseBody
	public Object getCouponListByIds(String couponIds) throws Exception {
		String[] ids = null;
		if (!StringUtils.isEmpty(couponIds)) {
			ids = couponIds.split(",");
		}
		return couponService.getCouponListByIds(ids);
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
	public Object deleteCouponById(Long couponId,String deadTime, HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		String nowTime = DateUtil.getDateTimeString(new Date());
		if (nowTime.compareTo(deadTime)<0) {
			resultBean.setCode("1001");
			resultBean.setMsg("套餐未失效，不能删除");
		}else {
			couponService.deleteCouponById(couponId, request);
		}
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
