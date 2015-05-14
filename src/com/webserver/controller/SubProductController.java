package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.service.ISubProductService;

@Controller
@RequestMapping("subProduct")
public class SubProductController {

	@Resource
	private ISubProductService subProductService;
	
	@RequestMapping("getSubProductListByProductId")
	@ResponseBody
	public Object getSubProductListByProductId(Long productId){
		return subProductService.getSubProductListByProductId(productId);
	}
	
}
