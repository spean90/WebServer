package com.webserver.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Backlog;

public interface BacklogDao {
	
	public List<Backlog> getBacklogListByParams(@Param("backlog")Backlog backlog,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData<Map<String, Object>> pageData);
	public Backlog getBacklogById(@Param("backlogId")Long backlogId);
	public int updateBacklog(@Param("backlog")Backlog backlog);
	public int addBacklog(@Param("backlog")Backlog backlog);

}
