package com.seongjang.factory.common.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface CommonService {

	public JsonNode requestHttpForm();
	
	public JsonNode requestHttpJson();
	
}
