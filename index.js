const express = require('express');
const body_parser = require('body-parser');

class starter {

    constructor () {
        this.options = {
            config: {
                port: 3001
            },
            routes: {}
        };
        this.app = new express ();
        this.app.use (body_parser.json ());
        this.app.use (body_parser.urlencoded ({
            extended: true
        }));
    }

    import (routes = {}, config = {}) {
        Object.assign(this.options.config, config);
        this.options.routes = routes;

        return this;
    }

    prepare_method (method) {
        return method.toLowerCase();
    }

    route_assign (method, path, middleware) {
        this.app[this.prepare_method(method)](path, [].concat(middleware));
    }

    launch () {
        const routes = Object.entries(this.options.routes);

        routes.map(([route, middleware]) => {
            const [method, path] = route.split(' ');
            this.route_assign(this.prepare_method(method), path, [].concat(middleware));
        });

        this.app.listen(this.options.config.port);
        console.log(`Application listen: ${this.options.config.port}`);

        return this;
    }

}

function application_launcher (routes = {}, config = {}) {
    return new starter().import(routes, config).launch();
}
application_launcher.starter = starter;

module.exports = application_launcher;