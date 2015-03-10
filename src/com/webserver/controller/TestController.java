package com.webserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {

	@RequestMapping(value="/regular/{pid}")
	public ModelAndView regularMapping(@PathVariable(value="pid") String pid) {
		ModelAndView modelAndView = new ModelAndView("detail");
		System.out.println("++++++++++++++++"+pid);
		modelAndView.addObject("pid", pid); 
		return modelAndView;
	}
	
	@RequestMapping(value="/indexPage")
	public ModelAndView index() {
		System.out.println(">>>>>>>>>>>>>>>>>>");
		ModelAndView modelAndView = new ModelAndView("login");
		return modelAndView;
	}
}
