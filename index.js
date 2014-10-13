var HappyBox = require('./lib');

var Hapi = HappyBox.Hapi,
    options = { cors: true };
var masterConfig = require('./config/config');

var serverConfig = masterConfig.config,
    tlsConfig = masterConfig.tlsconfig,
    mailConfig = masterConfig.mailconfig;
        
if (serverConfig.tls) {
    console.log('Loading tls');
    options.tls = tlsConfig;
}

var server = new Hapi.Server(serverConfig.hostname, serverConfig.port, options);

HappyBox.Mailer.init(mailConfig);

server.views({
    engines: {
        html: require('handlebars')
    },
    path: './lib/views',
    partialsPath: './lib/views/partials'
});

server.pack.register(require('hapi-auth-cookie'), function (err) {
	server.auth.strategy('session', 'cookie', {
		password: serverConfig.cookie_password,
		cookie: serverConfig.cookie_name,
		redirectTo: '/login',
		isSecure: serverConfig.tls,
		clearInvalid: true
	});
	//Routes setup
	server.route(HappyBox.Routes.get(HappyBox));

	//setup/load modules/plugins here
	var virt_modules = [];
	virt_modules.push(HappyBox.Scurvy);

	var db = require('./lib/models');
	db.init(virt_modules, function() {
		console.log('database setup complete');
		
		//start server
		server.start();
		HappyBox.Auth.setURI(server.info.uri);
		console.log('Server up at ' + server.info.uri + ' !');

	});
});
