package com.webserver.modal;

import java.io.Serializable;
import java.util.Date;

public class PlayerInfo implements Serializable{

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Integer playerId;
	private String account;
	private String password;
	private Date addTime;
	private byte[] headImg;
	private String headImgBase64Str;
	

	/**
	 * 
	* <p>Title: </p> 
	* <p>Description: </p>
	 */
	public PlayerInfo() {
		this.addTime = new Date();
	}
	
	public String getHeadImgBase64Str() {
		return headImgBase64Str;
	}


	public void setHeadImgBase64Str(String headImgBase64Str) {
		this.headImgBase64Str = headImgBase64Str;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public Integer getPlayerId() {
		return playerId;
	}
	public void setPlayerId(Integer playerId) {
		this.playerId = playerId;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public byte[] getHeadImg() {
		return headImg;
	}
	public void setHeadImg(byte[] headImg) {
		this.headImg = headImg;
	}
	
	
}
