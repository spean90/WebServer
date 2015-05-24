package com.webserver.modal;

import java.io.Serializable;

public class SubProduct implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long subProductId;
	private Long productId;
	private Integer month;
	private Double discount;
	private Integer status;
	
	/**
	 * 查询属性
	 */
	private Double price;
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	private String createTime;
	
	public Long getSubProductId() {
		return subProductId;
	}
	public void setSubProductId(Long subProductId) {
		this.subProductId = subProductId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	
}
