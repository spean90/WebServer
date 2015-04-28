package com.webserver.modal;

import java.io.Serializable;

/**
 * 订单表
* 
* @author Huangsp
* @date 2015年4月28日 
*
 */
public class GasOrder implements Serializable {

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long oId; //数据库自增id;主键
	private Long userId;
	private Long productId;
	private String orderId;
	private Double sum;
	private String createTime;
	private String gasAccount;
	private Integer amount;//订购套餐数量
	private String orderDesc;//订单描述；
	public Long getoId() {
		return oId;
	}
	public void setoId(Long oId) {
		this.oId = oId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public Double getSum() {
		return sum;
	}
	public void setSum(Double sum) {
		this.sum = sum;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getGasAccount() {
		return gasAccount;
	}
	public void setGasAccount(String gasAccount) {
		this.gasAccount = gasAccount;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getOrderDesc() {
		return orderDesc;
	}
	public void setOrderDesc(String orderDesc) {
		this.orderDesc = orderDesc;
	}
	
	
	
}
