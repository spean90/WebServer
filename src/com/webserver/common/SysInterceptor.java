package com.webserver.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SysInterceptor extends HandlerInterceptorAdapter {

	
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		System.out.println("in......intercept...");
		String url = request.getServletPath();
		// 服务端用户登录
		if (url.startsWith("/sys/") || url.startsWith("/test/") || url.startsWith("/api/")) {
			return true;
		}
		HttpSession session = request.getSession();
		if(session.getAttribute("user") == null) {
			response.sendRedirect("/index.html");
			return false;
		}
		
		return true;
	}


	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		System.out.println("after");
	}

	
}
