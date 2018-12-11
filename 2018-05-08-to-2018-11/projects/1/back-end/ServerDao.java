/**
 * 
 * 
 * @author liujm
 */
package com.maystar.jdkm.system.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.WebUtil;
import com.maystar.jdkm.system.vo.ServerInfo;
import com.maystar.mvc.base.BaseDao;

@Repository
public class ServerDao extends BaseDao {

	// 入库服务器维护
	public Page server(ServerInfo serverInfo) throws Exception {
		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		page.setCurrentPage(serverInfo.getPage());
		page.setPageSize(serverInfo.getPageSize());
		run.appendSql("SELECT * FROM tserverinfo t");
		page = run.query(page);
		run.clear();
		return page;
	}

	public int addServer(ServerInfo serverInfo) throws Exception {
		int update = 0;
		SqlRunner run = new SqlRunner(WebUtil.ds);
		long id = serverInfo.getId();
		// System.out.print(id);
		if (id != 0) {
			run.setInsertTable("tserverinfo");
			run.buildInsert("id", serverInfo.getId().toString());
			run.buildInsert("servername", serverInfo.getServername().trim());
			run.buildInsert("serverip", serverInfo.getServerip().trim());
			run.cleanInsert();
			update = run.update();
		}
		return update;
	}

	public int updateServer(ServerInfo serverInfo) throws Exception {
		int update = 0;
		SqlRunner run = new SqlRunner(WebUtil.ds);
		Map<String, String> valMap = new HashMap<String, String>();
		valMap.put("id", serverInfo.getId().toString());
		valMap.put("serverip", serverInfo.getServerip().trim());
		valMap.put("servername", serverInfo.getServername().trim());
		run.buildUpdateOfTable("tserverinfo", valMap);
		run.cleanUpdate();
		run.buildWhere(" where id = ?", serverInfo.getId());
		update = run.update();
		return update;
	}

	public int deleteServer(String Ids) throws Exception {
		SqlRunner runner = new SqlRunner(WebUtil.ds);
		int num = 0;
		for (String Id : Ids.split(",")) {
			runner.clear();
			runner.appendSql("delete from tserverinfo");
			runner.buildWhere("where id=?", Long.parseLong(Id));
			num += runner.update();
		}
		return num;
	}

	// // 硬件分配
	// public Page process(ProcessInfo processInfo) throws Exception {
	// Page page = new Page();
	// SqlRunner run = new SqlRunner(WebUtil.ds);
	// page.setCurrentPage(processInfo.getPage());
	// page.setPageSize(processInfo.getPageSize());
	// run.appendSql("SELECT * FROM tprocessinfo t");
	// page = run.query(page);
	// return page;
	// }
	//

}
