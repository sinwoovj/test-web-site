$(document).ready(function(){

	if ($('#m_visual > li').size() > 1) {
		$('#m_visual').bxSlider({
			auto: true,
			autoControls: true,
			autoDelay: 3000
		});

		$('.main_visual a.bx-stop').click(function(){	
			$(this).css('display','none');
			$('.main_visual a.bx-start').css('display','block');
			console.log("stop")
		});
		$('.main_visual a.bx-start').click(function(){	
			$(this).css('display','none');
			$('.main_visual a.bx-stop').css('display','block');
			console.log("start")
		});
	}

	//main slider Poster 
	var fadeTime = 400;
	var fadeEase = "easeOutQuad";
	$(".posterArea .posters ul li .sum").hover(function(evt){
		$(this).find(".posterInfo").stop(true, true).fadeIn(fadeTime, fadeEase);
	}, function(evt) {
		$(this).find(".posterInfo").stop(true, true).fadeOut(fadeTime, fadeEase);
	});
	$(".posterArea .posters ul li a.img").focus(function(evt){
		$(this).siblings(".posterInfo").stop(true, true).fadeIn(fadeTime, fadeEase);
	});
	$(".posterArea .posters ul li .posterInfo a").focus(function(evt) {
		$(this).parents(".sum").eq(0).children(".posterInfo").stop(true, true).fadeIn(fadeTime, fadeEase);
	});
});



//팝업 리스트보기
$(function () {
	// 변수생성!!!
	var pop_list = 500;
	// 함수생성!!!
	function pop_layer() {
		var winWidth = $(window).width();
        if (winWidth > 2000 && winWidth < 2000) {
            pop_list = 500;
        }
	}
    function check() {
        // 함수호출!!!!
		pop_layer();
		$("#Pop_ListOpen").click(function () {
            $(".pop_layer_box").css("display", "block");
        });
		
        $("#Pop_ListClose").click(function () {
			// 함수호출!!!
			pop_layer();
             $(".pop_layer_box").css("display", "none");
        });		

    }
    check();
});


//알림장 리스트보기
$(function () {
	// 변수생성!!!
	var pop_list = 500;
	// 함수생성!!!
	function pop_layer() {
		var winWidth = $(window).width();
        if (winWidth > 2000 && winWidth < 2000) {
            pop_list = 500;
        }
	}
    function check() {
        // 함수호출!!!!
		pop_layer();
		$("#Ann_ListOpen").click(function () {
            $(".ann_layer_box").css("display", "block");
        });
		
        $("#Ann_ListClose").click(function () {
			// 함수호출!!!
			pop_layer();
             $(".ann_layer_box").css("display", "none");
        });		

    }
    check();
});



