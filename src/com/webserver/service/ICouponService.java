package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Coupon;

public interface ICouponService {
	
	public PageData<Coupon> getCouponListByParams(Coupon coupon,PageBean pageBean) throws Exception;
	
	public int addCoupon(Coupon coupon,HttpServletRequest request);
	
	public int updateCoupon(Coupon coupon,HttpServletRequest request);
	
	public int deleteCouponById(Long couponId,HttpServletRequest request); 

}
