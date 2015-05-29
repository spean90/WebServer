package com.webserver.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.SubProduct;

public interface ISubProductService {

	public List<SubProduct> getSubProductListByParam(SubProduct subProduct);
	
	public void addSubProduct(SubProduct subProduct,HttpServletRequest request);
	
	public void updateSubProduct(SubProduct subProduct,HttpServletRequest request);
}
