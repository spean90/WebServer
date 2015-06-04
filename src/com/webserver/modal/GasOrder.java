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
	private Long subProductId;
	private Long productId;
	private String orderId;
	private Double sum;
	private String createTime;
	private Long gasId;
	private Integer amount;//订购套餐数量
	private String orderDesc;//订单描述；
	private String payOrderId;//支付第三方生成的订单id;
	private Long couponId;//使用的优惠券id；
	private Double paySum;//实际支付金额  （sum-优惠券金额）
	private String payAccount;//支付账户；
	private Integer payType;//支付方式1-支付宝；2-线下支付；
	private Integer status;//订单状态;1-未支付；2-已支付；
	private String receiver;//收款人;
	private Integer delStatus; //删除状态；1为已经被删除了。失效
	
	/**
	 * 查询用的属性
	 */
	private String beginTime;
	private String endTime;
	private String productName;
	private String userName;
	private String gasAccount;
	private String company;
	

	public Integer getDelStatus() {
		return delStatus;
	}
	public void setDelStatus(Integer delStatus) {
		this.delStatus = delStatus;
	}
	public Long getGasId() {
		return gasId;
	}
	public void setGasId(Long gasId) {
		this.gasId = gasId;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPayAccount() {
		return payAccount;
	}
	public void setPayAccount(String payAccount) {
		this.payAccount = payAccount;
	}
	public Integer getPayType() {
		return payType;
	}
	public void setPayType(Integer payType) {
		this.payType = payType;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public Long getSubProductId() {
		return subProductId;
	}
	public void setSubProductId(Long subProductId) {
		this.subProductId = subProductId;
	}
	public Long getCouponId() {
		return couponId;
	}
	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}
	public Double getPaySum() {
		return paySum;
	}
	public void setPaySum(Double paySum) {
		this.paySum = paySum;
	}
	public String getPayOrderId() {
		return payOrderId;
	}
	public void setPayOrderId(String payOrderId) {
		this.payOrderId = payOrderId;
	}
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
