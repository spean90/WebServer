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
	private Long gasId;
	private String account;//油卡；或者提现银行卡；
	private Double sum;//金额；
	private Integer type;//1-油卡充值；2-提现；
	private String company;//油卡所属公司或开户行；
	private String owner;//持卡人；
	private Integer status;//状态：0-未生效；1-待处理；2-处理中；3-已处理；4-异常；5-已退款;6-充值成功；7-充值失败；
	private String managerAccount;//办理员工；
	private Long oId;//由哪个订单生成的；
	private String updateTime;//处理时间
	private String result;//处理结果
	private Integer gasCardStatus;//油卡状态
	private String orderId;//订单号
	private String juheOrderId;//聚合充值订单id
	private String juheRechargeTime;//聚合充值时间
	private String phone;//油卡绑定电话
	private String juheId;//聚合流水号
	private Integer juheResult;//聚合结果
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
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
	
	public Long getoId() {
		return oId;
	}
	public void setoId(Long oId) {
		this.oId = oId;
	}
	public Long getGasId() {
		return gasId;
	}
	public void setGasId(Long gasId) {
		this.gasId = gasId;
	}
	public Integer getGasCardStatus() {
		return gasCardStatus;
	}
	public void setGasCardStatus(Integer gasCardStatus) {
		this.gasCardStatus = gasCardStatus;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getJuheOrderId() {
		return juheOrderId;
	}
	public void setJuheOrderId(String juheOrderId) {
		this.juheOrderId = juheOrderId;
	}
	public String getJuheRechargeTime() {
		return juheRechargeTime;
	}
	public void setJuheRechargeTime(String juheRechargeTime) {
		this.juheRechargeTime = juheRechargeTime;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getJuheId() {
		return juheId;
	}
	public void setJuheId(String juheId) {
		this.juheId = juheId;
	}
	public Integer getJuheResult() {
		return juheResult;
	}
	public void setJuheResult(Integer juheResult) {
		this.juheResult = juheResult;
	}
	
	
}
