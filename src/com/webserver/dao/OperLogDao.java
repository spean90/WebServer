package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.OperLog;

public interface OperLogDao {

	public int addLog(@Param("operLog")OperLog operLog);
	
	public List<OperLog> getOperLogListByParams(@Param("operLog")OperLog operLog
			,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
}
