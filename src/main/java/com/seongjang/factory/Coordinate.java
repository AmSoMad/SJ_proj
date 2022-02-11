package com.seongjang.factory;

import org.locationtech.proj4j.CRSFactory; 
import org.locationtech.proj4j.CoordinateReferenceSystem; 
import org.locationtech.proj4j.CoordinateTransform; 
import org.locationtech.proj4j.CoordinateTransformFactory; 
import org.locationtech.proj4j.ProjCoordinate;



public class Coordinate {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ProjCoordinate trans = transform(1139873.245417, 1680775.057503); 
		System.out.format("%s, %s", trans.x, trans.y);

		

	}
	
	public static ProjCoordinate transform(Double x, Double y) { 
		CoordinateTransformFactory ctFactory = new CoordinateTransformFactory(); 
		CRSFactory csFactory = new CRSFactory(); 
		CoordinateReferenceSystem GOOGLE = csFactory.createFromParameters(
				"EPSG:3857", 
				"+proj=merc +a=6378137 +b=6378137 "
				+ "+lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 "
				+ "+units=m +nadgrids=@null +wktext +no_defs"); 
		CoordinateReferenceSystem WGS84 = csFactory.createFromParameters("WGS84", "+proj=longlat +datum=WGS84 +no_defs"); 
		CoordinateTransform trans = ctFactory.createTransform(GOOGLE, WGS84); 
		ProjCoordinate p = new ProjCoordinate(); 
		ProjCoordinate p2 = new ProjCoordinate(); 
		p.x = x; 
		p.y = y; 
		
		return trans.transform(p, p2); 
		}

	

}
