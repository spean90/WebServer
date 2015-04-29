package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.BankCard;

public interface BankCardDao {
	
	public List<BankCard> getBankCardListByParams(@Param("bankCard")BankCard bankCard,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	public int addBankCard(@Param("bankCard")BankCard bankCard);
	public int deleteBankCard(@Param("bankId")Long bankId);
	

}
