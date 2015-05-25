package com.webserver.modal;

import java.io.Serializable;

public class UserCoupon implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long userId;
	private Long couponId;
	private Long couponPackageId;
	private String createTime;
	private Integer status;//1-未使用，0-已使用
	
	/**
	 * 查询有用的属性。
	 */
	private String couponName;
	private Integer type; //类型（1-直冲抵用;2-购买套餐抵用)
	private Integer isDeliver; //是否可以转赠
	private Integer sum;//金额
	private String couponDesc;
	private String deadTime;
	private String productIds;
	
	
	
	
	

	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public String getCouponName() {
		return couponName;
	}
	public void setCouponName(String couponName) {
		this.couponName = couponName;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getIsDeliver() {
		return isDeliver;
	}
	public void setIsDeliver(Integer isDeliver) {
		this.isDeliver = isDeliver;
	}
	public Integer getSum() {
		return sum;
	}
	public void setSum(Integer sum) {
		this.sum = sum;
	}
	public String getCouponDesc() {
		return couponDesc;
	}
	public void setCouponDesc(String couponDesc) {
		this.couponDesc = couponDesc;
	}
	public String getDeadTime() {
		return deadTime;
	}
	public void setDeadTime(String deadTime) {
		this.deadTime = deadTime;
	}
	public String getProductIds() {
		return productIds;
	}
	public void setProductIds(String productIds) {
		this.productIds = productIds;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getCouponId() {
		return couponId;
	}
	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}
	public Long getCouponPackageId() {
		return couponPackageId;
	}
	public void setCouponPackageId(Long couponPackageId) {
		this.couponPackageId = couponPackageId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
}
