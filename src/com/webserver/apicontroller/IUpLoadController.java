package com.webserver.apicontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("api")
public class IUpLoadController {

	@RequestMapping("uploadImg.do")
	@ResponseBody
	public void uploadImg(){
		System.out.println("....in..uploadImg;...;");
	}
}
