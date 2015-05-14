package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.SubProduct;

public interface SubProductDao {

	
	public List<SubProduct> getSubProductListByProductId(@Param("productId")Long productId);
}
