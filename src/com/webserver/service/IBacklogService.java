package com.webserver.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.modal.Backlog;

public interface IBacklogService {

	public PageData<Backlog> getBacklogListByParams(Backlog backlog,PageBean pageBean);
	public Backlog getBacklogById(Long backlogId) throws Exception;
	/**
	 * 手动充值处理代办
	* @param backlog
	* @param request
	* @return
	 */
	public int updateBacklog(Backlog backlog,HttpServletRequest request);
	/**
	 * 使用聚合数据充值油卡
	* @param backlog
	* @param request
	* @return
	 */
	public ResultBean juheRecharge(Backlog backlog,HttpServletRequest request);
	public boolean juheRechargeCallback(Backlog backlog);
	public Backlog getBacklogByBacklog(Backlog backlog);
	public int addBacklog(Backlog backlog)throws Exception;
	public int lockBacklogById(Backlog backlog,HttpServletRequest request);
	public List<Backlog> getBackLogListIds(String[] ids);
	public int countUnPaySum();
}
