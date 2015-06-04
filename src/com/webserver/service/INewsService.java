package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.News;

public interface INewsService {

	
	public PageData<News> getNewsListByParams(News news,PageBean pageBean);
	
	public void addNews(News news);
	
	public void updateNews(News news);
}
