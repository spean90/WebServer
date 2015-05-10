package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Coupon;

public interface ICouponService {
	
	public PageData<Coupon> getgetCouponListByParams(Coupon coupon,PageBean pageBean) throws Exception;
	
	public int addCoupon(@Param("coupon")Coupon coupon,HttpServletRequest request);
	
	public int updateCoupon(@Param("coupon")Coupon coupon,HttpServletRequest request);
	
	public int deleteCouponById(@Param("couponId")Long couponId,HttpServletRequest request); 

}
