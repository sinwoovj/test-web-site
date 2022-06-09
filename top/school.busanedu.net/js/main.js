
// 팝업 쿠키 저장
function setCookie(cookieName, value){
    var exdays = 1;
    var exdate = new Date();
    var day = exdate.getDate() * 1;
    exdate.setDate(day + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키조회
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

// 팝업 닫기(쿠키설정)
$(document).on('click', '.popupCookieSet', function() {
	var popValue = $(this).attr("data-seq");
	var cookieNM = "popCookie"+popValue;
	
	setCookie(cookieNM, "hide", "1");
	$("#popupNormal"+popValue).closest("div").remove();
});

//팝업창 표시 관련 쿠키 저장
function sysCookieIndict(type,sysId){
	var cookieNM = ""
	if(type == "popup"){
		cookieNM = "sysPopupNIndict_"+sysId;
	}else if(type == "qustnrSysInfo"){
		cookieNM = "qustnrSysInfo_"+sysId;
	}
	
	setCookie(cookieNM, "Y", "1");
}

$(document).on('click', '.popupClose', function() {
	var popValue = $(this).attr("data-seq");
	$("#layerPopUp"+popValue).closest("div").remove();
});

// 배너롤링
$(function(){
	$('.play').attr('hidden',true);
	if($(".bannerRolling").length > 0){
		rollingStart();
	}
	
	var bannerFlag = true;
	var bannerInterval;
	
	function rollingStart(){ 
		bannerFlag == true;
		bannerInterval = setInterval(rollingNext,4000);
		$('.play').attr('hidden',true);
		$('.stop').attr('hidden',false);
	}
	
	function rollingStop(){ 
		bannerFlag == false;
		clearInterval(bannerInterval);
		$('.play').attr('hidden',false);
		$('.stop').attr('hidden',true);
		
		
	}
	
	function rollingNext(){
		var brelSiteW = $('.bannerRolling li').outerWidth(true);
		var thisObj = $(".bannerRolling li:first");
		//$(".banner_zone li:first").css('opacity','0');
		var sup = parseInt($('.bannerRolling ul').css('left')) - brelSiteW;
		$('.bannerRolling ul:not(:animated)').animate({left:sup} , function(){
			//thisObj.css('opacity','1');
			thisObj.appendTo(this);
			$('.bannerRolling ul').css({left:0});
		});	
	}
	
	function rollingPrev(){
		var brelSiteW = $('.bannerRolling li').outerWidth(true);
		var thisObj = $(".bannerRolling li:last");
		//$(".banner_zone li:first").css('opacity','0');
		var sup = parseInt($('.bannerRolling ul').css('left')) - brelSiteW;
		$('.bannerRolling ul:not(:animated)').animate({left:sup} , function(){
			//thisObj.css('opacity','1');
			$('.bannerRolling li:last').prependTo(this);
			$('.bannerRolling ul').css({left:0});
		});	
	}
	
	$(".bannerRolling .stop").on("click",function(){
		rollingStop();
	});
	
	$(".bannerRolling .play").on("click",function(){
		rollingStart();
	});
	
	
	
	
	$(".bannerRolling .pre").on("click",function(){
		clearInterval(bannerInterval);
		var brelSiteW = $('.bannerRolling li').outerWidth(true);
		var thisObj = $(".bannerRolling li:last");
		//$(".banner_zone li:first").css('opacity','0');
		var sup = parseInt($('.bannerRolling ul').css('left')) - brelSiteW;
		$('.bannerRolling ul:not(:animated)').animate({left:sup} , function(){
			//thisObj.css('opacity','1');
			$('.bannerRolling li:last').prependTo(this);
			$('.bannerRolling ul').css({left:0});
		});	
		bannerInterval = setInterval(rollingPrev,4000);
	});
	
	$(".bannerRolling .next").on("click",function(){
		clearInterval(bannerInterval);
		var brelSiteW = $('.bannerRolling li').outerWidth(true);
		var thisObj = $(".bannerRolling li:first");
		//$(".banner_zone li:first").css('opacity','0');
		var sup = parseInt($('.bannerRolling ul').css('left')) - brelSiteW;
		$('.bannerRolling ul:not(:animated)').animate({left:sup} , function(){
			//thisObj.css('opacity','1');
			thisObj.appendTo(this);
			$('.bannerRolling ul').css({left:0});
		});	
		bannerInterval = setInterval(rollingNext,4000);
	});
});

//팝업 롤링
$(document).ready(function(){		
	var param = "#popup";
	var obj = ".pop_img>li";
	var btn = param+" .control"; /*#popup.control*/
	var interval = 5000; 
	var speed = 0;
	var viewSize = 1;
	var moreSize = 0;
	var dir = "x";
	var data = 1;
	var auto = true;
	var hover = false;
	var method = "easeInOutCubic";
	var op1 = false;		 
	stateScrollObj(param,obj,btn,interval,speed,viewSize,moreSize,dir,data,auto,hover,method,op1);
});



$( function() {
	pop_page = $(".pop_img>li").size();
	pop_tempLength = $(".pop_img>li").size();
	 
	$(".control>span").empty();
	if(pop_tempLength>0){
		pop_page = 1;
	}
	$(".control>span").append("<strong>"+pop_page+"</strong>/"+pop_tempLength);
	
	//배너리스트 표시 체크
	bannerListdefault = true;
	obj_heightClean = "";
	inner_heightClean = "";
});

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
	}else{
		$('#m_visual').bxSlider({
			auto: false,
			autoControls: false,
			autoHover:false,
			pager: false,
			mode : 'fade'
		});
    $(".main_visual").css("z-index","0");
    $("#m_visual li").css("z-index","0");
	}
	
	
	
	
	/* 180921 배너 리스트 */
	$(".dialogAllBannerList").bind("click", function(event){
		var obj = $(this);
		var div_num = 1;
		var li_cnt = $(".banner_zone .inner .obj").find("li").length;
		var inner_height = $(".banner_zone").css("height");
		inner_height = inner_height.substring(0, inner_height.length-2);
		
		var obj_height = $(".obj").css("height");
		obj_height = obj_height.substring(0, obj_height.length-2);
		
//		var obj_height = inner_height - 10;
		if(bannerListdefault){
			inner_heightClean = inner_height;
			obj_heightClean = obj_height;
		}
		//배너 갯수에 따라 전체보기 높이 변경 (한 줄에 5개의 배너가 출력되는 경우이므로 /5를 함.)
		if(li_cnt/5 >= 0 && li_cnt/5 < 1){
			div_num =1;
		}else if(li_cnt/5 >= 1 && li_cnt/5 < 2){
			div_num =2;
		}else if(li_cnt/5 >= 2 && li_cnt/5 < 3){
			div_num =3;
		}else if(li_cnt/5 >= 3 && li_cnt/5 < 4){
			div_num =4;
		}else if(li_cnt/5 >= 4 && li_cnt/5 < 5){
			div_num =5;
		}else if(li_cnt/5 >= 5 && li_cnt/5 < 6){
			div_num =6;
		}else if(li_cnt/5 >= 6 && li_cnt/5 < 7){
			div_num =7;
		}else if(li_cnt/5 >= 7 && li_cnt/5 < 8){
			div_num =8;
		}else if(li_cnt/5 >= 8 && li_cnt/5 < 9){
			div_num =9;
		}
		if(div_num>2 && inner_height>=70){
			div_num = div_num -1;
		}
		if(div_num == 1){
			inner_height = inner_heightClean;
		}else{
			inner_height = (inner_height*div_num)+(div_num*10);
		}
		
		obj_height = inner_height;
		
		//20181002 추가
		var ban_par_id = $(".banner_zone").closest("div").attr("id");
//		var ban_par_class = $(".banner_zone").closest("div").attr("class");
		var ban_par_class = $(".banner_zone").parents("div").attr("class");
		if(obj.attr("class") == "list dialogAllBannerList"){
			//20181002 추가
			if((ban_par_id != undefined && ban_par_id.indexOf("widgDiv") > -1)){
				$(".banner_zone").closest(".widgDiv").css("height", obj_height +"px"); 
			}
			if(ban_par_class != undefined && ban_par_class.indexOf("MC_box") > -1){
				$(".banner_zone").closest(".widgDiv").css("height", obj_height +"px");
				$("."+ban_par_class).css("height", obj_height +"px");
			}
			//
			$(".banner_zone").css("height", inner_height +"px");
			$(".banner_zone .inner").css("height", obj_height +"px");
			$(".banner_zone .inner .obj").css("height",obj_height +"px");
			$(".banner_zone .inner .obj").attr("title","배너 목록취소");
			$(".banner_zone .inner .obj").addClass("mbannerScroll");
			obj.attr("class","cancel list dialogAllBannerList");
			bannerListdefault = false;
			return false;
		}else{
			//20181002 추가
			if((ban_par_id != undefined && ban_par_id.indexOf("widgDiv") > -1)){
				$(".banner_zone").closest(".widgDiv").css("height",inner_heightClean+"px");
			}
			if(ban_par_class != undefined && ban_par_class.indexOf("MC_box") > -1){
				$(".banner_zone").closest("div").css("height", inner_heightClean +"px");
				$(".banner_zone").parent().css("height", inner_heightClean +"px");
			}
			//
			$(".banner_zone").css("height",inner_heightClean+"px");
			$(".banner_zone .inner").css("height",inner_heightClean+"px");
			$(".banner_zone .inner .obj").css("height",obj_heightClean+"px");
			$(".banner_zone .inner .obj").attr("title","배너 목록보기");
			obj.attr("class","list dialogAllBannerList");
			$(".banner_zone .inner .obj").removeClass("mbannerScroll");
			bannerListdefault = true;
			return false;
		}
	});
	
	
	
	
});

function layerPopupAct(sysId,popupSn){
	$.ajax({
		type : "post",
		url : "/"+sysId+"/pm/selectLayerPopupInfo.do",
		data : { 
			popupSn : popupSn,
		},
		dataType : "json",
		success:function(pop){
			if(pop.popupTy == 'N'){
				
				var additem  = "";
				additem += "<div id='layerPopUp"+pop.popupSn+"' style='display:none;'>";
				if(pop.popupTemp == 'A'){
					additem +="<a href='"+pop.url+"'";
					if(pop.url != '#' ){
						additem +="target='_blank'";
					}
					additem +="title='"+pop.popupTitle+"'>";
					additem +="<div id='popupBg"+pop.popupSn+"' style='background:url('"+pop.bcrnImagePath+"') no-repeat; background-size:"+pop.popupWidth+"px "+pop.popupHeight+"px; width:"+pop.popupWidth+"px; height:"+pop.popupHeight+"px'>";
					additem +="<div class='popupContent' style='margin:0 auto; width:88%; height:90%; padding-top:5%; overflow-y:auto;'>";
					additem += pop.popupCn;
					additem += "</div></div>";
					
				}else if(pop.popupTemp == 'B'){
					additem +="<a href='"+pop.url+"'";
					if(pop.url != '#' ){
						additem +="target='_blank'";
					}
					additem +="title='"+pop.popupTitle+"'>";
					additem +="<div id='popupBg"+pop.popupSn+"' style='background:url('"+pop.fileStreCours+"') no-repeat; background-size:"+pop.popupWidth+"px "+pop.popupHeight+"px; width:"+pop.popupWidth+"px; height:"+pop.popupHeight+"px'>";
					additem +="<div class='popupContent' style='margin:0 auto; width:88%; height:90%; padding-top:5%; overflow-y:auto;'>";
					additem += pop.popupCn;
					additem += "</div></a>";
				}else if(pop.popupTemp == 'C'){
					additem +="<a href='"+pop.url+"'";
					if(pop.url != '#' ){
						additem +="target='_blank'";
					}
					additem +="title='"+pop.popupTitle+"'>";
					additem +="<img src='"+pop.fileStreCours+"' width='"+pop.popupWidth+"' height='"+pop.popupHeight+"' alt='"+pop.popupTitle+"' /></a>";
				}

				if(typeof pop.atchmnflId !="undefined" && typeof pop.atchFileList !='undefined'){
					var fileCntList = pop.atchFileList;
					var fileCnt = fileCntList.length;
					var fileHeight = fileCnt * 20;
					additem +="<div style='height:"+fileHeight+"px;padding-top:10px; padding-left:20px; border:1px solid #ddd;'>";
					
					var orignlFileNm = "";
					$.each(pop.atchFileList, function(index, item){ 
						orignlFileNm = item.orignlFileNm;
						additem +="첨부자료"+(index+1)+" : <a href='javascript:' onclick='javascript:mfn_fileDownload("+item.fileKey+")' title='첨부자료 다운로드' style='padding-right:25px; background: url(/images/ap/pm/icoFile.png) right center no-repeat;'>"+orignlFileNm+"</a><br/>";
					});
					
					additem +="</div>";
				}
				additem += "<div style='background-color:#3b568f; height:20px; text-align:right; width:100%'><a href='javascript:' class='popupClose' style='color:#fff' data-seq='"+pop.popupSn+"' >닫기 [ 클릭 ]</a></div></div>";
				$("#layerPopUp").append(additem);
			}
				
				var popupSn = pop.popupSn;
				var popupTitle = pop.popupTitle; 
				var popupWidth = pop.popupWidth+30;
				var popupHeight = pop.popupHeight + 100;
				var popupWidthLc = pop.widthLc;
				var popupHeightLc = pop.heightLc;
				var popupFileId = pop.atchmnflId;
				var popupFileList = pop.atchFileList;
				
				var fileHeight = "";
				if( typeof popupFileId != "undefined" && typeof popupFileList != "undefined") {
					$.each(pop.atchFileList, function(index, item){ 
						fileHeight = pop.atchFileList.length;
						popupHeight = parseInt(popupHeight) + parseInt(fileHeight)*20;
						popupWidth = parseInt(popupWidth) + parseInt(fileHeight)*5;
					});
					
				}
				if(pop.mobileAt == "N"){
					$("#layerPopUp"+popupSn).dialog({
					    autoOpen: true,
					    modal: false,
					    resizeable : false,
					    title: popupTitle,
					    width: popupWidth,
					    height: popupHeight,
					    show:{
					  		effect:"blind",
					  		duration: 100
					    },
					    hide:{
					   	 	effect:"blind",
					   	 	duration: 100
					    },						    
					    position: {my:'left+'+popupWidthLc+' top+'+popupHeightLc+'', at: 'left top'}
					}).dialog('open');	
				}else{
					window.open(pop.url,"_blank");
				}
		},
		error : function(error) {
			alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
		}	
	});
	
}

//이미지맵 (sub_시스템소개)
;(function($) {
   $.fn.rwdImageMaps = function() {
      var $img = this;
      
      var rwdImageMap = function() {
         $img.each(function() {
            if (typeof($(this).attr('usemap')) == 'undefined')
               return;
            
            var that = this,
               $that = $(that);
            
            // Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
            $('<img />').load(function() {
               var attrW = 'width',
                  attrH = 'height',
                  w = $that.attr(attrW),
                  h = $that.attr(attrH);
               
               if (!w || !h) {
                  var temp = new Image();
                  temp.src = $that.attr('src');
                  if (!w)
                     w = temp.width;
                  if (!h)
                     h = temp.height;
               }
               
               var wPercent = $that.width()/100,
                  hPercent = $that.height()/100,
                  map = $that.attr('usemap').replace('#', ''),
                  c = 'coords';
               
               $('map[name="' + map + '"]').find('area').each(function() {
                  var $this = $(this);
                  if (!$this.data(c))
                     $this.data(c, $this.attr(c));
                  
                  var coords = $this.data(c).split(','),
                     coordsPercent = new Array(coords.length);
                  
                  for (var i = 0; i < coordsPercent.length; ++i) {
                     if (i % 2 === 0)
                        coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
                     else
                        coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
                  }
                  $this.attr(c, coordsPercent.toString());
               });
            }).attr('src', $that.attr('src'));
         });
      };
      $(window).resize(rwdImageMap).trigger('resize');
      
      return this;
   };
   
 

})(jQuery);