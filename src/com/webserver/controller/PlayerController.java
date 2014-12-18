package com.webserver.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageBean;
import com.webserver.modal.PlayerInfo;
import com.webserver.service.IPlayerInfoService;

@Controller
@RequestMapping("player")
public class PlayerController {

	@Resource
	private IPlayerInfoService playerInfoServiceImpl;

	@RequestMapping("getPlayerList.do")
	@ResponseBody
	public Object getPlayerList(HttpServletRequest request,HttpServletResponse response,PageBean pageBean) throws Exception{
		
		return playerInfoServiceImpl.getPlayerListByPage(new PlayerInfo(), pageBean);
	}
}
