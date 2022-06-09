
// 메뉴 타이틀 체크 ( 메뉴가 없는 경우 왼쪽 메뉴 갱신 )
$(document).ready(function(){
	if($("#sideContent").children().length == 0){
		$('#sideContent').append("<h1>"+$('#pageTitle').text()+"</h1>");
	}
})


// 모바일 메뉴 이동
$(document).ready(function(){
	$(".dep").click(function () {
		var childUl =  $(this).siblings("ul").children("li").length
		if(childUl > 0){
			$(this).parent().siblings().children('ul').slideUp(300);
			$(this).siblings("ul").slideToggle(300);
			return false;	
		}
	});
	
	// 2차메뉴 클릭시( 
	$(".row .dep2").click(function () { 
			$(this).parent().siblings().children('ul').slideUp(300);
			$(this).siblings("ul").slideToggle(300);
			$(this).parent('li').toggleClass("on");
			$(this).parent().siblings("li").removeClass('on');
        return false;	
	});
	
	// 3차메뉴 클릭시( 
	$(".row .dep3").click(function () { 
		// 4차메뉴가 있을 경우
		if($(this).siblings("ul").slideToggle(300).val() == ""){
			$(this).parent().siblings().children('ul').slideUp(300);
			//$(this).siblings("ul").slideToggle(300);
			$(this).parent('li').toggleClass("on");
			$(this).parent().siblings("li").removeClass('on');
	        return false;	
		}
	});
	
})

/* function valueEmpty */
jQuery.fn.valueEmpty = function() {
    if (jQuery.trim(jQuery(this).val()).length < 1 ) {
        return true;
    } else {
        return false;
    }
};

/* function number and comma */
function numComma(data){
	if (jQuery.trim(data).length > 3 ) {
    	var returnValue = "";
        var commaValue = ""+data;
        for(idx=commaValue.length-1,chk=0;idx>=0;idx--,chk++){
        	if(chk == 3){
        		chk=0;
        		returnValue = commaValue.substr(idx,1) + "," + returnValue;
        	} else {
        		returnValue = commaValue.substr(idx,1) + returnValue;
        	}
        }
        return returnValue;
    } else {
        return data;
    }
}

$(function () {
	/* function onlyNumber */
	$(".onylNum").change(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
})

// 파일 다운로드
function mfn_fileDownload(fileKey){
	if(fileKey != "" || fileKey == null){
		location.href="/common/fileDownload.do?fileKey="+fileKey;	
	}
};

// 인쇄
/*$(document).on("click", ".btnPrint", function(){
	var initBody = document.body.innerHTML;

	window.onbeforeprint = function () {
		document.body.innerHTML = document.getElementById("subContent").innerHTML;
	}

	window.onafterprint = function () {
		document.body.innerHTML = initBody;
	}

	window.print();
});
*/

// 도움말기능 시작
$(function(){
	$(".adimHpcmIcon").click(function(){
		var obj = $(this);
		chk = obj.attr('chk');
		if (chk == null) {
			chk = 1;
		}
		
		if (chk == 1) {
			$.ajax({
				type : "get",
				url : "/apple/hc/hpcm/selectHpcm.do",
				data : {"hpcmSn" : $(this).attr("data-id")},
				dataType : "json",
				success:function(data){
					obj.popover({
						title : data.hpcmSj,
						container : "body",
						toggle : "popover",
						placement : "bottom",
						trigger: 'focus',
						html : "true",
						content : data.hpcmDc
						
					}).popover('show');
					obj.attr('chk','0');
				},
				error : function(error) {
					alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
				}	
			});
		}else{
			obj.attr('chk','1');
		}
	});
	
	$(".hpcmIcon").click(function(){
		var obj = $(this);
		chk = obj.attr('chk');
		if (chk == null) {
			chk = 1;
		}
		
		if (chk == 1) {
			$.ajax({
				type : "get",
				url : "/common/hc/hpcm/selectHpcm.do",
				data : {"hpcmSn" : $(this).attr("data-id")},
				dataType : "json",
				success:function(data){
					obj.popover({
						title : data.hpcmSj,
						container : "body",
						toggle : "popover",
						placement : "bottom",
						trigger: 'focus',
						html : "true",
						content : data.hpcmDc
					}).popover('show');
					obj.attr('chk','0');
				},
				error : function(error) {
					alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
				}	
			});
		}else{
			obj.attr('chk','1');
		}
	});
})
// 도움말기능 끝

// 메뉴 접근 권한 체크
function menuAccessCheck(mi, sysId){
	var url = "/" + sysId + "/mn/menu/menuAccess.do"
	
	$.ajax({
		type : "post",
		url : url,
		data : { 
			menuId : mi
		},
		dataType : "json",
		success : function(data) {
			var accessVal = JSON.parse(data.accessVal);
			if (accessVal == "Y") {
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//본인인증
			}else if(accessVal == "C"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//통합
			}else if(accessVal == "I"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//접근 권한이 없을 경우
			}else if(accessVal == "F"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			}else {
				alert("접근 권한이 없습니다.");
				return false;
			}
		},
		error : function(data) {
			alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
		}		
	});	
}

// 게시판 접근 권한 체크
function bbsAccessCheck(menuId, sysId, bbsId, subjectId, nttSn){
	var url = "/" + sysId + "/bm/bbs/bbsInfoAccess.do"
	
	$.ajax({
		type : "post",
		url : url,
		data : { 
			menuId : menuId,
			bbsId : bbsId,
			subjectId : subjectId,
			nttSn : nttSn
		},
		dataType : "json",
		success : function(data) {
			var accessVal = JSON.parse(data.accessVal);
			if (accessVal == "Y") {
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//본인인증
			}else if(accessVal == "C"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//통합
			}else if(accessVal == "I"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			//접근 권한이 없을 경우
			}else if(accessVal == "F"){
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			}else {
				alert("접근 권한이 없습니다.");
				return false;
			}
		},
		error : function(data) {
			alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
		}		
	});	
}

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

// 통폐합된 학교안내 스크립트
function closeSystemCheck (){
	alert("해당 학교는 통폐합된 학교입니다.\n회원가입 및 글쓰기가 제한됩니다.");
	return;
}

// 메인위젯 탭 
function focusChange(event, name, menu){
   var code = event.keyCode;
   if(code == 9){
      $("."+menu+" h2 a").removeClass('current');
      $("."+menu+" ."+name+" a").addClass("current");
      $("."+menu+" .list_box").removeClass('on');
      $("."+menu+" ."+name).next(".list_box").addClass('on');
   }
}

// 오늘의 식단 위젯 더보기 
function dietDetail(ctx,form){
	$("."+form).attr('action',"/"+ctx+"/dv/dietView/selectDietDetailView.do").submit();	
} 


var enc64List, dec64List;
 
function initBase64() {
    enc64List = new Array();
    dec64List = new Array();
    var i;
    for (i = 0; i < 26; i++) {
        enc64List[enc64List.length] = String.fromCharCode(65 + i);
    }
    for (i = 0; i < 26; i++) {
        enc64List[enc64List.length] = String.fromCharCode(97 + i);
    }
    for (i = 0; i < 10; i++) {
        enc64List[enc64List.length] = String.fromCharCode(48 + i);
    }
    enc64List[enc64List.length] = "+";
    enc64List[enc64List.length] = "/";
    for (i = 0; i < 128; i++) {
        dec64List[dec64List.length] = -1;
    }
    for (i = 0; i < 64; i++) {
        dec64List[enc64List[i].charCodeAt(0)] = i;
    }
}
 
function base64Encode(str) {
    initBase64();
    var c, d, e, end = 0;
    var u, v, w, x;
    var ptr = -1;
    var input = str.split("");
    var output = "";
    while(end == 0) {
        c = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
            ((end = 1) ? 0 : 0);
        d = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
            ((end += 1) ? 0 : 0);
        e = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
            ((end += 1) ? 0 : 0);
        u = enc64List[c >> 2];
        v = enc64List[(0x00000003 & c) << 4 | d >> 4];
        w = enc64List[(0x0000000F & d) << 2 | e >> 6];
        x = enc64List[e & 0x0000003F];
        if (end >= 1) {x = "=";}
        if (end == 2) {w = "=";}
        if (end < 3) {output += u + v + w + x;}
    }
    var formattedOutput = "";
    var lineLength = 76;
    while (output.length > lineLength) {
     formattedOutput += output.substring(0, lineLength) + "\n";
     output = output.substring(lineLength);
    }
    formattedOutput += output;
    return formattedOutput;
}
 
function base64Decode(str) {
    var c=0, d=0, e=0, f=0, i=0, n=0;
    var input = str.split("");
    var output = "";
    var ptr = 0;
    do {
        f = input[ptr++].charCodeAt(0);
        i = dec64List[f];
        if ( f >= 0 && f < 128 && i != -1 ) {
            if ( n % 4 == 0 ) {
                c = i << 2;
            } else if ( n % 4 == 1 ) {
                c = c | ( i >> 4 );
                d = ( i & 0x0000000F ) << 4;
            } else if ( n % 4 == 2 ) {
                d = d | ( i >> 2 );
                e = ( i & 0x00000003 ) << 6;
            } else {
                e = e | i;
            }
            n++;
            if ( n % 4 == 0 ) {
                output += String.fromCharCode(c) + 
                          String.fromCharCode(d) + 
                          String.fromCharCode(e);
            }
        }
    }
    while (typeof input[ptr] != "undefined");
    output += (n % 4 == 3) ? String.fromCharCode(c) + String.fromCharCode(d) : 
              ((n % 4 == 2) ? String.fromCharCode(c) : "");
    return output;
}

function newOpenVodPop(){
	
	var windowWidth = $( window ).width();
	$("#layerVodPopUp").html('');
	if(windowWidth > 560) {
		$("#layerVodPopUp").html('<video oncontextmenu="return false;" id="myVideo" width="100%" controls="" autoplay=""><source src="http://school.busanedu.net/upload/help/cn/prMvp.mp4" type="video/mp4"></video>');
		$("#layerVodPopUp").dialog({
		    autoOpen: true,
		    modal: false,
		    resizeable : false,
		    title: "홍보동영상",
		    width: 1200,
		    height: 730,
		    show:{
		  		effect:"blind",
		  		duration: 100
		    },
		    hide:{
		   	 	effect:"blind",
		   	 	duration: 100
		    },						    
		}).dialog('open');
	}else{
		alert("동영상 재생은 모바일 화면에서 제공되지 않습니다.\nPC에서 이용해주시기 바랍니다.");
		return;
	}
	
	
	$(".ui-dialog-titlebar-close").click(function(){
		$("#layerVodPopUp").html("");
	})
	
}
//온라인 학습 시간표
function goSchdul(schdulClasGradeCode,schdulClasNm) {
	$("#schdulClasGradeCode").val(schdulClasGradeCode);
	$("#schdulClasNm").val(schdulClasNm);
	$("#schdulClasSendForm").submit();
}
