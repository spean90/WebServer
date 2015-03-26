package com.webserver.common;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SysInterceptor extends HandlerInterceptorAdapter {

	private Logger logger = LoggerFactory.getLogger(SysInterceptor.class);
	Map<String, String[]>param = null;
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		logger.info("url：   "+request.getRequestURI());
		param = request.getParameterMap();
		String paramStr = "param: ";
		for(String key: param.keySet()){
			paramStr += key+"=" +param.get(key)[0]+" , ";
		}
		logger.info(paramStr);
		String url = request.getServletPath();
		// 服务端用户登录
		if (url.startsWith("/sys/") || url.startsWith("/test/") || url.startsWith("/api/")||url.startsWith("/playertest.html")
				||url.startsWith("/common/")||url.startsWith("/regular/")||true) {
			return true;
		}
		HttpSession session = request.getSession();
		if(session.getAttribute("user") == null) {
			logger.info("session = null  ");
			response.sendError(403);
			//response.sendRedirect("/login.html");
			return false;
		}
		
		return true;
	}


	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		//System.out.println("after");
	}

	
}
