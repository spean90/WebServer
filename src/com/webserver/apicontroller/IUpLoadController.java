package com.webserver.apicontroller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;




import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("api")
public class IUpLoadController {

	@RequestMapping("uploadImg.do")
	@ResponseBody
	public void uploadImg(HttpServletRequest request,String name,MultipartFile file,MultipartFile file1){
		System.out.println("....in..uploadImg;...;");
		System.out.println("name:"+name);
		System.out.println(file.getSize());
		String basepath = request.getServletContext().getRealPath("video");
		System.out.println(basepath);
		System.out.println(file.getOriginalFilename());
		String fileName = file.getOriginalFilename();
		try {
			File f = new File(basepath+"/"+fileName);
			FileOutputStream fout = new FileOutputStream(f);
			fout.write(file.getBytes());
			fout.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
