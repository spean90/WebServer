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
import com.webserver.modal.CouponPackage;
import com.webserver.service.ICouponPackageService;

/**
 * 优惠券礼包
 * @author hsp
 *
 */
@Controller
@RequestMapping("couponPackage")
public class CouponPackageController {
	
	@Resource
	private ICouponPackageService couponPackageService;

	@RequestMapping("getCouponPackageListByParams")
	@ResponseBody
	public Object getCouponPackageListByParams(CouponPackage couponPackage,PageBean pageBean)
			throws Exception {
		return couponPackageService.getCouponPackageListByParams(couponPackage, pageBean);
	}
	@RequestMapping("addCouponPackage")
	@ResponseBody
	public Object addCouponPackage(CouponPackage couponPackage,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		couponPackage.setCreateTime(DateUtil.getDateTimeString(new Date()));
		couponPackageService.addCouponPackage(couponPackage, request);
		return resultBean;
	}
	@RequestMapping("deleteCouponPackageById")
	@ResponseBody
	public Object deleteCouponPackageById(Long couponPackageId, HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		couponPackageService.deleteCouponPackageById(couponPackageId, request);
		return resultBean;
	}
	@RequestMapping("updateCouponPackage")
	@ResponseBody
	public Object updateCouponPackage(CouponPackage couponPackage, HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		couponPackage.setCreateTime(DateUtil.getDateTimeString(new Date()));
		couponPackageService.updateCouponPackage(couponPackage, request);
		return resultBean;
	}
}
