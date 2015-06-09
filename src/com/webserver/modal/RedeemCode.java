package com.webserver.modal;

import java.io.Serializable;

public class RedeemCode implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long redeemCodeId;
	private Long userId;
	private String redeemCode;
	private String couponPackageIds;
	private String packageNames;
	private String createTime;
	private Integer status;
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Long getRedeemCodeId() {
		return redeemCodeId;
	}
	public void setRedeemCodeId(Long redeemCodeId) {
		this.redeemCodeId = redeemCodeId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getRedeemCode() {
		return redeemCode;
	}
	public void setRedeemCode(String redeemCode) {
		this.redeemCode = redeemCode;
	}
	public String getCouponPackageIds() {
		return couponPackageIds;
	}
	public void setCouponPackageIds(String couponPackageIds) {
		this.couponPackageIds = couponPackageIds;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getPackageNames() {
		return packageNames;
	}
	public void setPackageNames(String packageNames) {
		this.packageNames = packageNames;
	}
	
	
}
