package com.webserver.modal;

import java.io.Serializable;

/**
 * 礼包对应优惠券
 * @author hsp
 *
 */
public class PackageCoupons implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long couponId;
	private Long couponPackageId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	
}
