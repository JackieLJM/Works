/**
 * 
 * 
 * @author liujm
 */
package com.maystar.jdkm.system.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maystar.common.dbutils.Page;
import com.maystar.common.util.WebUtil;
import com.maystar.jdkm.system.dao.ServerDao;
import com.maystar.jdkm.system.vo.ServerInfo;
import com.maystar.mvc.base.BaseService;
import com.maystar.mvc.common.util.DBUtil;
import com.maystar.mvc.common.util.LoginUser;

@Service
public class ServerService extends BaseService {

	static Logger logger = Logger.getLogger(ServerService.class.getName());
	//
	@Autowired
	private ServerDao serverDao;

	// 服务器维护
	public JSONObject server(HttpServletRequest request, ServerInfo serverInfo) throws Exception {
		JSONObject results = new JSONObject();
		Page page = serverDao.server(serverInfo);
		JSONArray array = new JSONArray(page.getList());

		results.put("result", array);
		results.put("success", true);
		results.put("totalProperty", page.getItemCount());
		return results;
	}

	public int addServer(
			// LoginUser loginUser,
			ServerInfo serverInfo) throws Exception {
		// Long id = DBUtil.getSeqID(WebUtil.ds, "tserverinfo");
		// serverInfo.setId(id.intValue());
		// JSONObject result = new JSONObject();
		// try {
		// int addServer = serverDao.addServer(serverInfo);
		// if (addServer > 0) {
		// result.put("success", true);
		// result.put("result", "成功");
		// } else {
		// result.put("success", false);
		// result.put("result", "失败");
		// }
		// } catch (Exception e) {
		// throw e;
		// }
		// System.out.println(serverInfo);
		Long id = DBUtil.getSeqID(WebUtil.ds, "SEQ_TSERVERINFO");
		serverInfo.setId(id.intValue());
		return serverDao.addServer(serverInfo);
	}

	public int updateServer(ServerInfo serverInfo) throws Exception {
		return serverDao.updateServer(serverInfo);
	}

	public JSONObject deleteServer(LoginUser loginUser, String Ids) throws Exception {
		JSONObject results = new JSONObject();
		try {
			int delServer = serverDao.deleteServer(Ids);
			if (delServer > 0) {
				results.put("success", true);
				results.put("result", "成功");
			} else {
				results.put("success", false);
				results.put("result", "失败");
			}
		} catch (Exception e) {
			throw e;
		}
		return results;
	}

	// // 硬件分配
	// public JSONObject process(HttpServletRequest request, ProcessInfo
	// processInfo) throws Exception {
	// JSONObject results = new JSONObject();
	// Page page = serverProcessPictureDao.process(processInfo);
	// JSONArray array = new JSONArray(page.getList());
	// results.put("result", array);
	// results.put("success", true);
	// results.put("totalProperty", page.getItemCount());
	// return results;
	// }
}