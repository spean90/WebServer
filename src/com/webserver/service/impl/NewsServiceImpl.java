package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.NewsDao;
import com.webserver.modal.News;
import com.webserver.service.INewsService;

@Service
public class NewsServiceImpl implements INewsService {

	@Resource
	private NewsDao newsDao;
	
	@Override
	public PageData<News> getNewsListByParams(News news, PageBean pageBean) {
		PageData<News> pageData = new PageData<News>();
		List<News> rows = newsDao.getNewsListByParams(news, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public void addNews(News news) {
		newsDao.addNews(news);
	}

	@Override
	public void updateNews(News news) {
		newsDao.updateNews(news);
	}

}
