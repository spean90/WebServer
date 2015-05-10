package com.webserver.service;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.CouponPackage;

public interface ICouponPackageService {
	
	public PageData<CouponPackage> getCouponPackageListByParams(CouponPackage couponPackage,PageBean pageBean) throws Exception;
	
	public int addCouponPackage(CouponPackage couponPackage,HttpServletRequest request);
	
	public int updateCouponPackage(CouponPackage couponPackage,HttpServletRequest request);
	
	public int deleteCouponPackageById(Long couponPackageId,HttpServletRequest request); 

}
