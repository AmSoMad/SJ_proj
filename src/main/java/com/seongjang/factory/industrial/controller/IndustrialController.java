package com.seongjang.factory.industrial.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seongjang.factory.location.domain.HomeForm;
import com.seongjang.factory.location.service.LocService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "industrial")
public class IndustrialController {
	private final LocService loc;
	
	
	@RequestMapping(value = "/search")
	public String location(Model model, HomeForm homeForm) {
		
		
		
		return "industrial/industrial_search";
	}
}
