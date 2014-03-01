$(document).ready(function() {
	function chargeDowncounter() {
		var austDay = new Date();
		austDay = new Date(austDay.getFullYear(), austDay.getMonth(), austDay.getDate()+1);
		var clock = $('#countdown').FlipClock({ countdown: true, autoStart: false});
		clock.setTime((austDay.getTime() - (new Date()).getTime())/1000);
		clock.start();
	}

	function chargeForm() {
		var $form = $("#popup-form");
		var $overlay = $("#overlay");
		var $triggers = $(".trigger");

		var closeForm = function() {
			$form.removeClass("md-show");
			$overlay.off('click');
		}

		var openForm = function() {
			$form.addClass("md-show");
			$overlay.click(closeForm);
		}

		$("#close-button").click(closeForm);
		$triggers.click(openForm);
	}
	chargeDowncounter();
	chargeForm();
});
