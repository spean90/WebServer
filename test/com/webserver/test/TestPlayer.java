package com.webserver.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.PlayerInfoDao;
import com.webserver.modal.PlayerInfo;

public class TestPlayer {

	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	
	@Test
	public void testDelete() {
		PlayerInfoDao playerInfoDao = (PlayerInfoDao) context.getBean("playerInfoDao");
		PlayerInfo playerInfo = playerInfoDao.getPlayerById("100002");
		System.out.println(playerInfo.getHeadImg().length);
	}
}
