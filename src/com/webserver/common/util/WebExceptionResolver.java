package com.webserver.common.util;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


public class WebExceptionResolver implements HandlerExceptionResolver {
	public static ThreadLocal<Exception> exceptionLocal = new ThreadLocal<Exception>();
	
	public static final Logger logger = LoggerFactory.getLogger(WebExceptionResolver.class);

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e) {
		if(handler!=null){
			logger.error(handler.getClass().getName() + ":" + e.getClass().getName());
			logger.error(handler.getClass().getName() + ":", e);
		}else{
			logger.error("出错了：",e);
		}
		int status = 500;
		response.setStatus(status);
		
		try {
			response.getWriter().write("{\"success\":false,\"status\":" + status + ",\"message\":\"" + e.getMessage() + "\"}");
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return new ModelAndView();
	}
}
