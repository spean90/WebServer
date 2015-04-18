package com.webserver.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

@Controller
public class DemoController {

	@RequestMapping("getCity.do")
	public void getCityList(HttpServletResponse response,HttpServletRequest request) {
		try {  
	        Map<String,Object> map = new HashMap<String,Object>();   
	        ArrayList<Map<String, Object>> cityList = new ArrayList<Map<String,Object>>();
	        for (int i = 0; i < 25; i++) {
				Map<String, Object> m = new HashMap<String, Object>();
				m.put("name", "福建"+i);
				m.put("id", i);
				ArrayList<Map<String, Object>> city = new ArrayList<Map<String,Object>>();
				for (int j = 0; j < 8; j++) {
					Map<String, Object> c = new HashMap<String, Object>();
					c.put("name", "福州"+i+"-"+j);
					c.put("id", j);
					city.add(c);
				}
				m.put("city", city);
				cityList.add(m);
			}
	        
	        map.put("result", cityList);  
	        response.setCharacterEncoding("utf-8");
			response.setContentType("text/javascript");
	        PrintWriter out = response.getWriter();    
	        Gson gson = new Gson();
	        String result = gson.toJson(map);//根据需要拼装json  
	        String jsonpCallback = request.getParameter("callback");//客户端请求参数  
	        out.write(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	      } catch (IOException e) {  
	       e.printStackTrace();  
	      }  
	}
	@RequestMapping("searchPhone")
	@ResponseBody
	public void searchPhone(String keyWord,HttpServletResponse response,HttpServletRequest request) throws Exception{
		 Map<String,Object> map = new HashMap<String,Object>(); 
		 Map<String,Object> phone = new HashMap<String,Object>(); 
		 List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		 for (int i = 0; i < 5; i++) {
			 phone = new HashMap<String,Object>(); 
			 phone.put("phoneName", "abc"+i);
			 phone.put("num", 1111);
			 list.add(phone);
		}
		 map.put("result", list); 
		 response.setCharacterEncoding("utf-8");
			response.setContentType("text/javascript");
	        PrintWriter out = response.getWriter();    
	        Gson gson = new Gson();
	        String result = gson.toJson(map);//根据需要拼装json  
	        String jsonpCallback = request.getParameter("callback");//客户端请求参数  
	        out.write(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	}
	
	@RequestMapping("getHotPhone")
	@ResponseBody
	public void getHotPhone(HttpServletResponse response,HttpServletRequest request) throws Exception{
		 Map<String,Object> map = new HashMap<String,Object>(); 
		 Map<String,Object> msg = new HashMap<String,Object>(); 
		 Map<String,Object> content = new HashMap<String,Object>();
		 msg.put("code", "0000");
		 Map<String,Object> phone = new HashMap<String,Object>(); 
		 List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		 for (int i = 0; i < Math.random()*5; i++) {
			 phone = new HashMap<String,Object>(); 
			 phone.put("phoneName", "abc"+i);
			 phone.put("num", 1111);
			 list.add(phone);
		}
		 content.put("list", list);
		 map.put("content", content); 
		 map.put("msg", msg);
		 response.setCharacterEncoding("utf-8");
			response.setContentType("text/javascript");
	        PrintWriter out = response.getWriter();    
	        Gson gson = new Gson();
	        String result = gson.toJson(map);//根据需要拼装json  
	        String jsonpCallback = request.getParameter("callback");//客户端请求参数  
	        out.write(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	}
	@RequestMapping("removeFromcar")
	@ResponseBody
	public void removeFromcar(HttpServletResponse response,HttpServletRequest request) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>(); 
		 Map<String,Object> msg = new HashMap<String,Object>(); 
		 Map<String,Object> content = new HashMap<String,Object>();
		 msg.put("code", "0000");
		 Map<String,Object> phone = new HashMap<String,Object>(); 
		 List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		 for (int i = 0; i < Math.random()*5; i++) {
			 phone = new HashMap<String,Object>(); 
			 phone.put("phoneName", "abc"+i);
			 phone.put("num", 1111);
			 list.add(phone);
		}
		 content.put("list", list);
		 map.put("content", content); 
		 map.put("msg", msg);
		 response.setCharacterEncoding("utf-8");
			response.setContentType("text/javascript");
	        PrintWriter out = response.getWriter();    
	        Gson gson = new Gson();
	        String result = gson.toJson(map);//根据需要拼装json  
	        String jsonpCallback = request.getParameter("callback");//客户端请求参数  
	        out.write(jsonpCallback+"("+result+")");//返回jsonp格式数据  
	        out.flush();  
	        out.close();  
	}
	@RequestMapping(value="/detail-{pid}")
	public ModelAndView getDetail(@PathVariable(value="pid") String pid){
		
		ModelAndView modelAndView = new ModelAndView("detail");
		modelAndView.addObject("pid", pid);
		return modelAndView;
		
	}
	
}
