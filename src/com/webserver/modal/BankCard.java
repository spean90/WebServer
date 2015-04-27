package com.webserver.modal;

import java.io.Serializable;

/**
 * 个人绑定的银行卡或支付宝
* 
* @author Huangsp
* @date 2015年4月27日 
*
 */
public class BankCard implements Serializable {
	
	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long bankId;
	private Long userId;
	private Integer accountType;//1-支付宝；2-银行卡
	private String bankAccount;
	private String owner;//持卡人姓名
	private String bank;//开户行；或者支付宝；
	public Long getBankId() {
		return bankId;
	}
	public void setBankId(Long bankId) {
		this.bankId = bankId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getAccountType() {
		return accountType;
	}
	public void setAccountType(Integer accountType) {
		this.accountType = accountType;
	}
	public String getBankAccount() {
		return bankAccount;
	}
	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
	
	

}
