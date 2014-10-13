var internals = {};

internals.home_view = function(request, reply) {
	var user = request.auth.credentials;
	console.log(user);

	return reply.view('index.html', {});
}

exports.home_view = internals.home_view;
