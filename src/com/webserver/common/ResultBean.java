package com.webserver.common;

import java.util.Date;

import com.webserver.common.util.DateUtil;

public class ResultBean {

	private String code = "0000";
	private String msg = "成功";
	private String time = DateUtil.getDateTimeString(new Date());
	private Object object;
	private String token;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	
}
