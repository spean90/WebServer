package com.webserver.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.MessageDao;
import com.webserver.modal.Message;
import com.webserver.service.IMessageService;

@Service
public class MessageServiceImpl implements IMessageService {

	@Resource
	private MessageDao messageDao;
	
	@Override
	public Message getUserfullMessage(Message message) {
		return messageDao.getUserfullMessage(message);
	}

	@Override
	public int addMessage(Message message) throws Exception {
		return messageDao.addMessage(message);
	}

}
