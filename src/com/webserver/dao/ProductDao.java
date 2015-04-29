package com.webserver.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Product;

public interface ProductDao {
	
	public List<Product> getProductListByParams(@Param("product")Product product,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public int addProduct(@Param("product")Product product);
	
	public int deleteProductById(@Param("productId")Long productId);
	
	public int updateProduct(@Param("product")Product product);

}
