// 보안EVAL
function secure_eval(s) {
    return (new Function(s)());
}

// 필수입력오류체크
function cmnErrCertChk(reqForm, reqName, reqFoucs)
{
	if(reqForm.value == "")
	{
		alert(reqName +" 입력해주세요");
		reqForm.value = "";
		if(reqForm != null && reqFoucs != "N")
			reqForm.focus();
		return false;
	}
	return true;
}

// 숫자입력오류체크
function numErrChk(reqForm, reqMsg)
{
	if(isNaN(reqForm.value) || reqForm.value=="")
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"숫자만 입력할수 있습니다");
		reqForm.value = "0";
		reqForm.focus();
		return false;
	}
	return true;
}

// 영문유효성체크
function engErrChk(reqForm, reqMsg)
{
	var eng_check = /^[a-zA-Z]+$/;

	if(!eng_check.test(reqForm.value) )
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"영문만 입력할 수 있습니다.");
		
		return false;
	}
	return true;
}
	
// 이메일 필수입력값 체크
function CheckEMail (emailStr) 
{  
	// 전자메일 패턴. 사용자이름@도메인 의 형식을 검사함  
	var emailPat=/^(.+)@(.+)$/;
	// 포함되지 말아야할 특수문자들 ( ) < > @ , ; : \ " . [ ]  
	var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";  
	// 포함될 수 있는 특수문자들 (나머지)  
	var validChars="\[^\\s" + specialChars + "\]";  
	// 아래의 경우는 사용자 이름에 따옴표가 있는 경우. RFC표준사항임  
	var quotedUser="(\"[^\"]*\")"; 
	// 도메인 대신 IP를 사용할 수있음  
	// 예를 들어 laday@[210.120.253.10]은 올바른 메일 주소 "[", "]"이 반드시 필요 
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;  
	// 기본적인 아토믹에 해당됨  
	var atom=validChars + '+';  
	// 사용자로 사용될 수 있는 문자를 나타냄  
	var word="(" + atom + "|" + quotedUser + ")";  
	// 사용자의 패턴을 나타냄. 위의 워드가 .단위로 여러개 올 수있음  
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");  
	// 아래의 것은 일반적인 도메인 패턴에 해당됨  
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");  
	// @을 기준으로 사용자와 도메인으로 나눔. 편의를 위함  
	var matchArray=emailStr.match(emailPat);  
	if (matchArray==null) 
	{    
	// 두개 이상 또는 @이 아예 없는 경우   
		alert("메일주소 형식이 잘못되어 있습니다 (공백 및 @과 .을 확인해 보세요)");    
		return false; 
	}  
	var user=matchArray[1];  
	var domain=matchArray[2];  
	// 사용자 부분이 제대로 되었는지 검사  
	if (user.match(userPat)==null) 
	{    
		alert("메일 아이디가 올바르지 않습니다");    
		return false;  
	} 
	// 도메인 부분이 IP로 되어 있는 경우 
	var IPArray=domain.match(ipDomainPat);  
	if (IPArray!=null) 
	{    
		for (var i=1;i<=4;i++) 
		{      
			if (IPArray[i]>255) 
			{        
				alert("IP 주소 형식이 올바르지 않습니다");        
				return false;      
			}    
		}    
		return true;  
	}  
	// 도메인 이름이 심볼릭 네임인 경우 올바르지 않음  
	var domainArray=domain.match(domainPat);  
	if (domainArray==null) 
	{    
		alert("도메인 형식이 올바르지 않습니다");   
		return false; 
	}  
	// 도메인 형식 검사에 통과했더라도, 마지막 세개 또는 두개의 문자(com, net, kr등등)  
	// 까지 올바른지 검사. 최상위 도메인은 반드시 세글자 아니면 두 글자임  
	var atomPat=new RegExp(atom,"g");  
	var domArr=domain.match(atomPat);  
	var len=domArr.length;  
	if (domArr[domArr.length-1].length<2 ||    domArr[domArr.length-1].length>3) 
	{    
		alert("도메인 주소의 마지막 필드는 반드시 세글자 도메인 또는 두글자 나라이어야 합니다.");    
		return false; 
	}  
	// 호스트이름이 있는지 검사  
	if (len<2) 
	{    
		alert("호스트 이름이 존재하지 않습니다. 호스트 이름은 반드시 2글자 이상이어야 합니다");    
		return false;  
	}  
	
	return true;
}

function onNextFocus(nextID){
	if (event.keyCode == 13) {
		$("#"+nextID).focus(); 
	}
}

function onNextFunc(nextFunc){
	if (event.keyCode == 13) {
		secure_eval(nextFunc);
	}
}

function fnCancel(){
	history.back(-2);
}

function fnUrlCancel(url){
	location.href = url;
}

function fnTextareaPrint(fnNttCn){
	fnNttCn = fnNttCn.split("\u0020").join("&nbsp;");
	fnNttCn = fnNttCn.split("\r\n").join("<br/>");
	fnNttCn = fnNttCn.split("\n").join("<br/>");
	return fnNttCn;
}

function fnReplaceAll(val,beforeVal,afterVal){
	fnNttCn = val.split(beforeVal).join(afterVal);
	return fnNttCn;
}

function fnSplit(val,splitVal){
	arrayVal = val.split(splitVal);
	return arrayVal;
}

function fnTargetMove(targetId,hideClass){
	$("."+hideClass).hide();
	$("#"+targetId).show(); 
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

// 로컬스토리지 사용가능 검사 : true(사용), false(미사용)
function bnlocalStorageUse(){
	return storageAvailable('localStorage');
}
// 로컬스토리지 입력
function setLocalStorageItm(val1,val2){
	localStorage.setItem(val1, val2);
}
// 로컬스토리지 획득
function getLocalStorageItm(val1){
	return localStorage.getItem(val1);
}

// 세션스토리지 사용가능 검사 : true(사용), false(미사용)
function bnSessionStorageUse(){
	return storageAvailable('sessionStorage');
}
// 세션스토리지 입력
function setSessionStorageItm(val1,val2){
	sessionStorage.setItem(val1, val2);
}
// 세션스토리지 획득
function getSessionStorageItm(val1){
	return sessionStorage.getItem(val1);
}

// 개인정보차단 체크
function privateInfoLimit(checkVal,msg){
	if(checkVal == undefined){
		alert("다음과 같은 이유로 게시물이 차단되었습니다."
				+"\n개인정보보호법 제29조에 따라서 개인정보가 노출되지 않도록"
				+"\n하고 있습니다. 개인정보나 불건전 키워드가 포함되지 않았는지 "
				+"\n다시 한 번 확인해주시기 바랍니다.");
	}else{
		alert(msg);
	}
}

//검색엔진
function searchEngine() {
    if( searchForm.qt.value == "" ) {
      alert("검색어를 입력하십시오");
      searchForm.qt.focus();
      return false;
    }
      return true;
}

// 쿠키검색(전체)
function getCommonCookieAll(){
	return document.cookie;
}

// 쿠키검색
function getCommonCookie(name){
	name = new RegExp(name + '=([^;]*)');
	return name.test(document.cookie) ? unescape(RegExp.$1) : '';
}

// 쿠키입력 (유효기간포함)
function setCommonCookie(name, value, expires){
	var time = new Date();
	expires = expires ? time.setDate(time.getDate() + expires) : '';
	document.cookie=name+'='+escape(value)+(expires?'; expires='+time.toGMTString():'');
}

// 쿠키입력
function setCommonCookie(cname,value)
{
	document.cookie = cname + "="+value+"; path=/";
}

// 쿠키삭제
function delCommonCookie(cname)
{
	setCommonCookie(cname,'');
}

// 쿠키전체삭제
function delCommonCookieAll(){
	var doc = document,cookies = doc.cookie.split(';');
	for (var i = cookies.length - 1; i >= 0; i--) {
		if(cookies[i].split('=')[0] != ''){
			var delCommonCookiesName = cookies[i].split('=')[0];
			setCommonCookie(delCommonCookiesName,'');
		}
	}
}

// 파라미터획득
function getParameter(param) {
	var returnValue,
		url = location.href,
		parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'),
		i,
		varName;
	for (i = 0; i < parameters.length; i = i + 1) {
		varName = parameters[i].split('=')[0];
		if (varName.toUpperCase() === param.toUpperCase()) {
			returnValue = parameters[i].split('=')[1];
			return decodeURIComponent(returnValue);
		}
	}
	return undefined;
}

// 웹취약점 보완 target=_blank 속성 일시 rel="noopener noreferrer" 추가 스크립트 
// noopener : Y/N, noreferrer : Y/N, targetId : 입력/미입력
function noOpenerReferrer(noopener,noreferrer,targetId){
	var rel_noopener = "";
	var rel_noreferrer = "";
	var rel_space = "";
	var rel_run_count = 0;
    if(noopener == "Y"){
    	rel_noopener = "noopener"; 
    	rel_run_count += 1;
    }
    if(noreferrer == "Y"){
    	rel_noreferrer = "noreferrer";
    	rel_run_count += 1;
    }
    if(rel_run_count>1){
    	rel_space = " ";
    }
    if(targetId != ""){
    	$(targetId).find('[target*=_blank]').attr('rel',rel_noopener+rel_space+rel_noreferrer);
    }else{
    	$('[target*=_blank]').attr('rel',rel_noopener+rel_space+rel_noreferrer);
    }
}

// 모바일기기체크
function getMobileAt(navigator) {
	var mobileAt = false;
	var clientOS = getClientOS(navigator);
	if(clientOS == "iphone" || clientOS == "ipad" || clientOS == "ipod" || clientOS == "android"){
		mobileAt = true;
	}
	return mobileAt;
}

//사용자 OS 체크
function getClientOS(navigator){
	var userAgent = navigator.userAgent.toLowerCase();
    var os = "etc";
    if (userAgent.indexOf("windows nt 6.1") > -1) {
        os = "windows7";
    }
    else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 6.3") > -1 ) {
        os = "windows8";
    }
    else if (userAgent.indexOf("windows nt 10.0") > -1) {
        os = "windows10";
    }
    else if (userAgent.indexOf("windows nt 6.0") > -1) {
        os = "windowsVista";
    }
    else if (userAgent.indexOf("windows nt 5.1") > -1) {
        os = "windowsXP";
    }
    else if (userAgent.indexOf("windows nt 5.0") > -1) {
        os = "windows2000";
    }
    else if (userAgent.indexOf("windows nt 4.0") > -1) {
        os = "windowsNT";
    }
    else if (userAgent.indexOf("windows 98") > -1) {
        os = "windows98";
    }
    else if (userAgent.indexOf("windows 95") > -1) {
        os = "windows95";
    }
    //window 외
    else if (userAgent.indexOf("iphone") > -1) {
        os = "iphone";
    }
    else if (userAgent.indexOf("ipad") > -1) {
        os = "ipad";
    }
    else if (userAgent.indexOf("android") > -1) {
        os = "android";
    }
    else if (userAgent.indexOf("mac") > -1) {
        os = "mac";
    }
    else if (userAgent.indexOf("linux") > -1) {
        os = "linux";
    }
    return os;
}

// 브라우저 버전체크
function getBrowser(navigator){
	var userAgent = navigator.userAgent.toLowerCase();
	var browser = "etc";
	if (userAgent.indexOf("edge/") > -1) {
        browser = "edge";
    }
    else if (userAgent.indexOf("trident/7.0") > -1) {
        browser = "ie11";
    }
    else if (userAgent.indexOf("msie 10") > -1) {
        browser = "ie10";
    }
    else if (userAgent.indexOf("msie 9") > -1) {
        browser = "ie9";
    }
    else if (userAgent.indexOf("msie 8") > -1) {
        browser = "ie8";
    }
    else if (userAgent.indexOf("msie 7") > -1) {
        browser = "ie7";
    }
    else if (userAgent.indexOf("opr/") > -1 || userAgent.indexOf("opera/") > -1) {
        browser = "opera";
    }
    else if (userAgent.indexOf("chrome/") > -1) {
        browser = "chrome";
    }
    else if (userAgent.indexOf("safari/") > -1) {
        browser = "safari";
    }
    else if (userAgent.indexOf("firefox/") > -1) {
        browser = "firefox";
    }
	return browser;
}

/* IE용 startsWith */
String.prototype.startsWith = function(str) {
	if(str != null){
		if (this.length < str.length) { return false; }
		return this.indexOf(str) == 0;
	}
}
/* IE용 endsWith */
String.prototype.endsWith = function(str) {
	if(str != null){
		if (this.length < str.length) { return false; }
		return this.lastIndexOf(str) + str.length == this.length;
	}
}