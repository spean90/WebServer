package com.webserver.modal;

import java.io.Serializable;

/**
 * 用户表
* 
* @author Huangsp
* @date 2015年4月27日 
*
 */
public class UserInfo implements Serializable {
	
	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long userId;
	private String userName;
	private String password;
	private String addTime;
	private String idCard;//身份证号；
	private String realName;
	private String payPassword;
	private String balance;//余额
	private String frozenCapital;//冻结资金--已经提交提现申请的金额；
	private String usefullCapital;//可以取的资金；
	private String recommendId;//推荐人id;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getPayPassword() {
		return payPassword;
	}
	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}
	public String getBalance() {
		return balance;
	}
	public void setBalance(String balance) {
		this.balance = balance;
	}
	public String getFrozenCapital() {
		return frozenCapital;
	}
	public void setFrozenCapital(String frozenCapital) {
		this.frozenCapital = frozenCapital;
	}
	public String getUsefullCapital() {
		return usefullCapital;
	}
	public void setUsefullCapital(String usefullCapital) {
		this.usefullCapital = usefullCapital;
	}
	public String getRecommendId() {
		return recommendId;
	}
	public void setRecommendId(String recommendId) {
		this.recommendId = recommendId;
	}
	
	
	
	

}
