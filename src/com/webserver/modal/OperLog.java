package com.webserver.modal;

import java.io.Serializable;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.util.BaseUtil;

public class OperLog implements Serializable{

	/** 
	* @Fields serialVersionUID : TODO
	*/
	private static final long serialVersionUID = 1L;
	private Long id;
	private Integer uid;
	private Date operTime;
	private String url;
	private String params;
	private String operAction; //操作描述
	private String ip;
	private Integer status;
	
	public OperLog() {
		// TODO Auto-generated constructor stub
	}
	public OperLog(HttpServletRequest request){
		Manager user = (Manager)request.getSession().getAttribute("manager");
		this.ip = BaseUtil.getRequestIp(request);
		this.uid = user.getmId();
		this.operTime = new Date();
		this.url = request.getRequestURI();
	}
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public Date getOperTime() {
		return operTime;
	}
	public void setOperTime(Date operTime) {
		this.operTime = operTime;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public String getOperAction() {
		return operAction;
	}
	public void setOperAction(String operAction) {
		this.operAction = operAction;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	
}
