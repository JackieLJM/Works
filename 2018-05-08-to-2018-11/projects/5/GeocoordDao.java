package com.maystar.jdksuper.dba.dao.geocoord;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.maystar.common.dbutils.SqlRunner;
import com.maystar.jdksuper.dba.model.geocoord.Geocoord;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.WebUtil;
@Repository
public class GeocoordDao extends BaseDao{
	static Logger logger = Logger.getLogger(GeocoordDao.class.getName());
	public List getAllGeocoord() throws Exception{
		SqlRunner runner=new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_geocoord");
		return runner.query();
	}
	public int delGeocoordById(String Id) throws Exception {
		int result = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("delete from tools_geocoord");
		runner.buildWhere("where id = ?", Id);
		result= runner.update();
		return result;
	}
	public int updateGeocoordById(Geocoord geocoord,String Id) throws Exception {
		int result = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		Map updateCountryipMap = new HashMap();
		updateCountryipMap.put("code", geocoord.getCode());
		updateCountryipMap.put("country", geocoord.getCountry());
		updateCountryipMap.put("province", geocoord.getProvince());
		updateCountryipMap.put("city", geocoord.getCity());
		updateCountryipMap.put("longitude", geocoord.getLongitude());
		updateCountryipMap.put("latitude", geocoord.getLatitude());
		updateCountryipMap.put("country_en", geocoord.getCountry_en());
		updateCountryipMap.put("citycode", geocoord.getCitycode());
		updateCountryipMap.put("ipcode", geocoord.getIpcode());
		updateCountryipMap.put("country_code", geocoord.getCountry_code());
		updateCountryipMap.put("gpslongitude", geocoord.getGpslongitude());
		updateCountryipMap.put("gpslatitude", geocoord.getGpslatitude());
		updateCountryipMap.put("continent", geocoord.getContinent());
		updateCountryipMap.put("continent_code", geocoord.getContinent_code());
		updateCountryipMap.put("continentalias", geocoord.getContinentalias());
		runner.buildUpdateOfTable("tools_geocoord", updateCountryipMap);
		runner.cleanUpdate();
		runner.appendSql(" where 1=1 ");
		runner.buildWhere("and id=?", Id);
		result = runner.update();
		return result;
	}
	public int addGeocoord(Geocoord geocoord, long id,String code,String country,String province,String city,String longitude,String latitude,String country_en,String citycode,String ipcode,String country_code,String gpslongitude,String gpslatitude,String continent,String continent_code,String continentalias ) throws Exception {
		int result = 0;
		//不会自动生成id值，
//		System.out.println(id);
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.setInsertTable("tools_geocoord");
		runner.buildInsert("id", String.valueOf(id));
		runner.buildInsert("code", code);
		runner.buildInsert("country", country);
		runner.buildInsert("province", province);
		runner.buildInsert("city", city);
		runner.buildInsert("longitude", longitude);
		runner.buildInsert("latitude", latitude);
		runner.buildInsert("country_en", country_en);
		runner.buildInsert("citycode", citycode);
		runner.buildInsert("ipcode", ipcode);
		runner.buildInsert("country_code", country_code);
		runner.buildInsert("gpslongitude", gpslongitude);
		runner.buildInsert("gpslatitude", gpslatitude);
		runner.buildInsert("continent", continent);
		runner.buildInsert("continent_code", continent_code);
		runner.buildInsert("continentalias", continentalias);
		runner.cleanInsert();
		result = runner.update();
		return result;
	}
	public String findAddGeocoordId(Geocoord geocoord,String code,String country,String province,String city,String longitude,String latitude,String country_en,String citycode,String ipcode,String country_code,String gpslongitude,String gpslatitude,String continent,String continent_code,String continentalias ) throws Exception {
		
		String result;
		SqlRunner runner=new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select id from tools_geocoord t");
		runner.buildWhere("where t.code =?",code);
		runner.buildWhere("and t.country =?",country);
		runner.buildWhere("and t.province =?",province);
		runner.buildWhere("and t.city =?",city);
		runner.buildWhere("and t.longitude =?",longitude);
		runner.buildWhere("and t.latitude =?",latitude);
		runner.buildWhere("and t.country_en =?",country_en);
		runner.buildWhere("and t.citycode =?",citycode);
		runner.buildWhere("and t.ipcode =?",ipcode);
		runner.buildWhere("and t.country_code =?",country_code);
		runner.buildWhere("and t.gpslongitude =?",gpslongitude);
		runner.buildWhere("and t.gpslatitude =?",gpslatitude);
		runner.buildWhere("and t.continent =?",continent);
		runner.buildWhere("and t.continent_code =?",continent_code);
		runner.buildWhere("and t.continentalias =?",continentalias);
		HashMap res=(HashMap)runner.query().get(0);
		result=String.valueOf(res.get("id"));
		return result;
	}
}