package com.seongjang.factory.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class Supply_Companies {
	
	private int no;
	private String company_nm;
	private String c_number;
	private String loc_x;
	private String loc_y;

}
