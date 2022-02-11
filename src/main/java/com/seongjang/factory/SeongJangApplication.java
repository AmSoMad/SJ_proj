package com.seongjang.factory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@ServletComponentScan
@SpringBootApplication
public class SeongJangApplication extends SpringBootServletInitializer{

	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(SeongJangApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SeongJangApplication.class, args);
	}

}
