package com.webserver.apicontroller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.ResultBean;
import com.webserver.common.util.AnalysisApk;

@Controller
@RequestMapping("api")
public class ISysController {

	Logger logger = LoggerFactory.getLogger(ISysController.class);
	
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
	
}
