package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.PackageCoupons;

public interface PackageCouponsDao {
	
	public List<PackageCoupons> getPackageCouponsListByParams(@Param("packageCoupons")PackageCoupons packageCoupons,
			@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	public int addPackageCoupons(@Param("packageCoupons")PackageCoupons packageCoupons);
	public int deletePackageCouponsByParams(@Param("packageCoupons")PackageCoupons packageCoupons);
}
