package com.seongjang.factory.common.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService{
	
	
	
	@Override
	public JsonNode requestHttpForm() {
	        HttpClient client = HttpClientBuilder.create().build();
	        HttpPost httpPost = new HttpPost("http://localhost:55333/common/testForForm");
	        try {

	            List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(1);

	            nameValuePairs.add(new BasicNameValuePair("Email", "youremail"));
	            nameValuePairs.add(new BasicNameValuePair("Passwd", "yourpassword"));
	            nameValuePairs.add(new BasicNameValuePair("accountType", "GOOGLE"));
	            nameValuePairs.add(new BasicNameValuePair("source", "Google-cURL-Example"));
	            nameValuePairs.add(new BasicNameValuePair("service", "ac2dm"));
	            
	            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

	            HttpResponse response = client.execute(httpPost);

	            if (response.getStatusLine().getStatusCode() == 200) {
	                ResponseHandler<String> handler = new BasicResponseHandler();
	                String body = handler.handleResponse(response);
	                System.out.println("[RESPONSE] requestHttpForm() " + body);

	                ObjectMapper objectMapper = new ObjectMapper();
	                JsonNode node = objectMapper.readTree(body);

	                return node;

	            } else {
	                System.out.println("response is error : " + response.getStatusLine().getStatusCode());
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		return null;
	}

	@Override
	public JsonNode requestHttpJson() {
        HttpClient client = HttpClientBuilder.create().build(); // HttpClient 생성
        HttpPost httpPost = new HttpPost("http://localhost:55333/common/testForJson"); //POST 메소드 URL 새성
        try {
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Connection", "keep-alive");
            httpPost.setHeader("Content-Type", "application/json");

            httpPost.setEntity(new StringEntity("{"
            		+ "\"Email\":\"youremail\""
            		+ ",\"Passwd\":\"yourpassword\""
            		+ ",\"accountType\":\"GOOGLE\""
            		+ ",\"source\":\"Google-cURL-Example\""
            		+ ",\"service\":\"ac2dm\""
            		+ "}")); //json 메시지 입력
            
            //Map 등으로 파라미터들을 받아서 처리해야 하는 경우에는 
            //ObjectMapper 등의 객체를 이용하여 json 을 String으로 변환해서 사용
            
            HttpResponse response = client.execute(httpPost);

            //Response 출력
            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
                System.out.println("[RESPONSE] requestHttpJson() " + body);

                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode node = objectMapper.readTree(body);

                return node;
            } else {
                System.out.println("response is error : " + response.getStatusLine().getStatusCode());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
		return null;
	}

}
