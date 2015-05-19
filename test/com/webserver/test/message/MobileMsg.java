package com.webserver.test.message;

public class MobileMsg {
	
	private String reason;
	private Integer error_code;
	private ResultMsg result;
	
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Integer getError_code() {
		return error_code;
	}
	public void setError_code(Integer error_code) {
		this.error_code = error_code;
	}
	public ResultMsg getResult() {
		return result;
	}
	public void setResult(ResultMsg result) {
		this.result = result;
	}
	
	
}
