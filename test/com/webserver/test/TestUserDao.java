package com.webserver.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.UserInfoDao;
import com.webserver.modal.UserInfo;

public class TestUserDao {
	
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	UserInfoDao dao = context.getBean(UserInfoDao.class);
	//@Test
	public void getUserList() throws Exception{
		UserInfo userInfo = new UserInfo();
		userInfo.setUserName("1");
		List<UserInfo> list = dao.getUserListByParams(userInfo,null,null);
		System.out.println(list.size());
	}
	//@Test
	public void addUser() throws Exception {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserName("1");
		userInfo.setIdCard("1243");
		int i = dao.addUser(userInfo);
		System.out.println("result:"+i);
		System.out.println(userInfo.getUserId());
	}
	//@Test
	public void updateUser() throws Exception {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(104l);
		userInfo.setUserName("1");
		userInfo.setIdCard("12433333333");
		int i = dao.updateUser(userInfo);
		System.out.println("result:"+i);
		System.out.println(userInfo.getUserId());
	}
	@Test
	public void deleteUserById() throws Exception {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(104l);
		int i = dao.deleteUserById(userInfo.getUserId());
		System.out.println("result:"+i);
	}
}
