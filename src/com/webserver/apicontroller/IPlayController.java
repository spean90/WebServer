package com.webserver.apicontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("api")
public class IPlayController {

	@RequestMapping("signup.do")
	@ResponseBody
	public void signUp(){
		System.out.println("....in..sign up;...;");
	}
}
