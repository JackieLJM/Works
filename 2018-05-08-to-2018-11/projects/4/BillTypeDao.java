package com.maystar.jdksuper.dba.dao.billtype;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.StringUtils;
import com.maystar.jdksuper.dba.model.billtype.BillTypeModel;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.WebUtil;

@Repository
public class BillTypeDao extends BaseDao{
	private static Logger logger = Logger.getLogger(BillTypeDao.class);
	/**
	 * 分页、排序、查询功能
	 * @param BillTypeModel
	 * @return
	 * @throws Exception
	 */
	public Page getAllBillType(BillTypeModel billTypeModel) throws Exception{
		Page page = new Page();
	    page.setCurrentPage(billTypeModel.getPage());
	    page.setPageSize(billTypeModel.getPageSize());
		SqlRunner run = new SqlRunner(WebUtil.JdksuperDS);
		run.appendSql("select * from tools_billtype where 1=1 ");
		//普通查询
		if("normal".equals(StringUtils.changNull(billTypeModel.getQuery_mode())) && !"".equals(StringUtils.changNull(billTypeModel.getSearch_normal()))){
			run.appendSql(" and (");
			run.buildFormQueryWhere(" upper(name) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(code) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(sortmark) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(remark) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(kind) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(subkind) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(unitekind) like ?", "%"+billTypeModel.getSearch_normal().toUpperCase()+"%");
			run.appendSql(" ) ");
		}
		//高级查询
		else if("advanced".equals(StringUtils.changNull(billTypeModel.getQuery_mode()))){
			if(!StringUtils.changNull(billTypeModel.getName()).equals("")){
				run.buildFormQueryWhere(" and upper(name) like ?", "%"+billTypeModel.getName().toUpperCase()+"%");
			}
			if(!StringUtils.changNull(billTypeModel.getCode()).equals("")){
				run.buildFormQueryWhere(" and upper(code) like ?", "%"+billTypeModel.getCode().toUpperCase()+"%");
			}
		}
		billTypeModel.buildFilterSql(run);
		page.setOrderBySql(" order by " + billTypeModel.getSortSql());
		
		// 分页查询
		page = run.query(page);
		run.clear();
		return page;
	}
	
	/**
	 * @param BillTypeModel
	 * @return
	 * @throws Exception
	 */
	public Integer addBillType(BillTypeModel billTypeModel) throws Exception{
		int update = 0;
		SqlRunner run = new SqlRunner(WebUtil.JdksuperDS);
		int id	= billTypeModel.getId();
		if(id != 0){
			run.setInsertTable("tools_billtype");
			run.buildInsert("id", id);
			run.buildInsert("code", billTypeModel.getCode().trim());
			run.buildInsert("kind", billTypeModel.getKind().trim());
			run.buildInsert("remark", billTypeModel.getRemark().trim());
			run.buildInsert("subkind", billTypeModel.getSubkind().trim());
			run.buildInsert("unitekind", billTypeModel.getUnitekind().trim());
			run.buildInsert("name", billTypeModel.getName().trim());
			run.buildInsert("sortmark", billTypeModel.getSortmark());
			run.cleanInsert();
			update = run.update();
		}
		return update;
	}

	/**
	 * @param BillTypeModel
	 * @return
	 * @throws Exception
	 */
	public int updateBillType(BillTypeModel billTypeModel) throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		int result = 0;
		try {
			Map valMap = new HashMap();
			valMap.put("code", billTypeModel.getCode().trim());
			valMap.put("kind", billTypeModel.getKind().trim());
			valMap.put("remark", billTypeModel.getRemark().trim());
			valMap.put("subkind", billTypeModel.getSubkind().trim());
			valMap.put("unitekind", billTypeModel.getUnitekind().trim());
			valMap.put("name", billTypeModel.getName().trim());
			valMap.put("sortmark", billTypeModel.getSortmark());
			runner.buildUpdateOfTable("tools_billtype", valMap);
			runner.cleanUpdate();
			runner.appendSql(" where 1=1 ");
			runner.buildWhere("and id = ?", billTypeModel.getId());
			result = runner.update();
		}catch (Exception e) {
			throw e;
		}
		return result;
	}
	
	/**
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int deleteBillType(String ids) throws Exception{
		int num = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		for(String id : ids.split(",")){
			runner.clear();
			runner.appendSql("delete from tools_billtype ");
			runner.buildWhere("where id=?", Long.parseLong(id));
			num += runner.update();
		}
		return num; 
	}
	
	/**
	 * 查询ID
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Map getBillTypeById(Integer id) throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_billtype ");
		runner.buildWhere("where id=?", id);
		return runner.queryRecord();
	}
	
	public List getAllBillType() throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_billtype ");
		return runner.query();
	}
	
//	public List getAllSystemInfo() throws Exception{
//		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
//		runner.appendSql("select * from DBA_SYSTEMINFO where isconnect = '1' ");
//		return runner.query();
//	}
//	/**
//	 * 获取设备ID与系统代码的对应关系
//	 * @return
//	 * @throws Exception
//	 */
//	public List getSystemCodeList() throws Exception{
//		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
//		runner.appendSql("SELECT t.equid,d.systemcode FROM tools_equipmentinfo t,tools_detectsysteminfo d where t.systemid=d.id");
//		return runner.query();
//	}
}