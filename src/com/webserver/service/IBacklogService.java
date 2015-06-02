package com.webserver.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Backlog;

public interface IBacklogService {

	public PageData<Backlog> getBacklogListByParams(Backlog backlog,PageBean pageBean);
	public Backlog getBacklogById(Long backlogId) throws Exception;
	public int updateBacklog(Backlog backlog,HttpServletRequest request);
	public int addBacklog(Backlog backlog)throws Exception;
	public int lockBacklogById(Backlog backlog,HttpServletRequest request);
	public List<Backlog> getBackLogListIds(String[] ids);
}
