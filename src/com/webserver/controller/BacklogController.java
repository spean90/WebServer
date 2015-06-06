package com.webserver.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.Backlog;
import com.webserver.service.IBacklogService;

@Controller
@RequestMapping("backlog")
public class BacklogController {
	private Logger logger = LoggerFactory.getLogger(BacklogController.class);
	@Resource
	private IBacklogService backlogService;
	
	@RequestMapping("getBackLogListByParams")
	@ResponseBody
	public Object getBackLogListByParams(Backlog backlog,PageBean pageBean){
		backlog.setStatus(1);
		return backlogService.getBacklogListByParams(backlog, pageBean);
	}
	@RequestMapping("lockBacklog")
	@ResponseBody
	public Object lockBacklog(Backlog backlog,HttpServletRequest request){
		ResultBean resultBean = new ResultBean();
		backlog.setUpdateTime(DateUtil.getDateTimeString(new Date()));
		int i = backlogService.lockBacklogById(backlog,request);
		if (i!=1) {
			resultBean.setCode("5000");
			resultBean.setMsg("锁单异常！");
		}
		return resultBean;
	}
	@RequestMapping("getBackLogListIds")
	@ResponseBody
	public Object getBackLogListIds(String backlogIds) {
		String[] ids = null;
		if (!StringUtils.isEmpty(backlogIds)) {
			ids = backlogIds.split(",");
		}
		return backlogService.getBackLogListIds(ids);
	}
	
	@RequestMapping("updateBacklog")
	@ResponseBody
	public Object updateBacklog(Backlog backlog,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		int i = backlogService.updateBacklog(backlog,request);
		if (i!=1) {
			resultBean.setCode("5000");
			resultBean.setMsg("锁单异常！");
		}
		return resultBean;
	}
}
