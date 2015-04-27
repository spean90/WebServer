package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.Backlog;

public interface BacklogDao {
	
	public List<Backlog> getBacklogListByParams(@Param("backlog")Backlog backlog);
	public Backlog getBacklogById(@Param("backlogId")Long backlogId);
	public int updateBacklog(@Param("backlog")Backlog backlog);
	public int addBacklog(@Param("backlog")Backlog backlog);

}
