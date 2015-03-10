package com.webserver.controller;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {

	@RequestMapping(value="/regular/{pid}")
	public ModelAndView regularMapping(@PathVariable(value="pid") String pid) {
		ModelAndView modelAndView = new ModelAndView("product");
		System.out.println("++++++++++++++++"+pid);
		modelAndView.addObject("pid", "你是大放送"); 
		modelAndView.addObject("dt",new Date());
		return modelAndView;
	}
	
	@RequestMapping(value="/indexPage")
	public ModelAndView index() {
		System.out.println(">>>>>>>>>>>>>>>>>>");
		ModelAndView modelAndView = new ModelAndView("detail");
		return modelAndView;
	}
}
