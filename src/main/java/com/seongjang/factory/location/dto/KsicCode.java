package com.seongjang.factory.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class KsicCode {

	private String ksic_no;
	private String ksic_nm;
	private String ksic_nm_eng;
	private String ksic_info;
	private String ksic_kw;
	private String div_code;
}
