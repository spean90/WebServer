package com.webserver.apicontroller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.webserver.common.PageBean;
import com.webserver.modal.PlayerInfo;
import com.webserver.service.IPlayerInfoService;

@Controller
@RequestMapping("api")
public class IPlayerController {
	@Resource
	private IPlayerInfoService playerInfoServiceImpl;

	@RequestMapping("signup.do")
	@ResponseBody
	public Object signUp(String account,String password,String authCode){
		
		System.out.println("....in..sign up;...;");
		PlayerInfo playerInfo = new PlayerInfo();
		playerInfo.setAccount(account);
		playerInfo.setPassword(password);
		try {
			playerInfoServiceImpl.insertPlayer(playerInfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "success";
	}

	@RequestMapping("updatePlayer.do")
	@ResponseBody
	public Object updatePlayer(HttpServletRequest request,String account,String password,MultipartFile img){
		System.out.println("....in..uploadImg;...;");
		System.out.println("name:"+account);
		System.out.println(img.getSize());
		String basepath = request.getServletContext().getRealPath("upload");
		System.out.println(basepath);
		System.out.println(img.getOriginalFilename());
		try {
			PlayerInfo playerInfo = new PlayerInfo();
			playerInfo.setAccount(account);
			playerInfo.setPassword(password);
			playerInfo.setHeadImg(img.getBytes());
			playerInfoServiceImpl.insertPlayer(playerInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}
		
	@RequestMapping("getHeadImgById.do")
	@ResponseBody
	public void getHeadImgById(HttpServletRequest request,HttpServletResponse response,String playerId) throws Exception{
			PlayerInfo playerInfo = playerInfoServiceImpl.getPlayerInfoById(playerId);
			OutputStream out = response.getOutputStream();
			out.write(playerInfo.getHeadImg());
			out.flush();
			out.close();
	}
	@RequestMapping("getPlayerList.do")
	@ResponseBody
	public void getPlayerList(HttpServletRequest request,HttpServletResponse response,PageBean pageBean) throws Exception{
		
		
	}
	
}
