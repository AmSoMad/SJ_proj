package com.seongjang.factory.location.repository;

import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import com.seongjang.factory.location.domain.General_Title_Factory_Info;
import com.seongjang.factory.location.domain.HomeForm;
import com.seongjang.factory.location.domain.Danji_Info;
import com.seongjang.factory.location.domain.Dist_location;
import com.seongjang.factory.location.domain.General_Factory_Info;
import com.seongjang.factory.location.dto.LocVworldLayer;
import com.seongjang.factory.location.dto.Swgtr_Faclty;
import com.seongjang.factory.location.dto.Waste_Faclty;
import com.seongjang.factory.location.dto.col_dto;
import com.seongjang.factory.location.dto.Danji_Limit;
import com.seongjang.factory.location.dto.Dist_Info;
import com.seongjang.factory.location.dto.Fac_List;
import com.seongjang.factory.location.dto.KsicCode;
import com.seongjang.factory.location.dto.Supply_Companies;
import com.seongjang.factory.location.dto.fac_info;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class LocDtoImpl implements LocDto {
	
	private final LocMapper locMapper;
	@Override
	public ArrayList<LocVworldLayer> v_layerList() {
		
		return locMapper.v_layerList();
	}
	@Override
	public ArrayList<Fac_List> fac_Search(HomeForm homeForm) {
		// TODO Auto-generated method stub
		log.info("Dto"+homeForm.getInd_code());
		return locMapper.fac_Search(homeForm);
	}
	@Override
	public ArrayList<KsicCode> ksic_Search(KsicCode ksicCode) {
		// TODO Auto-generated method stub
		return locMapper.ksic_Search(ksicCode);
	}
	@Override
	public General_Title_Factory_Info general_title_Search(General_Title_Factory_Info general_Title_Factory_Info) {
		// TODO Auto-generated method stub
		return locMapper.general_title_Search(general_Title_Factory_Info);
	}
	@Override
	public ArrayList<KsicCode> ksic_Search_keyword(KsicCode ksicCode) {
		// TODO Auto-generated method stub
		return locMapper.ksic_Search_keyword(ksicCode);
	}
	@Override
	public Danji_Limit danji_Limit(Danji_Info danji_info) {
		// TODO Auto-generated method stub
		return locMapper.danji_Limit(danji_info);
	}
	@Override
	public General_Factory_Info building_info(General_Factory_Info general_Factory_Info) {
		// TODO Auto-generated method stub
		return locMapper.building_info(general_Factory_Info);
	}
	@Override
	public ArrayList<Dist_Info> dist_Info(Dist_location dist_location) {
		// TODO Auto-generated method stub
		return locMapper.dist_Info(dist_location);
	}
	@Override
	public ArrayList<Swgtr_Faclty> swgtr_fclty() {
		// TODO Auto-generated method stub
		return locMapper.swgtr_fclty();
	}
	@Override
	public col_dto swgtr_fclty_info(Swgtr_Faclty sf) {
		// TODO Auto-generated method stub
		return locMapper.swgtr_fclty_info(sf);
	}
	@Override
	public ArrayList<Waste_Faclty> waste_fclty(Waste_Faclty wf) {
		// TODO Auto-generated method stub
		return locMapper.waste_fclty(wf);
	}
	@Override
	public col_dto waste_fclty_info(Waste_Faclty wf) {
		// TODO Auto-generated method stub
		return locMapper.waste_fclty_info(wf);
	}
	@Override
	public ArrayList<Supply_Companies> Supply_Companies() {
		// TODO Auto-generated method stub
		return locMapper.Supply_Companies();
	}
	@Override
	public col_dto supply_companies_info(Supply_Companies sc) {
		// TODO Auto-generated method stub
		return locMapper.supply_companies_info(sc);
	}
	@Override
	public col_dto fac_info(Fac_List fl) {
		// TODO Auto-generated method stub
		return locMapper.fac_info(fl);
	}
	@Override
	public ArrayList<Waste_Faclty> waste_fclty_sandan(Waste_Faclty wf) {
		// TODO Auto-generated method stub
		return locMapper.waste_fclty_sandan(wf);
	}
	@Override
	public ArrayList<Fac_List> reg_fac_list_sandan(HomeForm homeForm) {
		// TODO Auto-generated method stub
		return locMapper.reg_fac_list_sandan(homeForm);
	}

}
