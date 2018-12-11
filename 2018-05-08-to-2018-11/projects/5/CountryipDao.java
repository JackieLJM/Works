package com.maystar.jdksuper.dba.dao.countryip;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.maystar.common.dbutils.SqlRunner;
import com.maystar.jdksuper.dba.model.countryip.Countryip;
import com.maystar.jdksuper.dba.model.geocoord.Geocoord;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.WebUtil;
@Repository
public class CountryipDao extends BaseDao{
	static Logger logger = Logger.getLogger(CountryipDao.class.getName());
	public List getAllCountryip() throws Exception {
		SqlRunner runner=new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_countryip");
		return runner.query();
	}
	public int delCountryipById(String Id) throws Exception {
			int result = 0;
			SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
			runner.appendSql("delete from tools_countryip");
			runner.buildWhere("where id = ?", Id);
			result= runner.update();
			return result;
	}
	public int updateCountryipById(Countryip countryip,String Id) throws Exception {
		int result = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		Map updateCountryipMap = new HashMap();
		updateCountryipMap.put("code", countryip.getCode());
		updateCountryipMap.put("country", countryip.getCountry());
		updateCountryipMap.put("remark", countryip.getRemark());
		runner.buildUpdateOfTable("tools_countryip", updateCountryipMap);
		runner.cleanUpdate();
		runner.appendSql(" where 1=1 ");
		runner.buildWhere("and id=?", Id);
		result = runner.update();
		return result;
	}
	public int addCountryip(Countryip countryip,String code,String country,String remark) throws Exception {
		int result = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.setInsertTable("tools_countryip");
//		runner.buildInsert("id", countryip.getId());
		runner.buildInsert("code", code);
		runner.buildInsert("country", country);
		runner.buildInsert("remark", remark);
		runner.cleanInsert();
		result = runner.update();
		return result;
	}
	public String findAddCountryipId(Countryip countryip,String code,String country,String remark ) throws Exception {
		String result;
		SqlRunner runner=new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select id from tools_countryip t");
		runner.buildWhere("where t.code =?",code);
		runner.buildWhere("and t.country =?",country);
		runner.buildWhere("and t.remark =?",remark);
		HashMap res=(HashMap)runner.query().get(0);
		result=String.valueOf(res.get("id"));
		return result;
	}
}