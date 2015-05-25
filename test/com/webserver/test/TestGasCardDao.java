package com.webserver.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.GasCardDao;
import com.webserver.modal.GasCard;

public class TestGasCardDao {
	
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	GasCardDao dao = context.getBean(GasCardDao.class);
	
	//@Test
	public void getListByParams() {
		GasCard gasCard = new GasCard();
		gasCard.setUserId(103l);
		dao.getGasCardListByParams(gasCard,null,null);
	}

	@Test
	public void addGasCard() {
		GasCard gasCard = new GasCard();
		gasCard.setUserId(101l);
		gasCard.setCompany("中国石化");
		gasCard.setGasAccount("110");
		dao.addGasCard(gasCard);
		System.out.println(gasCard.getGasId());
	}
	
	//@Test
	public void deleteGasCard() {
		dao.deleteGasCardById(1l);
	}
	
}
