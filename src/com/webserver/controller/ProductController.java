package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Product;
import com.webserver.service.IProductService;

@Controller
@RequestMapping("product")
public class ProductController {

	
	@Resource
	private IProductService productService;
	
	@RequestMapping("getProductListByParams")
	@ResponseBody
	public Object getProductListByParams(Product product,PageBean pageBean) {
		PageData<Product> pageData = productService.getProductListByParams(product, pageBean);
		return pageData;
	}
	@RequestMapping("getProductListIds")
	@ResponseBody
	public Object getProductListIds(String productIds) {
		String[] ids = null;
		if (!StringUtils.isEmpty(productIds)) {
			ids = productIds.split(",");
		}
		return productService.getProductListIds(ids);
	}
}
