package com.seongjang.factory.Crawler.naver;

import java.net.URLEncoder;
import java.util.Map;

public class NaverMain {

	public static void main(String[] args) {
		String id = "1YNV3i4HXHt37G_mPeZE"; 
		String secret = "gpvWU10tFM"; 
		try { 
			NaverCrawler crawler = new NaverCrawler(); 
			String url = URLEncoder.encode("산업", "UTF-8"); 
			String response = crawler.search(id, secret, url); 
			String[] fields = {"title","originallink","link","description","pubDate"};
			System.out.println(response); 		
			Map<String, Object> result = crawler.getResult(response, fields);
			System.out.println(result); 
		} catch (Exception e) {
		 e.printStackTrace(); 
		} 
	} 


}
