package com.webserver.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.InterruptedIOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.SSLException;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpUtil {
	
	public static void main(String[] args) {
		HttpUtil.doGet("http://localhost/testCharts.do");
	}
	
	private static Logger logger = LoggerFactory.getLogger(HttpUtil.class);
	private static HttpClient httpClient;
	public static HttpClient getHttpClient() {
		if (httpClient==null) {
			Builder builder = RequestConfig.custom()
				    .setSocketTimeout(1000)
				    .setConnectTimeout(3000);
			RequestConfig config = builder.build();
			//指点该httpget的cofig;也可以通过下面指点client的config来实现；
			//httpGet.setConfig(config);
			//根据builder创建制定的client;
			HttpClientBuilder builder2 = HttpClients.custom().setDefaultRequestConfig(config).setRetryHandler(retryHandler);
			httpClient = builder2.build();
			return httpClient;
		}else{
			return httpClient;
		}
		
	}
	
	public static Object doGet(String url) {
		//String url =  "http://webservice.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionProvince?";
		HttpGet httpGet = new HttpGet(url);
		//创建默认的httpclient;
		//HttpClient httpClient = HttpClients.createDefault();
		try {
			HttpResponse httpResponse = getHttpClient().execute(httpGet);
			printResponse(httpResponse);
			httpResponse = null;
		} catch (Exception e) {
			logger.error("httpGet err :", e);
		}
		httpGet = null;
		return null;
	}
	/**
	 * 简单的post请求
	* @author Huangsp
	* @date 2015年1月23日 
	*
	 */
	public static  void httpSimplePost() {
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("mobileCode", "13850857602"));
		params.add(new BasicNameValuePair("userID", ""));
		HttpPost httpPost = new HttpPost("http://webservice.webxml.com.cn/WebServices/MobileCodeWS.asmx/getMobileCodeInfo");
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(params, Consts.UTF_8);
		entity.setContentType("application/x-www-form-urlencoded;charset=utf-8");
		httpPost.setEntity(entity);
		//HttpClient httpClient = HttpClients.createDefault();
		//设置redirect策略；
		LaxRedirectStrategy redirectStrategy = new LaxRedirectStrategy();
		CloseableHttpClient httpClient = HttpClients.custom()
		        .setRedirectStrategy(redirectStrategy)
		        .build();
		try {
			HttpResponse response = httpClient.execute(httpPost);
			printResponse(response);
		} catch (Exception e) {
			logger.error("httpPost err :", e);
		}
	}
	
	
	public static void printResponse(HttpResponse httpResponse) {
		StatusLine line = httpResponse.getStatusLine();
		logger.debug(line.toString());
		Header[] headers = httpResponse.getAllHeaders();
		for (Header header : headers) {
			logger.debug(header.getName()+"  :  "+header.getValue());
		}
		logger.debug("================header end==========");
		logger.debug("================body==========");
		try {
			HttpEntity entity = httpResponse.getEntity();
			long len = entity.getContentLength();
			if (len!=-1 || len<2048) {
				logger.debug("使用EntityUtils..."+len);
				logger.debug(EntityUtils.toString(entity));
			}else{
				logger.debug("entity长度过长使用inputstream...."+len);
				BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent()));
				String s = "";
				while((s=reader.readLine())!=null) {
					System.out.println(s);
				}
			}
		} catch (Exception e) {
			logger.error("printResponse err :", e);
		}
		logger.debug("================body end==========");
	}
	
	
	 static HttpRequestRetryHandler retryHandler = new HttpRequestRetryHandler() {
	      
	      /**
	       * exception异常信息；
	       * executionCount：重连次数；
	       * context：上下文
	       */
	      @Override
	      public boolean retryRequest(IOException exception, int executionCount,HttpContext context) {

	    	  logger.error("重连接次数："+executionCount);
	        
	        if (executionCount >= 3) {//如果连接次数超过5次，就不进行重复连接
	          return false;
	        }
	        if (exception instanceof InterruptedIOException) {//io操作中断
	          return false;
	        }
	        if (exception instanceof UnknownHostException) {//未找到主机
	          // Unknown host
	          return false;
	        }
	        if (exception instanceof ConnectTimeoutException) {//连接超时
	          return true;
	        }
	        if (exception instanceof SSLException) {
	          // SSL handshake exception
	          return false;
	        }
	        HttpClientContext clientContext = HttpClientContext.adapt(context);
	        
	        HttpRequest request = clientContext.getRequest();
	        
	        boolean idempotent = !(request instanceof HttpEntityEnclosingRequest);
	        
	        if (idempotent) {
	          // Retry if the request is considered idempotent
	          return true;
	        }
	        return false;
	      }
	    };
	

}
