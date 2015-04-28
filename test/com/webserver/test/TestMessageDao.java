package com.webserver.test;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.MessageDao;
import com.webserver.modal.Message;

public class TestMessageDao {

	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	MessageDao dao = context.getBean(MessageDao.class);
	DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Test
	public void getMessage() {
		Message message = new Message();
		message.setUserId(103l);
		message.setDeadline(format.format(new Date()));
		message = dao.getUserfullMessage(message);
		System.out.println(message.getCode());
	}
	//@Test
	public void addMessage() {
		Message message = new Message();
		int code  = (int) (Math.random()*10000);
		message.setCode(code+"");
		message.setUserId(103l);
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MINUTE, 10);
		message.setDeadline(format.format(c.getTime()));
		dao.addMessage(message);
		
	}
	
	
}
