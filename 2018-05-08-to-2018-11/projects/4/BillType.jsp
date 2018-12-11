<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/common/common.jsp"%>
<html manifest="/jsp/common/main.manifest">
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="/static/oa.css">
<script type="text/javascript" src="/js/jsp/dba/billtype/billType.js"></script>
</head>
<body style="margin: 0 !important; overflow: hidden; padding-bottom: 25px">
	<form id="form_normal">
		<div class="search_area search_normal" id="search_normal_div">
			<div class="form-search">
				<div class="input-append">
					<input type="text" name="search_normal" id="search_normal" class="span4 search-query" placeholder="请输入要查询的关键字" />
					<button type="button" id="normalSearchBtn" onClick="query();" class="btn btn-primary">查询</button>
				</div>
				&nbsp;
				<button type="reset" id="normalClearBtn" class="btn">清除</button>
				<button type="button" id="toAdvSearch" onClick="changeTab();" class="btn">切换至高级查询</button>
			</div>
		</div>
	</form>
	<form id="form_adv">

		<div class="search_area search_adv" id="search_adv_div">
			<div class="adv-select-label">代码：</div>
			<input type="text" class="span3" name="code" placeholder="代码">&nbsp;&nbsp;&nbsp;&nbsp;

			<div class="adv-select-label">名称：</div>
			<input type="text" class="span3" name="name" placeholder="名称">

			<button type="button" onClick="query();" class="btn btn-primary">查询</button>
			&nbsp;
			<button type="reset" id="advClearBtn" class="btn">清除</button>
			<button type="button" onClick="changeTab();" class="btn">切换至普通查询</button>
		</div>
	</form>
	<input type="hidden" id="billTypeId" />
	<div id="billType-grid"></div>
</body>
</html>