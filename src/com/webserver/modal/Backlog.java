package com.webserver.modal;

import java.io.Serializable;

/**
 * 待办事项表
* 
* @author Huangsp
* @date 2015年4月27日 
*
 */
public class Backlog implements Serializable {

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long backlogId;
	private Long userId;
	private String rechargeTime;//充值时间
	private String createTime;//创建时间；
	private String account;//油卡；或者提现银行卡；
	private Double sum;//金额；
	private Integer type;//1-油卡充值；2-提现；
	private String company;//油卡所属公司或开户行；
	private String owner;//持卡人；
	private Integer status;//状态：0-未生效；1-待处理；2-处理中；3-已处理；4-异常；
	private String managerAccount;//办理员工；
	private String orderId;//由哪个订单生成的；
	public Long getBacklogId() {
		return backlogId;
	}
	public void setBacklogId(Long backlogId) {
		this.backlogId = backlogId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getRechargeTime() {
		return rechargeTime;
	}
	public void setRechargeTime(String rechargeTime) {
		this.rechargeTime = rechargeTime;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public Double getSum() {
		return sum;
	}
	public void setSum(Double sum) {
		this.sum = sum;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getManagerAccount() {
		return managerAccount;
	}
	public void setManagerAccount(String managerAccount) {
		this.managerAccount = managerAccount;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	
	
	
	
}
