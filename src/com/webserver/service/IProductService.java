package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Product;

public interface IProductService {
	
	public  PageData<Product> getProductListByParams(Product product,PageBean pageBean);
	public int addProduct(Product product);
	public int updateProduct(Product product);
	public int deleteProductById(Long productId);

}
