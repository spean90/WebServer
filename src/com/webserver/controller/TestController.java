package com.webserver.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class TestController {

	@RequestMapping(value="/regular/{pid}")
	public ModelAndView regularMapping(@PathVariable(value="pid") String pid) {
		ModelAndView modelAndView = new ModelAndView("product");
		modelAndView.addObject("pid", pid); 
		modelAndView.addObject("dt",new Date());
		modelAndView.addObject("list",testCharts("11"));
		return modelAndView;
	}
	
	@RequestMapping(value="/indexPage")
	public ModelAndView index() {
		ModelAndView modelAndView = new ModelAndView("detail");
		return modelAndView;
	}
	
	@RequestMapping(value="/testCharts.do")
	@ResponseBody
	public Object testCharts(String pid) {
		DecimalFormat format = new DecimalFormat("#0.00");
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		Map<String, Object> map = null;
		Random random = new Random();
		for (int i = 0; i < 5; i++) {
			map = new HashMap<String, Object>();
			map.put("label", i+1+"月");
			map.put("value", format.format(random.nextFloat()*1000));
			map.put("color","008ee4");
			list.add(map);
		}
		return list;
	}
}
