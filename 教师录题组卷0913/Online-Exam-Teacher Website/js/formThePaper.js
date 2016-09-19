(function () {
    var router = new Router();
    router.init();
    var button = document.getElementById('button'),
    input = document.createElement("input");

    router.route('/填写基本信息', function () {
        input.setAttribute("type", "submit")
        button.appendChild( input );
    });
    router.route('/选题', function () { 
        input.setAttribute("type", "submit")
        button.appendChild( input );
    });
    router.route('/预览', function () {

    });
    router.route('/发布成功', function () {

    })

}())