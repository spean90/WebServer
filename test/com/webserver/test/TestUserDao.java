package com.webserver.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.UserDao;
import com.webserver.modal.User;

public class TestUserDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	
	@Test
	public void testSave(){
		UserDao userDao = (UserDao) context.getBean("userDao");
		User user = userDao.getAccountByUsername("hsp");
		System.out.println(user.getUserName()+"  "+user.getTel());
	}
}
