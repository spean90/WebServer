package com.webserver.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.modal.OperLog;
import com.webserver.service.IOperLogService;

@Controller
@RequestMapping("operLog")
public class OperLogController {
	@Resource
	private IOperLogService operLogService;

	@RequestMapping("getLogListByParams")
	@ResponseBody
	public Object getLogListByParams(OperLog operLog,PageBean pageBean){
		return operLogService.getOperLogListByParams(operLog, pageBean);
	}
}
