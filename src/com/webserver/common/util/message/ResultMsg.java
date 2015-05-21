package com.webserver.common.util.message;

public class ResultMsg {
	
	private Integer count;
	private Integer fee;
	private Integer sid;
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Integer getFee() {
		return fee;
	}
	public void setFee(Integer fee) {
		this.fee = fee;
	}
	public Integer getSid() {
		return sid;
	}
	public void setSid(Integer sid) {
		this.sid = sid;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "count:"+count+";  fee="+fee+"; sid:"+sid;
	}
	
}
