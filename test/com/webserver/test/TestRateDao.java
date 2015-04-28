package com.webserver.test;

import java.util.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.RateDao;
import com.webserver.modal.Rate;

public class TestRateDao {
	
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	RateDao dao = context.getBean(RateDao.class);
	
	//@Test
	public void addRate() {
		Rate rate = new Rate();
		rate.setCreateTime(new Date().toLocaleString());
		rate.setmId(10000l);
		rate.setRate(5.5);
		dao.addRate(rate);
	}
	@Test
	public void getRecentRate() {
		Rate rate = dao.getRecentRate();
		System.out.println(rate.getRateId());
	}

}
