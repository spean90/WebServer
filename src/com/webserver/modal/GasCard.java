package com.webserver.modal;

import java.io.Serializable;

/**
 * 油卡
* 
* @author Huangsp
* @date 2015年4月28日 
*
 */
public class GasCard implements Serializable {

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long gasId;
	private Long userId;
	private String gasAccount;
	private String company;
	private String owner;
	private String phone;
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Long getGasId() {
		return gasId;
	}
	public void setGasId(Long gasId) {
		this.gasId = gasId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getGasAccount() {
		return gasAccount;
	}
	public void setGasAccount(String gasAccount) {
		this.gasAccount = gasAccount;
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
	
	
}
