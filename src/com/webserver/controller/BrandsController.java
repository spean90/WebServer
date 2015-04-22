package com.webserver.controller;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BrandsController {

	
	@RequestMapping(value="/brands_{bid}")
	public ModelAndView brands(@PathVariable(value="bid") String bid) {
		ModelAndView modelAndView = new ModelAndView("category");
		modelAndView.addObject("bid", bid); 
		return modelAndView;
	}
	@RequestMapping(value="/index")
	public ModelAndView index() {
		ModelAndView modelAndView = new ModelAndView("index");
		return modelAndView;
	}
	@RequestMapping(value="/register.html")
	public ModelAndView goToregister() {
		ModelAndView modelAndView = new ModelAndView("register");
		return modelAndView;
	}
}
