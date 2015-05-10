package com.webserver.dao;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.Message;

public interface MessageDao {
	
	public Message getUserfullMessage(@Param("message")Message message);
	public int addMessage(@Param("message")Message message) throws Exception;
}
