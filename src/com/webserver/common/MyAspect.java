package com.webserver.common;


import org.aspectj.lang.JoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class MyAspect {

	public void afterThrowing(JoinPoint jp)
			throws Throwable {
		Logger logger = LoggerFactory.getLogger(jp.getTarget().getClass());
		logger.info("..in.."+jp.getSignature().getName()+"  args: "+ jp.getArgs().toString());
	}

	public void after(JoinPoint jp){
		Logger logger = LoggerFactory.getLogger(jp.getTarget().getClass());
		logger.info("..in.after."+jp.getSignature().getName()+"  args: "+ jp.getArgs().length);
	}
	
}
