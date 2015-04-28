package com.webserver.modal;

import java.io.Serializable;

public class Rate implements Serializable{
	
	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long rateId;
	private Long mId; //创建人id;
	private String createTime;
	private Double rate;
	public Long getRateId() {
		return rateId;
	}
	public void setRateId(Long rateId) {
		this.rateId = rateId;
	}
	public Long getmId() {
		return mId;
	}
	public void setmId(Long mId) {
		this.mId = mId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public Double getRate() {
		return rate;
	}
	public void setRate(Double rate) {
		this.rate = rate;
	}
	
	
}
