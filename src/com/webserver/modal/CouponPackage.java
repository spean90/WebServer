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
	private Integer status;
	private String couponIds;
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCouponIds() {
		return couponIds;
	}
	public void setCouponIds(String couponIds) {
		this.couponIds = couponIds;
	}
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
