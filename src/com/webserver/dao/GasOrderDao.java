package com.webserver.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.GasOrder;

public interface GasOrderDao {
	
	public List<GasOrder> getGasOrderListByParams(@Param("gasOrder")GasOrder gasOrder,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public int addGasOrder(@Param("gasOrder")GasOrder gasOrder);
	
	public List<Map<String, Object>> countProductByParams(@Param("gasOrder")GasOrder gasOrder,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData) throws Exception;

}
