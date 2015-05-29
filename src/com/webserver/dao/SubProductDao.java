package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.SubProduct;

public interface SubProductDao {

	
	public List<SubProduct> getSubProductListByParam(@Param("subProduct")SubProduct subProduct);
	public void addSubProduct(@Param("subProduct")SubProduct subProduct) throws Exception;
	public void updateSubProduct(@Param("subProduct")SubProduct subProduct) throws Exception;
	public SubProduct getSubProductById(@Param("subProductId")long subProductId);
}
