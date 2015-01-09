package com.webserver.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.google.gson.Gson;
import com.webserver.dao.MenuInfoDao;
import com.webserver.dao.UserDao;
import com.webserver.modal.MenuInfo;
import com.webserver.modal.User;

public class TestDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	
	@Test
	public void testSave(){
		UserDao userDao = (UserDao) context.getBean("userDao");
		User user = new User();
		user.setAccount("abc");
		System.out.println("pre:"+user.getUid());
		userDao.insertUser(user);
		System.out.println("after:"+user.getUid());
	}
	
	//@Test
	public void testMenu(){
		MenuInfoDao menuInfoDao = (MenuInfoDao) context.getBean("menuInfoDao");
		String m = "m01,m0101,m0102,m0103,m02,m0201";
		String [] mm= m.split(",");
		List<MenuInfo> list = menuInfoDao.getMenuListByIds(mm);
		System.out.println(new Gson().toJson(list));
	}
	
}
