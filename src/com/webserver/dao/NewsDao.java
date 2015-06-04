package com.webserver.dao;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.News;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface NewsDao {

	public List<News> getNewsListByParams(@Param("news")News news,@Param("pageBean")PageBean pageBean,@Param("pageData") PageData pageData);
	
	public int addNews(@Param("news")News news);
	
	public void updateNews(@Param("news")News news);
	
}
