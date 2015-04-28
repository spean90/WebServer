package com.webserver.dao;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.Rate;

public interface RateDao {
	
	public int addRate(@Param("rate") Rate rate);
	
	public Rate getRecentRate();

}
