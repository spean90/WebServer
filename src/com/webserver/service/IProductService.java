package com.webserver.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Product;

public interface IProductService {
	
	public  PageData<Product> getProductListByParams(Product product,PageBean pageBean);
	public int addProduct(Product product, HttpServletRequest request);
	public int updateProduct(Product product, HttpServletRequest request);
	public int deleteProductById(Long productId, HttpServletRequest request);
	public List<Product> getProductListIds(String[] productIds);

}
