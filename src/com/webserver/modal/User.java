package com.webserver.modal;

import java.io.Serializable;

public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer uid;
	private String acount;
	private String password;
	private String realName;
	private String addTime; 
	private Integer isLock;
	private Integer roleId;
	private String addMan;
	
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public String getAcount() {
		return acount;
	}
	public void setAcount(String acount) {
		this.acount = acount;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}
	public Integer getIsLock() {
		return isLock;
	}
	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getAddMan() {
		return addMan;
	}
	public void setAddMan(String addMan) {
		this.addMan = addMan;
	}
	
}
