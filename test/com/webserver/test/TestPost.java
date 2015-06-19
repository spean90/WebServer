package com.webserver.test;

 import java.io.IOException;
 

 import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost; import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
 
 public class TestPost {
 
     public static String sendInfo(String sendurl, String data) {
         CloseableHttpClient client = HttpClients.createDefault();
         HttpPost post = new HttpPost(sendurl);
        StringEntity myEntity = new StringEntity(data,
                 ContentType.APPLICATION_JSON);// 构造请求数据
         post.setEntity(myEntity);// 设置请求体
         String responseContent = null; // 响应内容
         CloseableHttpResponse response = null;
         try {
             response = client.execute(post);
             if (response.getStatusLine().getStatusCode() == 200) {
                 HttpEntity entity = response.getEntity();
                 responseContent = EntityUtils.toString(entity, "UTF-8");
             }
         } catch (ClientProtocolException e) {
             e.printStackTrace();
         } catch (IOException e) {
             e.printStackTrace();
         } finally {
             try {
                 if (response != null)
                     response.close();
 
             } catch (IOException e) {
                 e.printStackTrace();
             } finally {
                 try {
                     if (client != null)
                         client.close();
                 } catch (IOException e) {
                     e.printStackTrace();
                 }
             }
         }
         return responseContent;
     }
 
     public static void main(String[] args) {
         final String json = "{\"name\":\"zhangsan\", \"age\":20, \"gender\": \"mail\"} ";
         for (int i = 0; i < 50; i++) {
			new Thread(new Runnable() {
				@Override
				public void run() {
					String result = sendInfo("http://foxitreader.cn/pushCallbackLog?messageId=aaaa&tag=bbbb&uuid=ddd12",json);
			         System.out.println(result);
				}
			}).start();
		}
         
     }
 }