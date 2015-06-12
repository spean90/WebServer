package com.webserver.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.zxing.utils.ZxingUtils;
import com.webserver.common.PageBean;
import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.Manager;
import com.webserver.service.IManagerService;

@Controller
@RequestMapping("manager")
public class ManagerController {

	@Resource
	private IManagerService managerService;
	private Logger logger = LoggerFactory.getLogger(ManagerController.class);
	
	@RequestMapping("getManagerByAccount.do")
	@ResponseBody
	public Manager getManagerByAccount(String account) {
		//logger.info("in..getAccountByManagername."+name);
		Manager manager = managerService.getManagerByAccount(account);
		return manager;
	}
	@RequestMapping("getAllManager.do")
	@ResponseBody
	public Object getAllManager(PageBean pageBean) {
		return managerService.getAllManager(pageBean);
	}
	@RequestMapping("addManager.do")
	@ResponseBody
	public Object addManager(Manager manager,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		if (managerService.getManagerByAccount(manager.getManagerAccount())!=null) {
			result.put("success", false);
			result.put("msg","用户名已存在！");
			return result;
		};
		
		Manager oper = (Manager) request.getSession().getAttribute("manager");
		manager.setAddMan(oper.getRealName());
		manager.setAddTime(DateUtil.getDateTimeString(new Date()));
		String path =  request.getSession().getServletContext().getRealPath("")+File.separator+"files";
		ZxingUtils.createQRCode(ConstantUtil.DownloadPicPath+manager.getManagerAccount(), 200, 200, path, manager.getManagerAccount()+".png");
		manager.setPic("/files/"+manager.getManagerAccount()+".png");
		ZxingUtils.createQRCode(ConstantUtil.SignupPicPaht+manager.getManagerAccount(), 200, 200, path, manager.getManagerAccount()+"_signup.png");
		manager.setSignupPic("/files/"+manager.getManagerAccount()+"_signup.png");
		managerService.insertManager(manager,request);
		result.put("success", true);
		result.put("user", manager);
		return result;
	}
	@RequestMapping("updateManager.do")
	@ResponseBody
	public Object updateManager(Manager manager,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		managerService.updateManager(manager,request);
		result.put("success", true);
		result.put("user", manager);
		return result;
	}
	@RequestMapping("deleteManager.do")
	@ResponseBody
	public Object deleteManager(Integer uid,HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		managerService.deleteManager(uid,request);
		result.put("success", true);
		return result;
	}
}
