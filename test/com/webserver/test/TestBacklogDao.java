package com.webserver.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.BacklogDao;
import com.webserver.modal.Backlog;

public class TestBacklogDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	BacklogDao dao  = context.getBean(BacklogDao.class);
	
	//@Test
	public void getBacklogListByParams() {
		Backlog backlog = new Backlog();
		List<Backlog> list = dao.getBacklogListByParams(backlog);
		System.out.println(list.size());
	}
	@Test
	public void addBacklog() {
		Backlog backlog = new Backlog();
		backlog.setStatus(0);
		backlog.setType(1);
		backlog.setSum(400d);
		backlog.setAccount("121312421");
		backlog.setCompany("中国石化");
		backlog.setUserId(103l);
		int i = dao.addBacklog(backlog);
		System.out.println("result:"+i);
		System.out.println(backlog.getBacklogId());
	}

}
