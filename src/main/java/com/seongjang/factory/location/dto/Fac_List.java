package com.seongjang.factory.location.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Fac_List extends General_Factory{

	private String comp_nm;
	private String int_nm;
	private String fac_addr;
	private String ind_code;
	//private int feel_idx;
	private String fac_no;
	private String loc_x;
	private String loc_y;
	
	
}
