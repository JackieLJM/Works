package com.maystar.jdksuper.dba.dao.operatetype;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.StringUtils;
import com.maystar.jdksuper.dba.model.operatetype.OperateTypeModel;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.WebUtil;

@Repository
public class OperateTypeDao extends BaseDao{
	private static Logger logger = Logger.getLogger(OperateTypeDao.class);
	/**
	 * 分页、排序、查询功能
	 * @param operateType
	 * @return
	 * @throws Exception
	 */
	public Page getAllOperateType(OperateTypeModel operateType) throws Exception{
		Page page = new Page();
	    page.setCurrentPage(operateType.getPage());
	    page.setPageSize(operateType.getPageSize());
		SqlRunner run = new SqlRunner(WebUtil.JdksuperDS);
		run.appendSql("select * from tools_operatetype where 1=1 ");
		//普通查询
		if("normal".equals(StringUtils.changNull(operateType.getQuery_mode())) && !"".equals(StringUtils.changNull(operateType.getSearch_normal()))){
			run.appendSql(" and (");
			run.buildFormQueryWhere(" upper(name) like ?", "%"+operateType.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(code) like ?", "%"+operateType.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(servertype) like ?", "%"+operateType.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(remark) like ?", "%"+operateType.getSearch_normal().toUpperCase()+"%");
			run.buildFormQueryWhere(" or upper(direction) like ?", "%"+operateType.getSearch_normal().toUpperCase()+"%");
			run.appendSql(" ) ");
		}
		//高级查询
		else if("advanced".equals(StringUtils.changNull(operateType.getQuery_mode()))){
			if(!StringUtils.changNull(operateType.getName()).equals("")){
				run.buildFormQueryWhere(" and upper(name) like ?", "%"+operateType.getName().toUpperCase()+"%");
			}
			if(!StringUtils.changNull(operateType.getCode()).equals("")){
				run.buildFormQueryWhere(" and upper(code) like ?", "%"+operateType.getCode().toUpperCase()+"%");
			}
		}
		operateType.buildFilterSql(run);
		page.setOrderBySql(" order by " + operateType.getSortSql());
		
		// 分页查询
		page = run.query(page);
		run.clear();
		return page;
	}
	
	/**
	 * @param operateType
	 * @return
	 * @throws Exception
	 */
	public Integer addOperateType(OperateTypeModel operateType) throws Exception{
		int update = 0;
		SqlRunner run = new SqlRunner(WebUtil.JdksuperDS);
		int id	= operateType.getId();
		if(id != 0){
			run.setInsertTable("tools_operatetype");
			run.buildInsert("id", id);
			run.buildInsert("code", operateType.getCode().trim());
			run.buildInsert("remark", operateType.getRemark().trim());
			run.buildInsert("servertype", operateType.getServertype().trim());
			run.buildInsert("name", operateType.getName().trim());
			run.buildInsert("direction", operateType.getDirection());
			run.cleanInsert();
			update = run.update();
		}
		return update;
	}

	/**
	 * @param operateType
	 * @return
	 * @throws Exception
	 */
	public int updateOperateType(OperateTypeModel operateType) throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		int result = 0;
		try {
			Map valMap = new HashMap();
			valMap.put("code", operateType.getCode().trim());
			valMap.put("servertype", operateType.getServertype().trim());
			valMap.put("remark", operateType.getRemark().trim());
			valMap.put("name", operateType.getName().trim());
			valMap.put("direction", operateType.getDirection());
			runner.buildUpdateOfTable("dba_operateType", valMap);
			runner.cleanUpdate();
			runner.appendSql(" where 1=1 ");
			runner.buildWhere("and id = ?", operateType.getId());
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
	public int deleteOperateType(String ids) throws Exception{
		int num = 0;
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		for(String id : ids.split(",")){
			runner.clear();
			runner.appendSql("delete from tools_operatetype ");
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
	public Map getOperateTypeById(Integer id) throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_operatetype ");
		runner.buildWhere("where id=?", id);
		return runner.queryRecord();
	}
	
	public List getAllOperateType() throws Exception{
		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
		runner.appendSql("select * from tools_operateType ");
		return runner.query();
	}
	
//	public List getAllSystemInfo() throws Exception{
//		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
//		runner.appendSql("select * from DBA_SYSTEMINFO where isconnect = '1' ");
//		return runner.query();
//	}
	/**
	 * 获取设备ID与系统代码的对应关系
	 * @return
	 * @throws Exception
	 */
//	public List getSystemCodeList() throws Exception{
//		SqlRunner runner = new SqlRunner(WebUtil.JdksuperDS);
//		runner.appendSql("SELECT t.equid,d.systemcode FROM dba_equipmentinfo t,dba_detectsysteminfo d where t.systemid=d.id");
//		return runner.query();
//	}
}