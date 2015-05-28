package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.FeedbackDao;
import com.webserver.modal.Feedback;
import com.webserver.service.IFeedbackService;

@Service
public class FeedbackServiceImpl implements IFeedbackService {

	@Resource
	private FeedbackDao feedbackDao;
	
	@Override
	public PageData<Feedback> getFeedbackListByParams(Feedback feedback,
			PageBean pageBean) {
		PageData<Feedback> pageData = new PageData<Feedback>();
		List<Feedback> rows = feedbackDao.getFeedbackListByParams(feedback, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public void addFeedBack(Feedback feedback) {
		feedbackDao.addFeedBack(feedback);
	}

}
