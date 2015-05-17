package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.UserCoupon;

public interface UserCouponDao {

	public List<UserCoupon> getUserCouponListByParams(@Param("userCoupon")UserCoupon userCoupon,
			@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public int addUserCoupon(@Param("userCoupon")UserCoupon userCoupon);
	
	public int updateUserCoupon(@Param("userCoupon")UserCoupon userCoupon);
	
}
