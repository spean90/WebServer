package com.webserver.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;


@Controller
public class TestController {

	@RequestMapping(value="/regular-{pid}-{name}")
	public ModelAndView regularMapping(@PathVariable(value="pid") String pid,
			@PathVariable(value="name") String name) {
		System.out.println("........name:"+name);
		ModelAndView modelAndView = new ModelAndView("index2");
		modelAndView.addObject("pid", pid); 
		modelAndView.addObject("dt",new Date());
		modelAndView.addObject("list",getList());
		return modelAndView;
	}
	
	@RequestMapping(value="/indexPage")
	public ModelAndView index() {
		ModelAndView modelAndView = new ModelAndView("detail");
		return modelAndView;
	}
	public Object getList(){
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
	
	@RequestMapping(value="/testCharts.do")
	@ResponseBody
	public Object testCharts(HttpServletRequest request,String pid,HttpServletResponse response) throws IOException {
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
		String jsonpCallback = request.getParameter("callback");//客户端请求参数  
		System.out.println("jsonpCallback: "+jsonpCallback);
		if(jsonpCallback!=null) {
			Gson gson = new Gson();
			 response.setCharacterEncoding("utf-8");
			 response.setContentType("text/javascript");
			PrintWriter out = response.getWriter();   
	        String result = gson.toJson(list);//根据需要拼装json  
	        out.println(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	        return null;
		}else {
			return list;
		}
		
	}
	  @RequestMapping("/base/json.do") 
	  @ResponseBody
	    public void exchangeJson(HttpServletRequest request,HttpServletResponse response,String name) {  
	       try {  
	    	   System.out.println(name);
	        Map<String,String> map = new HashMap<String,String>();   
	        map.put("result", "content");  
	        PrintWriter out = response.getWriter();    
	        
	        Gson gson = new Gson();
	        String result = gson.toJson(map);//根据需要拼装json  
	        String jsonpCallback = request.getParameter("callback");//客户端请求参数  
	        out.println(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	      } catch (IOException e) {  
	       e.printStackTrace();  
	      }  
	    }  
	
	
}
