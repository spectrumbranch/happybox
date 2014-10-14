$(document).ready(function () {
	responseHandler();
});

var responseHandler = function() {
	var response = window.location.search.replace("?","");
	if (response == "success") {
		$('#msg').append('<div data-alert class="alert-box success radius">Successfully added memory to the happy box!</div>');
	}
};


