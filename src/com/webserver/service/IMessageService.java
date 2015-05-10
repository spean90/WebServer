package com.webserver.service;

import com.webserver.modal.Message;

public interface IMessageService {

	/**
	 * 获取最新可用的验证码
	 * @param message
	 * @return
	 */
	public Message getUserfullMessage(Message message);
	public int addMessage(Message message) throws Exception;
}
