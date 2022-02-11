package com.seongjang.factory.location.repository;


import java.util.ArrayList;
import java.util.List;

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

public interface LocDto {
	
	ArrayList<LocVworldLayer> v_layerList();

	ArrayList<Fac_List> fac_Search(HomeForm homeForm);

	ArrayList<KsicCode> ksic_Search(KsicCode ksicCode);

	General_Title_Factory_Info general_title_Search(General_Title_Factory_Info general_Title_Factory_Info);

	ArrayList<KsicCode> ksic_Search_keyword(KsicCode ksicCode);

	Danji_Limit danji_Limit(Danji_Info danji_info);

	General_Factory_Info building_info(General_Factory_Info general_Factory_Info);

	ArrayList<Dist_Info> dist_Info(Dist_location dist_location);

	ArrayList<Swgtr_Faclty> swgtr_fclty();

	col_dto swgtr_fclty_info(Swgtr_Faclty sf);

	ArrayList<Waste_Faclty> waste_fclty(Waste_Faclty wf);

	col_dto waste_fclty_info(Waste_Faclty wf);

	ArrayList<Supply_Companies> Supply_Companies();

	col_dto supply_companies_info(Supply_Companies sc);

	col_dto fac_info(Fac_List fl);

	ArrayList<Waste_Faclty> waste_fclty_sandan(Waste_Faclty wf);

	ArrayList<Fac_List> reg_fac_list_sandan(HomeForm homeForm);
	
}
