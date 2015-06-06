package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.Backlog;
import com.webserver.modal.Product;
/**
 * 代办事件
 * @author hsp
 *
 */
public interface BacklogDao {
	
	public List<Backlog> getBacklogListByParams(@Param("backlog")Backlog backlog,@Param("pageBean")PageBean pageBean,
			@Param("pageData") PageData pageData);
	public Backlog getBacklogById(@Param("backlogId")Long backlogId) throws Exception;
	public int updateBacklog(@Param("backlog")Backlog backlog)throws Exception;
	public int addBacklog(@Param("backlog")Backlog backlog)throws Exception;
	public List<Backlog> getBackLogListIds(@Param("backlogIds")String[] backlogIds);
	public void activateBacklog(@Param("currentTime")String currentTime);
}
