package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.DayIncome;

public interface DayIncomeDao {
	
	public List<DayIncome> getDayIncomeListByParams(@Param("dayIncome")DayIncome dayIncome,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	public int addDayIncome(@Param("dayIncome")DayIncome dayIncome);
}
