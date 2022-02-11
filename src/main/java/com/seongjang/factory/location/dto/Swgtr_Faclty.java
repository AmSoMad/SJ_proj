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
public class Swgtr_Faclty{
	
	private int no;
	private String si;
	private String gungu;
	private String fclty;
	private String addr;
	private String loc_x;
	private String loc_y;


	
	
}
