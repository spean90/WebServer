package com.webserver.test;

import java.util.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.NewsDao;
import com.webserver.modal.News;

public class TestNewsDao {
	
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	NewsDao dao = context.getBean(NewsDao.class);
	
	//@Test
	public void addNews() {
		News news = new News();
		news.setCreateTime(new Date().toLocaleString());
		news.setStatus(1);
		news.setContent("消息2");
		news.setTitle("标题2");
		news.setUserId(103l);
		dao.addNews(news);
		
	}
	
	@Test
	public void getList() {
		News news = new News();
		news.setStatus(0);
		news.setUserId(103l);
		dao.getNewsListByParams(news, null, null);
	}
	

}
