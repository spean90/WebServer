package com.webserver.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public interface ISysService {
	
	/**
	 * 管理员登陆
	 * @param account
	 * @param password
	 * @param authCode
	 * @return
	 */
	public Map<String, Object> login(HttpServletRequest request,String account, String password, String authCode);
	
	/**
	 * 生成验证码
	 * 
	 * @return
	 */
	public Map<String, Object> createAuthcode(HttpSession httpSession);
}