module.exports.get = function(HappyBox) {

	login_validate = function() {
		var S = HappyBox.Joi.string;
		return {
			email: S().email().required().max(50),
			passwrd: S().required().min(8),
			view: S()
		}
	}

	register_validate = function() {
		var S = HappyBox.Joi.string;
		return {
			email: S().email().required().max(50),
			passwrd: S().required().min(8),
			passwrd0: S().required().min(8),
			view: S()
		}
	}

	return [
	  {
		method: 'POST', path: '/gethappy', config: {
			handler: function(request, reply) {
				var session = request.auth.credentials;
				if (session) {
					var userid = session.id;
					var date = request.payload.date;
					var desc = request.payload.description;
					
					var data = require('./models');
					data.user.findById(parseInt(userid)).then(function(user) {
						data.memory.create({ description: desc, date: date }).then(function(newMemory) {
							newMemory.setUser(user).then(function() {
								reply.redirect('/?success');
							});
						});
					});
				} else {
					reply({error: 'Must be logged in.'});
				}
			},
			auth: 'session'
		} 
	  },
	  //Authentication Routes
	  { method: '*', path: '/confirm/{hashkey*}', config: { handler: HappyBox.Auth.confirm, auth: false  } },
	  { method: 'POST', path: '/register', config: { handler: HappyBox.Auth.register, validate: { payload: register_validate() }, auth: { mode: 'try', strategy: 'session' }, 
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  { method: 'POST', path: '/login', config: { handler: HappyBox.Auth.login, validate: { payload: login_validate() }, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  { method: '*', path: '/logout', config: { handler: HappyBox.Auth.logout, auth: 'session' } }, 
	  //Views
	  { method: 'GET', path: '/', config: { handler: HappyBox.Home.home_view, auth: 'session'  } },
	  { method: 'GET', path: '/login', config: { handler: HappyBox.Auth.login_view, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  { method: 'GET', path: '/register', config: { handler: HappyBox.Auth.register_view, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  //All static content
	  { method: '*', path: '/{path*}', config: { handler: { directory: { path: './static/', redirectToSlash: true } }, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } }
	];
};
