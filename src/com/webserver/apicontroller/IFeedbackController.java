package com.webserver.apicontroller;

import java.util.Date;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.Feedback;
import com.webserver.service.IFeedbackService;

@Controller
@RequestMapping("api")
public class IFeedbackController {
	private Logger logger = LoggerFactory.getLogger(IFeedbackController.class);
	
	@Resource
	private IFeedbackService feedbackService;
	
	@RequestMapping("addFeedback")
	@ResponseBody
	public Object addFeedback(Feedback feedback,String token){
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, feedback.getUserId())) {
			try {
				feedback.setCreateTime(DateUtil.getDateTimeString(new Date()));
				feedbackService.addFeedBack(feedback);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	
	@RequestMapping("getFeedbackList")
	@ResponseBody
	public Object getFeedbackList(Feedback feedback,String token,PageBean pageBean){
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, feedback.getUserId())) {
			try {
				PageData<Feedback> pageData = feedbackService.getFeedbackListByParams(feedback, pageBean);
				resultBean.setObject(pageData);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
}
