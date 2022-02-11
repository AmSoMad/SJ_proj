package com.seongjang.factory.location.dto;


import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Builder;
import lombok.Getter;

import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class LocVworldLayer {

	private int v_no;
	private String han_name;
	private String wms_name;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime credt_dt;
}
