$(document).ready(function () {
	responseHandler();
	setupGetHappyButton();
});

var responseHandler = function() {
	var response = window.location.search.replace("?","");
	if (response == "success") {
		$('#msg').append('<div data-alert class="alert-box success radius">Successfully added memory to the happy box!</div>');
	}
};


var setupGetHappyButton=function() {
	$("#get-happy-button").click(function() {
		$.get("/gethappy",function(data) {

			$("#msg").text(data.description);
			var msgDate = new Date(data.date);

			$("#msg-date").text((msgDate.getMonth() + 1) + "/" + msgDate.getDate() + "/" + msgDate.getFullYear());

		});





	});
}