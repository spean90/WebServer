package com.webserver.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.common.PageBean;
import com.webserver.dao.BankCardDao;
import com.webserver.modal.BankCard;

public class TestBankCardDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	BankCardDao dao = context.getBean(BankCardDao.class);
	
	//@Test
	public void getListByParams() {
		BankCard bankCard = new BankCard();
		List<BankCard> list = dao.getBankCardListByParams(bankCard, new PageBean());
		System.out.println(list.size());
	}
	
	//@Test
	public void addBankCard() {
		BankCard bankCard = new BankCard();
		bankCard.setBank("光大银行");
		bankCard.setUserId(103l);
		bankCard.setAccountType(2);
		bankCard.setBankAccount("6226......");
		bankCard.setOwner("hsp");
		int result = dao.addBankCard(bankCard);
		System.out.println("result:"+result);
		System.out.println(bankCard.getBankId());
	}
	//@Test
	public void deleteBankCard() {
		int result = dao.deleteBankCard(1l);
		System.out.println("result:"+result);
	}
	
	

}
