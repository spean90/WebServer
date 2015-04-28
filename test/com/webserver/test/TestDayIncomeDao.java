package com.webserver.test;

import java.util.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.DayIncomeDao;
import com.webserver.modal.DayIncome;

public class TestDayIncomeDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	DayIncomeDao dao = context.getBean(DayIncomeDao.class);
	
	
	//@Test
	public void addDayIncome() {
		DayIncome dayIncome = new DayIncome();
		dayIncome.setUserId(103l);
		dayIncome.setSum(10.5);
		dayIncome.setCreateTime(new Date().toLocaleString());
		dao.addDayIncome(dayIncome);
	}

	@Test
	public void getListByParams() {
		DayIncome dayIncome = new DayIncome();
		dayIncome.setUserId(103l);
		dao.getDayIncomeListByParams(dayIncome,null,null);
	}
}
