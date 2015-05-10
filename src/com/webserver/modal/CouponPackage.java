package com.webserver.modal;

import java.io.Serializable;

/**
 * 优惠券礼包
 * @author hsp
 *
 */
public class CouponPackage implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long couponPackageId;
	private String couponPackageName;
	private String createTime;
	private String packageDesc;
	
	public String getPackageDesc() {
		return packageDesc;
	}
	public void setPackageDesc(String packageDesc) {
		this.packageDesc = packageDesc;
	}
	public Long getCouponPackageId() {
		return couponPackageId;
	}
	public void setCouponPackageId(Long couponPackageId) {
		this.couponPackageId = couponPackageId;
	}
	public String getCouponPackageName() {
		return couponPackageName;
	}
	public void setCouponPackageName(String couponPackageName) {
		this.couponPackageName = couponPackageName;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
