package com.seongjang.factory.common.controller;


import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.JsonNode;
import com.seongjang.factory.Crawler.naver.NaverCrawler;
import com.seongjang.factory.common.service.CommonService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "common")
public class CommonController {
	
	
	private final CommonService cService;
	
    @RequestMapping(value="/testForForm", method = RequestMethod.POST)
    public @ResponseBody Map<String, String> testForForm(@RequestParam Map<String, String> reqParam){

        for(Map.Entry<String, String> entry : reqParam.entrySet()){
            entry.setValue(entry.getValue() + "_testForForm");
        }

        return reqParam;
    }
    
    @RequestMapping(value="/testForJson", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public @ResponseBody Map<String, Object> testForJson(@RequestBody Map<String, Object> reqParam){

        for(Map.Entry<String, Object> entry : reqParam.entrySet()){
            entry.setValue(entry.getValue() + "_testForJson");
        }

        return reqParam;
    }
    
    

    @RequestMapping(value="/req/form")
    public @ResponseBody String reqForm(){
        JsonNode node = cService.requestHttpForm();
        return node.toPrettyString();
    }

    @RequestMapping(value="/req/json")
    public @ResponseBody String reqJson(){
        JsonNode node = cService.requestHttpJson();
        return node.toPrettyString();
    }    
    
    
    
    
    
    
    
    
	@RequestMapping(value = "/nhn/news")
    public @ResponseBody Map<String, Object> GetNews(Model model){
	//public String GetNews(Model model){
        String clientId = "1YNV3i4HXHt37G_mPeZE"; // 애플리케이션 클라이언트 아이디
        String clientSecret = "gpvWU10tFM"; // 애플리케이션 클라이언트 시크릿
        Map<String, Object> result = null;
		try { 
			NaverCrawler crawler = new NaverCrawler(); 
			String url = URLEncoder.encode("산업", "UTF-8"); 
			String response = crawler.search(clientId, clientSecret, url); 
			String[] fields = {"title","originallink","link","description","pubDate"};
			System.out.println(response); 		
			result = crawler.getResult(response, fields);
			System.out.println(result); 
		} catch (Exception e) {
		 e.printStackTrace(); 
		} 
        
        model.addAttribute("result2",result);
        return result;
		//return "industrial/nhn_News";
	}
    
}
