package com.seongjang.factory.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seongjang.factory.home.domain.Account;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:8080")
@Slf4j
@Controller
@RequiredArgsConstructor
public class MainController {

	
	@RequestMapping(value = "/")
	public String login(Model model) {
		log.info("main");
		
		return "login/sign-in";
	}

	@RequestMapping(value = "/sign_in")
	public String sign_in(Account account, Model model) {
		

		if(account.getEmail().equals("asdf") && account.getPassword().equals("asdf")) {
			log.info("sign_in --> index");
			return "index";	
		}else {
			log.info("sign_in --> sign_up");
			//return "login/sign-up";
			return "login/sign-in";
		}
		
	}
	
	@RequestMapping(value = "/sign_up")
	public String sign_up(Model model) {
		log.info("main");
		
		return "login/sign-up";
	}
	
	@RequestMapping(value = "/l_index")
	public String l_index(Model model) {
		log.info("l_index");
		
		return "l_index";
	}
	
	@RequestMapping(value = "/index")
	public String main(Model model) {
		log.info("main");
		
		return "index";
	}
	
	@RequestMapping(value = "/index2")
	public String test(Model model) {
		log.info("index2");
		
		return "index2";
	}
	
	@RequestMapping(value = "/index3")
	public String test2(Model model) {
		log.info("index3");
		
		return "index3";
	}	
	
	@RequestMapping(value = "/index4")
	public String test3(Model model) {
		log.info("index4");
		
		return "index4";
	}		
	
	@RequestMapping(value = "/law")
	public String law(Model model) {
		log.info("law");
		
		return "law";
	}		
	
	@RequestMapping(value = "/main")
	public String dashboard(Model model) {
		log.info("main");
		
		return "main";
	}			
	
	@RequestMapping(value = "/test")
	public String test_(Model model) {
		log.info("main");
		
		return "test";
	}			
	
	@RequestMapping(value = "/test2")
	public String test_2(Model model) {
		log.info("test_2");
		
		return "test2";
	}			
	
	@RequestMapping(value = "/test3")
	public String test_3(Model model) {
		log.info("test_3");
		
		return "test3";
	}			
}
