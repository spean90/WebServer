package com.webserver.apicontroller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api")
public class IJuheCallbackController {

	private Logger logger = LoggerFactory.getLogger(IJuheCallbackController.class);
	@RequestMapping("juheCallback")
	public void juheCallback(HttpServletRequest request, HttpServletResponse response,PrintWriter out){
		logger.info("聚合回调。。。。。。。。。。。。。。。。。。。。。");
		out.write("success");
		out.close();
	}
}
