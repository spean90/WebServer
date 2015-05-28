package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Feedback;

public interface FeedbackDao {

	
	public List<Feedback> getFeedbackListByParams(@Param("feedback")Feedback feedback,
			@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public void addFeedBack(@Param("feedback")Feedback feedback);
	
}
