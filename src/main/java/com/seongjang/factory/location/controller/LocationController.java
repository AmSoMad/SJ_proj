package com.seongjang.factory.location.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seongjang.factory.location.domain.HomeForm;
import com.seongjang.factory.location.domain.Danji_Info;
import com.seongjang.factory.location.domain.Dist_location;
import com.seongjang.factory.location.domain.Excel_Feature_info;
import com.seongjang.factory.location.domain.General_Factory_Info;
import com.seongjang.factory.location.domain.General_Title_Factory_Info;
import com.seongjang.factory.location.dto.Fac_List;
import com.seongjang.factory.location.dto.General_Factory;
import com.seongjang.factory.location.dto.KsicCode;
import com.seongjang.factory.location.dto.Supply_Companies;
import com.seongjang.factory.location.dto.Swgtr_Faclty;
import com.seongjang.factory.location.dto.Waste_Faclty;
import com.seongjang.factory.location.dto.Danji_Limit;
import com.seongjang.factory.location.dto.Dist_Info;
import com.seongjang.factory.location.service.LocService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "location")
public class LocationController {
	private final LocService loc;
	
	
	@RequestMapping(value = "/info")
	public String location(Model model, HomeForm homeForm) {
		
		model.addAttribute("v_layerList", loc.v_layerList());
		
		return "location/info";
	}
	
	@ResponseBody
	@RequestMapping(value = "/dist_Info")
	public ArrayList<Dist_Info> infoSearch(Dist_location dist_location, Model model) {
		
		//model.addAttribute("homeForm",loc.fac_Search(homeForm));
		return loc.dist_Info(dist_location); 
	}
	
	@ResponseBody
	@RequestMapping(value = "/makerlist")
	public Object infoSearch(HomeForm homeForm, Model model) {
		
		//model.addAttribute("homeForm",loc.fac_Search(homeForm));
		return loc.fac_Search(homeForm); 
	}
	
	@ResponseBody
	@RequestMapping(value = "/reg_fac_list_sandan")
	public Object reg_fac_list_sandan(HomeForm homeForm, Model model) {
		
		log.debug(homeForm.toString());
		return loc.reg_fac_list_sandan(homeForm); 
	}
	
	@ResponseBody
	@RequestMapping(value = "/ksic")
	public Object ksic_Search(KsicCode KsicCode, Model model) {
		return loc.ksic_Search(KsicCode); 
	}
	
	@ResponseBody
	@RequestMapping(value = "/ksic_keyword")
	public Object ksic_Search_keyword(KsicCode KsicCode, Model model) {
		return loc.ksic_Search_keyword(KsicCode); 
	}
	
	@RequestMapping(value = "/general_info")
	public String general_info(General_Factory_Info General_Factory_Info, Model model) {
		
		model.addAttribute("general_info",General_Factory_Info);		
		return "location/general_fac"; 
	}
	
	@RequestMapping(value = "/general_title_info")
	public String general_title_info(General_Title_Factory_Info General_Title_Factory_Info, Model model) {
		
		General_Title_Factory_Info gtf = loc.general_title_Search(General_Title_Factory_Info);
		if(gtf != null) {
			model.addAttribute("general_info",gtf);
			return "location/general_title_fac"; 
		}else {
			log.info("총괄표제부 찾기실패");
			model.addAttribute("general_info",General_Title_Factory_Info);		
			return "location/general_fac"; 
		}
	}
	
	@RequestMapping(value = "/layerList")
	public String layerList(Model model) {
		return "location/layerList"; 
	}
  //연구하자..	
	@RequestMapping(value = "/danji_Limit")
	public String danji_Limit(Danji_Info danji_info,Model model) {
		model.addAttribute("danji", loc.danji_Limit(danji_info));
		return "location/danji_info_limit"; 
	}
//	@ResponseBody
//	@RequestMapping(value = "/danji_Limit")
//	public Object danji_Limit(Danji_Info danji_info,Model model) {
//		log.info(loc.danji_Limit(danji_info).toString());
//		model.addAttribute("danji", loc.danji_Limit(danji_info));
//		return loc.danji_Limit(danji_info); 
//	}
	
	@RequestMapping(value = "/building_info")
	public String building_info(General_Factory_Info General_Factory_Info,Model model) {
		log.debug(General_Factory_Info.toString());
		model.addAttribute("general_info",loc.building_info(General_Factory_Info));		
		return "location/general_fac"; 
	}
	
	@ResponseBody
	@RequestMapping(value = "/swgtr_fclty")
	public Object swgtr_fclty(Model model) {
		
		//model.addAttribute("homeForm",loc.fac_Search(homeForm));
		return loc.swgtr_fclty(); 
	}
		
	@RequestMapping(value = "/swgtr_fclty_info")
	public Object swgtr_fclty_info(Swgtr_Faclty sf,Model model) {
		log.debug(sf.toString());
		model.addAttribute("data",loc.swgtr_fclty_info(sf));
		return "location/swgtr_fclty_info"; 
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/waste_fclty")
	public Object waste_fclty(Waste_Faclty wf,Model model) {
		
		log.debug(wf.toString());
		return loc.waste_fclty(wf); 
	}
	
	@ResponseBody
	@RequestMapping(value = "/waste_fclty_sandan")
	public Object waste_fclty_sandan(Waste_Faclty wf,Model model) {
		
		log.debug(wf.toString());
		return loc.waste_fclty_sandan(wf); 
	}
	
	@RequestMapping(value = "/waste_fclty_info")
	public Object swgtr_fclty_info(Waste_Faclty wf,Model model) {
		log.debug(wf.toString());
		model.addAttribute("data",loc.waste_fclty_info(wf));
		return "location/waste_fclty_info"; 
	}
	
	
	@RequestMapping(value = "/excel_Feature_info")
	public Object excel_Feature_info(Excel_Feature_info ef, Model model) {
		log.debug(ef.toString());
		model.addAttribute("data",ef);
		return "location/excel_Feature_info"; 
	}
	
	@ResponseBody
	@RequestMapping(value = "/supply_companies")
	public Object supply_companies(Model model) {
		
		//model.addAttribute("homeForm",loc.fac_Search(homeForm));
		return loc.Supply_Companies(); 
	}
	
	@RequestMapping(value = "/supply_companies_info")
	public String supply_companies_info(Supply_Companies sc,Model model) {
		log.debug(sc.toString());
		model.addAttribute("data",loc.supply_companies_info(sc));
		return "location/supply_companies_info"; 
	}
	
	
	@RequestMapping(value = "/fac_info")
	public Object fac_info(Fac_List fl,Model model) {
		log.debug(fl.toString());
		model.addAttribute("data",loc.fac_info(fl));
		log.debug(loc.fac_info(fl).toString());
		
		return "location/fac_info";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/Reverse_GeoCodding")
	public @ResponseBody JSONObject reverse_geocodding(Dist_location dist_location,Model model) throws ParseException {
		HttpURLConnection con = null; 
		String result = ""; 
		String baseUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json"; 
		try {
			URL url = new URL(baseUrl);
			con = (HttpURLConnection) url.openConnection(); 
			con.setRequestMethod("GET"); 
			con.setRequestProperty("X_coor", dist_location.getLoc_x()); 
			con.setRequestProperty("y_coor", dist_location.getLoc_y());
			con.setRequestProperty("addr_type", dist_location.getLoc_y());
			int responseCode = con.getResponseCode(); 
			if (responseCode == HttpURLConnection.HTTP_OK) result = readBody(con.getInputStream()); 
			else result = readBody(con.getErrorStream()); 
		} catch (Exception e) {
			System.out.println("연결 오류 : " + e); 
		}finally {
			con.disconnect();
		}
		
		JSONObject jsonObject = new JSONObject();
		jsonObject = (JSONObject) new JSONParser().parse(result);		
				
		
		return jsonObject; 
	}
	//리더부분
	public String readBody(InputStream body){
	InputStreamReader streamReader = new InputStreamReader(body); 
	try (BufferedReader lineReader = new BufferedReader(streamReader)) {
		StringBuilder responseBody = new StringBuilder(); 
		String line; 
		while ((line = lineReader.readLine()) != null) {
			responseBody.append(line); 
		} return responseBody.toString(); 
		
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e); } 
	} 
	
	
	
}
