package com.webserver.controller;

import java.util.Date;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juhedata.api.GasCardRechargeApi.CardTpye;
import com.smartgas.juhe.business.GsaCardBusiness;
import com.webserver.common.PageBean;
import com.webserver.common.ResultBean;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.StringUtil;
import com.webserver.modal.Backlog;
import com.webserver.modal.Manager;
import com.webserver.modal.OperLog;
import com.webserver.service.IBacklogService;
import com.webserver.service.IOperLogService;

@Controller
@RequestMapping("backlog")
public class BacklogController {
	private Logger logger = LoggerFactory.getLogger(BacklogController.class);
	@Resource
	private IBacklogService backlogService;
	@Resource
	private IOperLogService operLogService;
	
	@RequestMapping("getBackLogListByParams")
	@ResponseBody
	public Object getBackLogListByParams(Backlog backlog,PageBean pageBean){
		//backlog.setStatus(1);
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
	
	/**
	 * 手动处理代办充值油卡
	* @author Huangsp
	* @date 2015年6月11日 
	*
	* @param backlog
	* @param request
	* @return
	 */
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
	//使用聚合充值油卡
	@RequestMapping("juheRecharge")
	@ResponseBody
	public Object juheRecharge(Backlog backlog,HttpServletRequest request) {
		ResultBean resultBean = backlogService.juheRecharge(backlog, request);
		//操作日志
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("调用聚合充值-代办id:"+backlog.getBacklogId());
		operLog.setParams(StringUtil.toJson(backlog));
		operLogService.addOperLog(operLog);
		return resultBean;
	}
	
}
