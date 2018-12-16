$(function() {
	// window.player=mplayer('.music');
	$(document)
		.on("click", ".wrapper-main", function(e) {
			var $t = $(e.target);
			var $r = $t.closest(".fm-right");
			if (!$r.length) {
				$(".fm-right").removeClass("right_show");
			}
		})
		.on("click", "nav ul li", function(e) {
			$(this)
				.addClass("active")
				.siblings()
				.removeClass("active");
			$(".fm-right").addClass("right_show");
			return false;
		});

	$(".playerDiv .playbtn").click(function() {
		if ($(this).hasClass("play")) {
			$(this).attr("class", "pause playbtn");
			player.pause();
		} else {
			if (player.playInfo().paused) {
				player.play();
			}
			$(this).attr("class", "play playbtn");
		}
	});

});
