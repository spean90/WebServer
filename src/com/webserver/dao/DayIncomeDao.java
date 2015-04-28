package com.webserver.dao;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.DayIncome;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface DayIncomeDao {
	
	public List<DayIncome> getDayIncomeListByParams(@Param("dayIncome")DayIncome dayIncome,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData<Map<String, Object>> pageData);
	public int addDayIncome(@Param("dayIncome")DayIncome dayIncome);
}
