package com.seongjang.factory.location.dto;

import java.awt.Polygon;
import java.time.LocalDateTime;

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
public class Dist_Info {
	private int gid;
	private int a0;
	private String a1;
	private String a2;
	private String a3;
	private String geom;
	
	
}
