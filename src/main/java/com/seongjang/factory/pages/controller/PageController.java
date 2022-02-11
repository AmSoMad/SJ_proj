package com.seongjang.factory.pages.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "pages")
public class PageController {

	@RequestMapping(value = "/dashboard")
	public String dashboard(Model model) {
		log.info("dashboard");
		
		return "pages/dashboard";
	}
	
	@RequestMapping(value = "/billing")
	public String billing(Model model) {
		log.info("billing");
		
		return "pages/billing";
	}
	
	@RequestMapping(value = "/profile")
	public String profile(Model model) {
		log.info("profile");
		
		return "pages/profile";
	}
	
	@RequestMapping(value = "/rtl")
	public String rtl(Model model) {
		log.info("rtl");
		
		return "pages/rtl";
	}
	
	@RequestMapping(value = "/sign_in")
	public String sign_in(Model model) {
		log.info("sign_in");
		
		return "pages/sign_in";
	}
	
	@RequestMapping(value = "/sign_up")
	public String sign_up(Model model) {
		log.info("sign_up");
		
		return "pages/sign_up";
	}
	
	@RequestMapping(value = "/tables")
	public String tables(Model model) {
		log.info("tables");
		
		return "pages/tables";
	}
	
}
