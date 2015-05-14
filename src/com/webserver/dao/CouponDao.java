package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Coupon;

/**
 * 优惠券
 * @author hsp
 *
 */
public interface CouponDao {

	public List<Coupon> getCouponListByParams(@Param("coupon")Coupon coupon,
			@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData) throws Exception;
	
	public List<Coupon> getCouponListByIds(@Param("couponIds")String[] couponIds);
	
	public int addCoupon(@Param("coupon")Coupon coupon)throws Exception;
	
	public int updateCoupon(@Param("coupon")Coupon coupon)throws Exception;
	
	public int deleteCouponById(@Param("couponId")Long couponId)throws Exception;
	
	
}
