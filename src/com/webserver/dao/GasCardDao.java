package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.GasCard;

public interface GasCardDao {
	
	public List<GasCard> getGasCardListByParams(@Param("gasCard")GasCard gasCard,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	public int addGasCard(@Param("gasCard")GasCard gasCard);
	public int deleteGasCardById(@Param("gasId")Long gasId);

}
