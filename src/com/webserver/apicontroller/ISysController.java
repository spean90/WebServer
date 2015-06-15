package com.webserver.apicontroller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.ResultBean;
import com.webserver.common.util.AnalysisApk;
import com.webserver.common.util.DateUtil;
import com.webserver.modal.DownloadLog;
import com.webserver.service.IDownloadLogService;

@Controller
@RequestMapping("api")
public class ISysController {

	Logger logger = LoggerFactory.getLogger(ISysController.class);
	@Resource
	private IDownloadLogService downloadLogService;
	
	@RequestMapping("checkUpdate")
	@ResponseBody
	public Object checkUpdate(HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		Map<String, Object> map = new HashMap<String, Object>();
		String currentFile =  request.getSession().getServletContext().getRealPath("")+File.separator+"files"+File.separator+"update.apk";
		String[] currentInfo = AnalysisApk.unZip(currentFile, "./");
		if (StringUtils.isEmpty(currentInfo[0])) {
			map.put("currentCode", "0");
		}else{
			String url = "/files/update.apk";
			map.put("versionCode", currentInfo[0]);
			map.put("url", url);
		}
		resultBean.setObject(map);
		return resultBean;
	}
	@RequestMapping("downLoadApk")
	@ResponseBody
	public void downLoadApk(DownloadLog downloadLog,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		logger.info(">>>>>>>>>>>用户下载>>>>>>>>"+downloadLog.getManagerAccount());
		downloadLog.setCreateTime(DateUtil.getDateTimeString(new Date()));
		downloadLogService.addDownloadLog(downloadLog);
		response.sendRedirect("http://115.28.65.214/files/SmartGas.apk");
		
//		String currentFile =  request.getSession().getServletContext().getRealPath("")+File.separator+"files"+File.separator+"update.apk";
//		File file = new File(currentFile);
//		 String filename = new String(file.getName().getBytes("utf-8"), "ISO-8859-1");
//		  filename = filename.replaceAll(" ", "_");
//		  response.reset();
//		  response.setContentType("application/x-msdownload;");
//		  response.addHeader("Content-Disposition", "attachment; filename=zhjy.apk" );
//		  int fileLength = (int) file.length();
//		  response.setContentLength(fileLength);
//		  //如果文件长度大于0
//		  if (fileLength != 0) {
//			   // 创建输入流
//			   InputStream inStream = null;
//			   byte[] buf = new byte[4096];
//			   // 创建输出流
//			   ServletOutputStream servletOS = null;
//			   try {
//			    inStream = new FileInputStream(file);
//			    servletOS = response.getOutputStream();
//			    int readLength;
//			    while (((readLength = inStream.read(buf)) != -1)) {
//			     servletOS.write(buf, 0, readLength);
//			    }
//			   }catch(Exception e){
//				   logger.error("err:",e);
//			   }finally{
//				   servletOS.flush();
//			   }
//		   
//		  }   
	}
}
