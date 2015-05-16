package com.webserver.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.SubProduct;
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
	
	@RequestMapping("addSubProduct")
	@ResponseBody
	public Object addSubProduct(SubProduct subProduct,HttpServletRequest request){
		subProduct.setCreateTime(DateUtil.getDateTimeString(new Date()));
		ResultBean resultBean = new ResultBean();
		subProductService.addSubProduct(subProduct, request);
		return resultBean;
	}
	@RequestMapping("updateSubProduct")
	@ResponseBody
	public Object updateSubProduct(SubProduct subProduct,HttpServletRequest request){
		subProduct.setCreateTime(DateUtil.getDateTimeString(new Date()));
		ResultBean resultBean = new ResultBean();
		subProductService.updateSubProduct(subProduct, request);
		return resultBean;
	}
}
