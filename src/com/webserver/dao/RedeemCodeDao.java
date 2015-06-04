package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.RedeemCode;

public interface RedeemCodeDao {

	public List<RedeemCode> getRedeemCodeListByParams(@Param("RedeemCode")RedeemCode redeemCode,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public int addRedeemCode(@Param("RedeemCode")RedeemCode redeemCode);
	
	public void updateRedeemCode(@Param("RedeemCode")RedeemCode redeemCode);
	
	public List<RedeemCode> getRedeemCodeByCode(@Param("RedeemCode")RedeemCode redeemCode);
	
}
