package com.maystar.jdkm.hardwaremanage.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.NamingException;

import org.apache.commons.net.nntp.NewGroupsOrNewsQuery;
import org.springframework.stereotype.Repository;

import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.WebUtil;
import com.maystar.jdkm.equip.vo.ServerInfo;
import com.maystar.jdkm.hardwaremanage.vo.Tprocessinfo;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.DBUtil;

import common.Logger;

@Repository
public class HardwareManageDao extends BaseDao{

	static Logger logger = Logger.getLogger(HardwareManageDao.class.getClass());




	public  List<Map<String, Object>> hardwareTree() throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select * from tserverinfo");
		return run.query();
	}


	public Page findHardwareInfo(Tprocessinfo tprocessinfo) throws Exception {

		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		page.setCurrentPage(tprocessinfo.getPage());
		page.setPageSize(tprocessinfo.getPageSize());
		run.appendSql("SELECT p.serverip,p.equid eid,h.equid,h.hardtype,h.equname,h.manageip,h.IPADDRESS,h.HARDMODEL FROM tprocessinfo p  left join thardwareinfo h on p.equid = h.equid");
		if(tprocessinfo.getServerip()!=null){
			run.buildWhere("where p.serverip= ? ", tprocessinfo.getServerip());
		}
		page = run.query(page);
		return page;
	}


	public Page thardwareInfoList(ServerInfo serverInfo) throws Exception {
		
		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		page.setCurrentPage(serverInfo.getPage());
		page.setPageSize(serverInfo.getPageSize());
		run.appendSql("select h.equid,h.hardtype,h.equname,h.manageip,h.IPADDRESS,h.HARDMODEL from thardwareinfo h where h.equid not in (select equid from tprocessinfo)");
		page = run.query(page);
		return page;
	}

	public int assignSave(String serverip, String[] equids) throws Exception {

		int result = 0;
		SqlRunner run = new SqlRunner(WebUtil.ds);
		String sql="insert into tprocessinfo(id,equid,serverip) values(seq_tprocessinfo.nextval,?,?)";
		
		List<Object[]> list = new ArrayList<>();
		for (int i = 0; i < equids.length; i++) {
			Object[] params = new Object[2];
			String equid = equids[i];
			params[0] = equid;
			params[1] = serverip;
			list.add(params);
		}

		int[] batch = run.batch(sql,list);
		for (int size : batch) {
			if(size==-2){
				result +=1;
			}else{
				result+=size;
			}
		}
		return result;
	}


	public int delThardware(String equids, String serverip) throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		int result = 0;
		String sql = "delete from tprocessinfo where equid=? and serverip = ?";
		String[] array = equids.split(",");
		List listBatchParams = new ArrayList<>();
		for (String equid : array) {
			Object[] params = new Object[2];
			params[0] = equid;
			params[1] = serverip;
			listBatchParams.add(params);
		}
		int[] batch = run.batch(sql, listBatchParams);
		for (int size : batch) {
			if (size == -2) {
				result += 1;
			}else {
				result += size;
			}
		}
		return result;
	}

}
