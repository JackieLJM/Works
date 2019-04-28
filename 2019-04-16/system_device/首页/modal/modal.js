function alterData(id) {
  var html =
    '<div style="text-align:center;margin-top:3rem;padding-bottom:-3rem;">';
  html += '<div class="select-wrap">';
  html +=
    'style="width: 150px;height: 30px;border-radius:3px;border:1px #01C1DE solid;font-size:14px;color:white;outline: none;- webkit - tap - highlight - color: rgba(0, 0, 0, 0); background - color: #01C1DE; width: 12rem;"';
  html +=
    '<option value="0" class="select-list" style="background-color: white;color:#01C1DE;">采集</option>';
  html +=
    '<option value="PRODUCE_BIGNUM" class="select-list" style="background-color: white;color:#01C1DE;">大数</option>';
  html +=
    '<option value="NFS_COMPUTE" class="select-list" style="background-color: white;color:#01C1DE;">NFS</option>';
  html +=
    '<option value="SAGE_COMPUTE" class="select-list" style="background-color: white;color:#01C1DE;">SAGE</option>';
  html +=
    '<option value="IMPACT_BIGNUM" class="select-list" style="background-color: white;color:#01C1DE;">碰撞</option>';
  html += "</select>";
  html += "</div>";
  html += "</div>";

  layer.open({
    title: "修改节点类型",
    content: html,
    area: ["300px", "300px"],
    closeBtn: 0,
    btn: ["确认", "取消"],
    yes: function(index, layero) {
      var options = $("#select option:selected"); //获取选中的项
      var type = options.val();
      $.ajax({
        url: "/nodes/alter",
        type: "POST",
        data: {
          id: id,
          type: type
        },
        success: function(data) {
          layer.closeAll();
          if (data.success == true) {
            layer.msg(data.msg, {}, function() {
              $("#list")
                .DataTable()
                .ajax.reload();
            });
          } else {
            layer.msg(data.msg, {}, function() {});
          }
        },
        error: function() {
          layer.msg("网络错误，请检查网络或稍后再试");
        }
      });
    }
  });
}
