$(document).ready(function () {
	responseHandler();
	setupGetHappyButton();
});

var responseHandler = function() {
	var response = window.location.search.replace("?","");
	if (response == "success") {
		$('#msg').append('<div data-alert class="alert-box success radius">Successfully added memory to the happy box!</div>');
		$("#msg-box").css("display", "block");
	}
	else{	
		$("#msg-box").css("display", "none");
	}
};


var setupGetHappyButton=function() {
	$("#get-happy-button").click(function() {
		$.get("/gethappy",function(data) {

			$("#msg").text(data.description);
			var msgDate = new Date(data.date);

			$("#msg-date").text((msgDate.getMonth() + 1) + "/" + msgDate.getDate() + "/" + msgDate.getFullYear());
			$("#msg-box").css("display", "block");

		});

	});
}

var validateForm=function() {
    var x = $("#text-description").val();
    if (x == null || x == "") {
        $("#alert1").text("Name must be filled out");
        return false;
    }
}
