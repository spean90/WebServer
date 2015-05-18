package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.CouponPackage;

/**
 * 优惠券礼包
 * @author hsp
 *
 */
public interface CouponPackageDao {

	public List<CouponPackage> getCouponPackageListByParams(@Param("couponPackage")CouponPackage couponPackage,
			@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData) throws Exception;
	
	public int addCouponPackage(@Param("couponPackage")CouponPackage couponPackage)throws Exception;
	
	public int updateCouponPackage(@Param("couponPackage")CouponPackage couponPackage)throws Exception;
	
	public int deleteCouponPackageById(@Param("couponPackageId")Long couponPackageId)throws Exception;
	
	public List<CouponPackage> getCouponPackageListByIds(@Param("couponPackageIds")String[] couponPackageIds);
	
}
