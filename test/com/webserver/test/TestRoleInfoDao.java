package com.webserver.test;


import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.RoleInfoDao;
import com.webserver.modal.RoleInfo;

public class TestRoleInfoDao {

	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	
//	@Test
//	public void testAdd() {
//		RoleInfoDao roleInfoDao = (RoleInfoDao) context.getBean("roleInfoDao");
//		RoleInfo role = new RoleInfo();
//		role.setAddMan("test");
//		role.setAddTime("2014-12-8 17:22:22");
//		role.setOwnMenus("m01,m0102,m0103,m02,m0201,");
//		role.setRoleName("管理员");
//		roleInfoDao.insertRole(role);
//	}
//	
//	@Test
//	public void testGet() {
//		RoleInfoDao roleInfoDao = (RoleInfoDao) context.getBean("roleInfoDao");
//		System.out.println(roleInfoDao.getAllRole().size());
//	}
//	@Test
//	public void testGetByID() {
//		RoleInfoDao roleInfoDao = (RoleInfoDao) context.getBean("roleInfoDao");
//		System.out.println(roleInfoDao.getRoleById(10000).getRoleName());
//	}
//	@Test
//	public void update() {
//		RoleInfoDao roleInfoDao = (RoleInfoDao) context.getBean("roleInfoDao");
//		RoleInfo role = new RoleInfo();
//		role.setRoleId(10001);
//		role.setAddMan("test");
//		role.setAddTime("2014-12-8 17:22:22");
//		role.setOwnMenus("m01,m0102,m02,m0201,");
//		role.setRoleName("管理员");
//		roleInfoDao.updateRole(role);
//	}
	@Test
	public void testDelete() {
		RoleInfoDao roleInfoDao = (RoleInfoDao) context.getBean("roleInfoDao");
		roleInfoDao.deleteRoleById(10002);
	}
	
}
