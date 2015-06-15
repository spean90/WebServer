package com.webserver.controller;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.webserver.common.ResultBean;
import com.webserver.common.util.AnalysisApk;

@Controller
@RequestMapping("file")
public class FileController {

	private Logger logger = LoggerFactory.getLogger(FileController.class);
	@RequestMapping("uploadApk")
	@ResponseBody
	public Object uploadApk(MultipartFile updateFile,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (updateFile == null || updateFile.isEmpty()) {
			resultBean.setCode("1001");
			resultBean.setMsg("请选择推送升级文件");
		}else {
			try {
				String localTempFile = System.getProperty("java.io.tmpdir") + File.separator + updateFile.getOriginalFilename();
				updateFile.transferTo(new File(localTempFile));
				String[] arr = AnalysisApk.unZip(localTempFile, "./");
				logger.info(arr[0] + " --- "+arr[1]);
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("version", arr[0]);
				
				String currentFile =  request.getSession().getServletContext().getRealPath("")+File.separator+"files"+File.separator+"SmartGas.apk";
				String[] currentInfo = AnalysisApk.unZip(currentFile, "./");
				if (StringUtils.isEmpty(currentInfo[0])) {
					map.put("message", "目前还没有更新过版本！");
				}else{
					map.put("message", "最近升级版本："+currentInfo[0]);
				}
				resultBean.setObject(map);
			} catch (Exception e) {
				logger.error("upload update file error", e);
				resultBean.setCode("5001");
				resultBean.setMsg("上传升级文件失败"+e.getMessage());
			}
		}
		return resultBean;
	}
	
	@RequestMapping("pushApk")
	@ResponseBody
	public Object pushApk(MultipartFile updateFile,String version ,HttpServletRequest request) {
		ResultBean resultBean = new ResultBean();
		if (StringUtils.isEmpty(version)) {
			resultBean.setCode("1001");
			resultBean.setMsg("未检测到版本号，请检查更新文件！");
		}else {
			try {
				String path = request.getSession().getServletContext().getRealPath("")+File.separator+"files";
				File filePath = new File(path);
				if (!filePath.exists()) {
					filePath.mkdirs();
				}
				String localTempFile =path +File.separator + "SmartGas.apk";
				updateFile.transferTo(new File(localTempFile));
			} catch (Exception e) {
				logger.error("upload update file error", e);
				resultBean.setCode("5001");
				resultBean.setMsg("上传升级文件失败"+e.getMessage());
			}
		}
		return resultBean;
	}
}
