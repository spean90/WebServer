package com.webserver.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.GasOrderDao;
import com.webserver.modal.GasOrder;
public class TestGasOrderDao {


	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	GasOrderDao dao = context.getBean(GasOrderDao.class);
	
	@Test
	public void getListByParams(){
		GasOrder gasOrder = new GasOrder();
		gasOrder.setUserId(103l);
		dao.getGasOrderListByParams(gasOrder,null,null);
	}
	//@Test
	public void addGasOrder() {
		GasOrder gasOrder = new GasOrder();
		gasOrder.setUserId(103l);
		gasOrder.setAmount(2);
		gasOrder.setSum(2000.0);
		gasOrder.setProductId(10000l);
		dao.addGasOrder(gasOrder);
	}
}
