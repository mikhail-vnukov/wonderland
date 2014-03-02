$(document).ready(function() {
	function chargeDowncounter() {
		var austDay = new Date();
		austDay = new Date(austDay.getFullYear(), austDay.getMonth(), austDay.getDate()+1);
		var clock = $('#countdown').FlipClock({ countdown: true, autoStart: false});
		clock.setTime((austDay.getTime() - (new Date()).getTime())/1000);
		clock.start();
	}


	var callbacks = $.Callbacks();
	function chargeModalStaff() {
		var closeModalWindows = function() {
			$(".md-show").removeClass("md-show");
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
			$(url.hash).addClass("md-show");
		}


		function chargeForm() {
			var $form = $("#popup-form");
			var $triggers = $(".trigger");

			$("#close-button").click(closeModalWindows);
			$triggers.click(function() {
				openModalWindowFunction($form);
			});
		}

		$(".w-slider-close").click(closeModalWindows);
			window.openSlider = function() {
		}

		
		chargeForm();
	}
	chargeDowncounter();
	chargeModalStaff();
});