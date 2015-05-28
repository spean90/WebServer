package com.webserver.service;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Feedback;

public interface IFeedbackService {

	
	public PageData<Feedback> getFeedbackListByParams(Feedback feedback,PageBean pageBean);
	
	public void addFeedBack(Feedback feedback);
}
