package com.maystar.jdkm.system.controller;

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Map;
//import 

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maystar.common.util.JSONPrintOpt;
import com.maystar.jdkm.log.TLog;
import com.maystar.jdkm.system.service.LogService;
import com.maystar.jdkm.system.service.ServerService;
import com.maystar.jdkm.system.service.UserService;
import com.maystar.jdkm.system.vo.Log;
import com.maystar.jdkm.system.vo.ServerInfo;
import com.maystar.jdkm.system.vo.User;
import com.maystar.mvc.common.util.LoginUser;

@Controller
@RequestMapping("/system")
public class SystemController {

	static Logger logger = Logger.getLogger(SystemController.class.getName());

	@Autowired
	private UserService userService;

	@Autowired
	private LogService logService;

	@Autowired
	private ServerService serverService;

	/**
	 * 用户列表
	 * 
	 * @author liqq
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/userManage")
	public void userManage(HttpServletRequest request, HttpServletResponse response, User user) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject json = userService.userManage(user);
		try {
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());
		} catch (Exception e) {
			logger.error("userManage", e);
		}
	}

	/**
	 * 添加用户,编辑用戶
	 * 
	 * @author liqq
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/addUser")
	public void addUser(HttpServletRequest request, HttpServletResponse response, User user) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("userInfo");
		int flag = 0;
		try {
			if (user.getId() == null) {
				flag = userService.addUser(user);
			} else {
				flag = userService.editUser(user);
			}

			JSONObject json = new JSONObject();
			if (flag != 0) {
				json.put("success", true);
			} else {
				json.put("result", "save fail.");
			}
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());

			TLog.AddLog(loginUser.getLoginname(), "添加", request.getRemoteHost(),
					"用户[" + loginUser.getLoginname() + "]添加用户信息", "用户[" + loginUser.getLoginname() + "]添加用户信息");
		} catch (Exception e) {
			logger.error("addUser：" + e.getMessage());
		}
	}

	/**
	 * 
	 * 根据ID回显用户信息 liqq
	 */
	@RequestMapping(value = "/findUserById")
	public void findUserById(HttpServletResponse response, HttpServletRequest request, User user) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject json = userService.findUserById(user.getId());
		try {
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());
		} catch (Exception e) {
			logger.error("findUserById", e);
		}
	}

	/**
	 * 删除用户信息 liqq
	 */
	@RequestMapping(value = "/deleteUser")
	public void deleteUser(HttpServletRequest request, HttpServletResponse response, String ids) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result = new JSONObject();

		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("userInfo");
		try {
			result = userService.deleteUser(ids);
			JSONPrintOpt.outJSON(request, response, result);

			TLog.AddLog(loginUser.getLoginname(), "删除", request.getRemoteHost(),
					"用户[" + loginUser.getLoginname() + "]删除用户信息",
					"用户[" + loginUser.getLoginname() + "]删除用户信息,用户ID：" + ids);
		} catch (Exception e) {
			logger.error("deleteUser", e);
			JSONPrintOpt.outException(request, response, e);
		}

	}

	/**
	 * 日志信息列表
	 * 
	 * @author liqq
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/logQuery")
	public void logQuery(HttpServletRequest request, HttpServletResponse response, Log log) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject json = new JSONObject();
		try {
			json = logService.logQuery(log);
			JSONPrintOpt.outJSON(request, response, json);
		} catch (Exception e) {
			logger.error("logQuery", e);
			JSONPrintOpt.outException(request, response, e);
		}

	}

	/***
	 * 删除日志信息 deleteLogger liqq
	 */
	@RequestMapping(value = "/deleteLogger")
	public void deleteLogger(HttpServletRequest request, HttpServletResponse response, Log log) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("userInfo");
		int flag = logService.deleteLog(log.getIds());
		JSONObject json = new JSONObject();
		if (flag != 0) {
			json.put("success", true);
		} else {
			json.put("result", "delete fail.");
		}
		try {
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());
			TLog.AddLog(loginUser.getLoginname(), "删除", request.getRemoteHost(),
					"用户[" + loginUser.getLoginname() + "删除日志信息",
					"用户[" + loginUser.getLoginname() + "]删除日志信息,日志ID：" + log.getIds());
		} catch (Exception e) {
			logger.error("deleteLogger：" + e.getMessage());
		}
	}

	/**
	 * 获取所有入库服务器 server
	 * 
	 * @author liujm
	 */
	@ResponseBody
	@RequestMapping(value = "/server")
	public void server(HttpServletRequest request, HttpServletResponse response, ServerInfo serverInfo) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject results = new JSONObject();
		// System.out.print(serverInfo);
		try {
			results = serverService.server(request, serverInfo);
			JSONPrintOpt.outJSON(request, response, results);
		} catch (Exception e) {
			logger.error("server", e);
			JSONPrintOpt.outException(request, response, e);
		}

	}

	/**
	 * 添加更新入库服务器 addUpdateServer
	 * 
	 * @author liujm
	 */
	// @ResponseBody
	@RequestMapping(value = "/addSer")
	public void addServer(HttpServletRequest request, HttpServletResponse response, ServerInfo serverInfo) {
		response.setContentType("application/json");
		// LoginUser loginUser = (LoginUser)
		// request.getSession().getAttribute("loginUser");
		int flag = 0;
		// System.out.println(serverInfo);
		try {
			// System.out.println(serverInfo.getId().getClass().toString());//客户端是字符串这里是long类型了

			flag = serverService.addServer(serverInfo);

			// 没有执行到update方法

			JSONObject json = new JSONObject();
			if (flag != 0) {
				json.put("success", true);
			} else {
				json.put("result", "save fail.");
			}
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());

		} catch (Exception e) {
//			System.out.println(e);
			logger.error("addServer：" + e.getMessage());
		}
	}

	/**
	 * 添加更新入库服务器 updateServer
	 * 
	 * @author liujm
	 */
	@RequestMapping(value = "/updateSer")
	public void updateServer(HttpServletRequest request, HttpServletResponse response, ServerInfo serverInfo) {
		response.setContentType("application/json");
		// LoginUser loginUser = (LoginUser)
		// request.getSession().getAttribute("loginUser");
		int flag = 0;
//		System.out.println(serverInfo);
		try {
			// System.out.println(serverInfo.getId().getClass().toString());//客户端是字符串这里是long类型了

			flag = serverService.updateServer(serverInfo);

			// 没有执行到update方法

			JSONObject json = new JSONObject();
			if (flag != 0) {
				json.put("success", true);
			} else {
				json.put("result", "update fail.");
			}
			PrintWriter out = null;
			out = response.getWriter();
			out.write(json.toString());

		} catch (Exception e) {
//			System.out.println(e);
			logger.error("updateServer：" + e.getMessage());
		}
	}

	/**
	 * 删除入库服务器 deleteServer
	 * 
	 * @author liujm
	 */
	// @ResponseBody
	@RequestMapping(value = "/delSer", method = RequestMethod.POST)
	public void deleteServer(HttpServletRequest request, HttpServletResponse response,
			// ServerInfo serverinfo
			@RequestBody Map<String, String> id) {
		// System.out.print(id.get(0));//null
		Iterator<String> it = id.values().iterator();
		// System.out.println(it.next().toString());
		// System.out.print(it.next().getClass().toString());
		// String idstr;
		// for (Object object : id.values()) {
		// System.out.println(object);
		// // System.out.print(object.getClass().toString());
		// }
		// System.out.println(id.values());// collection类型
		// System.out.print(id.values().getClass().toString());
		// System.out.println(id.values().toString());// string类型
		// System.out.print(id.values().toString().getClass().toString());
		// response.setContentType("application/json");
		JSONObject results = new JSONObject();
		PrintWriter out = null;
		// String idStr;

		// idStr=id.get('id');
		// if ("".equals(StringUtils.nullToStr(id))) {
		// logger.error("删除服务器错误. 服务器的id为空!");
		// return;
		// }
		// String idst = it.next();
		// System.out.println(idst.getClass().toString());
		String idstr = it.next();// it.next()不能作为参数返回值传递到参数里会报nosuchelementexception错误
		// id.values().toString();
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			results = serverService.deleteServer(loginUser, idstr
			// serverinfo.getId().toString()
			);
			JSONPrintOpt.outJSON(request, response, results);
		} catch (Exception e) {
			logger.error("deleteserver", e);
			results.put("success", false);
			results.put("result", e.getMessage());
			JSONPrintOpt.outException(request, response, e);
		} finally {
			try {
				out = response.getWriter();
				out.write(results.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}

	}

	//
	// /**
	// * 获取所有服务器的硬件 process
	// *
	// * @author liujm
	// */
	// @ResponseBody
	// @RequestMapping(value = "/process")
	// public void process(HttpServletRequest request, HttpServletResponse
	// response, ProcessInfo processInfo) {
	// response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
	// JSONObject results = new JSONObject();
	// try {
	// results = serverProcessPictureService.process(request, processInfo);
	// JSONPrintOpt.outJSON(request, response, results);
	// } catch (Exception e) {
	// logger.error("server", e);
	// JSONPrintOpt.outException(request, response, e);
	// }
	//
	// }

}
