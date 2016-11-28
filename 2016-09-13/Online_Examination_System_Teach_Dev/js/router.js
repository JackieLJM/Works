function Router() {
    this.routes = {};
    this.curUrl = '';

    this.route = function (path, callback) {
        this.routes[path] = callback || function () {};
    };

    this.refresh = function () {
        this.curUrl = window.location.hash.slice(0) || '/';
        this.routes[this.curUrl]();
    };

    this.init = function () {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
}