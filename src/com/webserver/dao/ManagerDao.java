package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Manager;



public interface ManagerDao {

	public Manager getManagerByAccount(@Param("managerAccount")String managerAccount);
	
	public List<Manager> login(@Param("managerAccount")String managerAccount,@Param("password")String password);
	
	public int insertManager(@Param("manager")Manager manager);
	
	public List<Manager> getManagerByParams(@Param("manager") Manager manager,@Param("pageBean")PageBean pageBean,
			@Param("pageData")PageData pageData);
	
	public int updateManager(@Param("manager") Manager manager);
	public int deleteManagerById(@Param("uId")Integer uId);
}
