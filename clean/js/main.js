$(document).ready(function() {
	function chargeDowncounter() {
		var austDay = new Date();
		austDay = new Date(austDay.getFullYear(), austDay.getMonth(), austDay.getDate()+1);
		var clock = $('#countdown').FlipClock({ countdown: true, autoStart: false});
		clock.setTime((austDay.getTime() - (new Date()).getTime())/1000);
		clock.start();
	}

	function switchAction() {
		var odd = Math.floor(new Date().getTime() / (1000*60*60*24)) % 2 == 1;
		
		function showFirstAction() {
			$(".action1").show();
		}

		function showSecondAction() {
			$(".action2").show();
		}
		
		if (odd) {
			showFirstAction();
		} else {
			showSecondAction();
		}
	}


	var callbacks = $.Callbacks();
	function chargeModalStaff() {
		var closeModalWindows = function() {
			$(".md-show").removeClass("md-show");
			$(".form-addition").remove();
			window.overlay = false;
		}

		callbacks.add(closeModalWindows);

		var openModalWindow = function(el) {
			el.addClass("md-show");
			window.overlay = true;
		}

		var overlay = $(".md-overlay");
		overlay.click(function() {
			if (window.overlay) {
				callbacks.fire();
			}
		})
		window.openVideo = function openVideo(url) {
			var $video = $('<iframe>');
			$video.addClass("head-video");
			$video.attr("width", "853");
			$video.attr("height", "480");
			$video.attr("src", url.href);
			$video.attr("frameborder", "0");
			$video.attr("allowfullscreen", "1");

			overlay.before($video);
			openModalWindow($video);

			var disappear = function() {
				console.log("Removing video");
				$video.remove();
				callbacks.remove(disappear);
			}
			callbacks.add(disappear);
		}

		window.openGallery = function(url) {
			openModalWindow($(url.hash));
		}


		function chargeForm() {
			var $popupForm = $("#popup-form");
			var $triggers = $(".trigger");

			$(".close-button").click(closeModalWindows);
			$triggers.click(function() {
				var product = $(this).attr("data-product");
				if (product != undefined) {
					$popupForm.children("form").append($("<input type='hidden' class='form-addition' name='model' value='" + product + "'/>"));	
				}
				openModalWindow($popupForm);
			});

			function showErrorMessage() {
				$(".form-fail").addClass("md-show");
			}

			function showSuccessMessage() {
				$(".form-done").addClass("md-show");				
			}

			$("form").each(function() {
				var $form = $(this);
				$form.find("[type='submit']").click(function() {
				// $(this).parsley('validate');

					$.ajax({
							type: "POST",
							url: "send.php",
							data: $form.serialize(),
							success: function(data) {
								showSuccessMessage();
							}, 
							error: function(jqXHR, textStatus, errorThrown) {
								showErrorMessage();
							}

						});
					return false;
				});
			});

		}

		$(".w-slider-close").click(closeModalWindows);

		chargeForm();
	}
	chargeDowncounter();
	switchAction();
	chargeModalStaff();
});