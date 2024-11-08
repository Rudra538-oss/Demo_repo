
var lastTime = "";
var tm = null;
var xmlDocument;
var eventAlertContent = false;
var loginTime = "";
var responseFlag = true;
var eventInsID = new Array();
var eventInsStartID = new Array();


Array.prototype.exists = function(search){
  for (var i=0; i<this.length; i++)
    if (this[i] == search) return i;
		
  return -1;
} 


function IsNumeric(strString)
   //  check for valid numeric strings	
   {
   var strValidChars = "0123456789.-";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
 }

function integersonly(e)
{
	var key;
	var keychar;
	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	// control keys
	if ((key==null) || (key==0) || (key==8) || 
		(key==9) || (key==13) || (key==27) )
	  return true;

	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}

function numbersonly(e)
{
	var key;
	var keychar;
	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	// control keys
	if ((key==null) || (key==0) || (key==8) || 
		(key==9) || (key==13) || (key==27) )
	  return true;

	// numbers
	else if ((("0123456789.").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}



function delay(millis) 
{
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-date < millis);
}

 function time()
 {
	var Digital=new Date();
 	 var hours=Digital.getHours();
 	 var minutes=Digital.getMinutes();
 	 var seconds=Digital.getSeconds();
 	 var dn="AM";

  	var year=Digital.getYear();

 	 var day=Digital.getDay();
 	 var month=Digital.getMonth();
 	 var daym=Digital.getDate();
 	 if (daym<10)
  		daym="0"+daym;
  	var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  	var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

  	if (hours>12){
  		 dn="PM";
   		hours=hours-12;
  	}

  	if (hours==0)
  		 hours=12;

 	 if (minutes<=9)
  		 minutes="0"+minutes;

  	if (seconds<=9)
  		 seconds="0"+seconds;
  	 var ctime=hours+":"+minutes+":"+seconds+" "+dn;

   	tick1.innerHTML="<b>"+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+" "+ctime+"</b>";

	//setTimeout("time()",1000);
 }

function setFromToDate(fromDays, toDays, format)
{
	document.getElementById("FromDateTimeId").value = getPrevDate(fromDays, format);
	document.getElementById("ToDateTimeId").value = getForwardDate(toDays, format);
}

function ToggleDisplay(img, i_section)
{
	var section = document.getElementById(i_section);
	var display;
	while (section != null) {
		if (section.id == i_section) {
			display = section.style.getAttribute("display", "false");
			switch (display) {
				case "none":
					section.style.display = "inline"					
					img.src="/XMII/CM/ChenMIIPortal/Common/Images/Minimize.gif"
					break;
 				 default:
					section.style.display = "none"
					img.src="/XMII/CM/ChenMIIPortal/Common/Images/Maximize.gif"
 					break;
			}
		}
		section = section.nextSibling;
	}
}

function executeXMLHTTPRequest(url, obj)
{
	var xmlHttp;
	currentRow=0;

	try{ 	

	 // Firefox, Opera 8.0+, Safari  
	xmlHttp=new XMLHttpRequest();  
	}catch (e)  {	
	 // Internet Explorer  
		try {    
  		xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");    
		}  catch (e) {    
			try {      
   			 xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");     
			}catch (e) {      
			alert("Your browser does not support AJAX!");     
			 return false;     
			}   
 		}  
	}

if(xmlHttp)
  {
             xmlHttp.open("GET",url, false);
  	xmlHttp.send();  
	if(obj != "")
	 document.getElementById(obj).innerHTML = xmlHttp.responseText;
	else	
	{
		return xmlHttp.responseXML.documentElement;
	}
 }
 else {
    document.getElementById(obj).innerHTML =
   "Sorry, your browser does not support " +
      "XMLHTTPRequest objects. This page requires " +
      "Internet Explorer 5 or better for Windows, " +
      "or Firefox for any system, or Safari. Other " +
      "compatible browsers may also exist.";
  }
}



function executeHTTPRequestByAjax(url,callBackFunc){

	var xmlHttp;
	currentRow=0;
	try{ 	
	 // Firefox, Opera 8.0+, Safari  
	xmlHttp=new XMLHttpRequest();  
	}catch (e)  {	
	 // Internet Explorer  
		try {    
  		xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");    
		}  catch (e) {    
			try {      
   			 xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");     
			}catch (e) {      
			displayMessage("msgArea", "Your browser does not support AJAX!");     
			 return false;     
			}   
 		}  
	}
 	 xmlHttp.onreadystatechange=function()
   	{
	
   	 if(xmlHttp.readyState==4){
		var xmlDoc = xmlHttp.responseXML;
		xmlDocument = xmlDoc;
		eval(callBackFunc+"();");
 	 }
    }
  	xmlHttp.open("GET",url,true);
 	xmlHttp.send();  
}


function setMessageText(divID, messageText) {

	document.getElementById(divID).style.display = "inline";
	if (navigator.appName == "Netscape") {
		v=".top=";
		dS="document.";
		sD="";
		y="window.pageYOffset";
		dId=divID;
		msgText=messageText;
	}
	else {
		v=".pixelTop=";
		dS="";
		sD=".style";
		y="document.body.scrollTop";
		dId=divID;
		msgText=messageText;
  	 }
}

function checkMessageLocation() {
	object= dId;
	yy=eval(y);
	eval(dS+object+sD+v+yy);
	document.getElementById(dId).innerHTML=msgText;
	//setTimeout("checkMessageLocation()",10);
}

function setDisplayMessage(divID, messageText)
{
	setMessageText(divID, messageText) ;
	checkMessageLocation();
}


 function hideMessage(divID)
{
	document.getElementById(divID).style.display = "none"; 
}


   function displayMessage(divID, messageText)
   {
	document.getElementById(divID).style.display = "inline"; 
	document.getElementById(divID).style.pixelTop= 0;
	document.getElementById(divID).style.pixelLeft=0;
	document.getElementById(divID).style.width = document.body.clientWidth;
	document.getElementById(divID).style.height = 50;
	document.getElementById(divID).innerHTML = messageText;
	setTimeout("hideMessage('"+divID+"')", 15000);
   }

   function displayAlert(divID, messageText)
   {
	document.getElementById(divID).style.display = "inline"; 
	document.getElementById(divID).style.pixelLeft= - (parseFloat(document.getElementById(divID).style.width) + 10);
	document.getElementById(divID).innerHTML = messageText;
	slideAlertDiv(divID);
	setTimeout("slideAlertDivBack('"+divID+"')", 30000);
   }

function adjustDivPositions()
{
	document.getElementById("msgArea").style.top=document.body.scrollTop;
	document.getElementById("loadingDiv").style.top=document.body.scrollTop;
}


function hov(loc,cls) 
{ 
	  if(loc.className) 
	    loc.className=cls; 
} 

function checkEventInstancesForSubscriber(plant, subscriber, offSetVal)
{
	if(!responseFlag)
		return;

	if(offSetVal == null)
		offSetVal = 0;
	
	var dt = new Date(((new Date())  - parseFloat(offSetVal)));
	var now;

	if(lastTime != "")
	{
		now = formatDate(dt, "yyyy-MM-ddTHH:mm:ss");
		var eventIDParam = "'"+eventInsID.join("', '")+"'";
		var url = "/XMII/Illuminator?QueryTemplate=REVAMP/EventAnalyzer/QueryTemplate/SQL_GetEventInstancesBySubscriberForAlert&Param.1="+plant+"&Param.2="+subscriber+"&Param.3="+lastTime+"&Param.4="+now+"&Param.5="+eventIDParam+"&Content-Type=text/xml";

		responseFlag = false;
		executeHTTPRequestByAjax(url,'displayEventAlert');
		setTimeout("checkEventInstancesForSubscriber('"+plant+"', '"+subscriber+"', '"+offSetVal+"')", 30000);
	}
	else
	{
		if((loginTime == "") || (loginTime == null))
			loginTime = formatDate(dt, "yyyy-MM-ddTHH:mm:ss");
		setTimeout("checkEventInstancesForSubscriber('"+plant+"', '"+subscriber+"', '"+offSetVal+"')", 100);
		lastTime = formatDate(dt, "yyyy-MM-ddTHH:mm:ss");
	}
}

function displayEventAlert()
{
	var xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
	 xmlDOM = xmlDocument;
	var eventid = "";
	var endTime = "";
	var startTime= "";
	
	var arraySize = eventInsID.length;

		for(i=0; i< xmlDOM.getElementsByTagName("EventID").length;i++)
		{
			eventAlertContent = true;
			if(xmlDOM.getElementsByTagName("EventStartTime")[i].firstChild.data != null)
				startTime = xmlDOM.getElementsByTagName("EventStartTime")[i].firstChild.data;
			
			var position = eventInsStartID.exists(xmlDOM.getElementsByTagName("EventInstanceID")[i].firstChild.data);

			if((xmlDOM.getElementsByTagName("EventEndTime")[i].firstChild.data != "") && (xmlDOM.getElementsByTagName("EventEndTime")[i].firstChild.data != "TimeUnavailable"))
			{
				endTime = xmlDOM.getElementsByTagName("EventEndTime")[i].firstChild.data;
				eventInsID.push(xmlDOM.getElementsByTagName("EventInstanceID")[i].firstChild.data);
				if( position != -1)
					eventInsStartID.splice(position,1);
			}
			else
			{
				endTime = "?";
				if( position == -1)
					eventInsStartID.push(xmlDOM.getElementsByTagName("EventInstanceID")[i].firstChild.data);
				else
				   continue;
			}
			
			if(eventid == "")
				eventid = "<a href='JavaScript:void(0)' onClick=\"displayEventChainView('"+xmlDOM.getElementsByTagName("EventInstanceID")[i].firstChild.data+"')\">"+xmlDOM.getElementsByTagName("EventID")[i].firstChild.data+"("+xmlDOM.getElementsByTagName("EventStartTime")[i].firstChild.data+" - "+endTime+")</a>";
			else
				eventid = "<a href='JavaScript:void(0)' onClick=\"displayEventChainView('"+xmlDOM.getElementsByTagName("EventInstanceID")[i].firstChild.data+"')\">"+xmlDOM.getElementsByTagName("EventID")[i].firstChild.data+"("+xmlDOM.getElementsByTagName("EventStartTime")[i].firstChild.data+" - "+endTime+")</a>, "+ eventid ;	
		
		}

		
		if(document.getElementById("eventAlertDiv") == null)
		{
			var divObj = document.createElement("div");
			divObj.setAttribute("id", "eventAlertDiv");
			document.body.appendChild(divObj);
		}
		document.getElementById("eventAlertDiv").className = "alertAreaStyle";
		document.getElementById("eventAlertDiv").style.cursor = "hand";
		document.getElementById("eventAlertDiv").style.valign="top";
		
		if(eventid != "")
		{
			var content  = "Event Alert :  "+eventid;
			//document.getElementById("eventAlertDiv").style.width = content.length * 10;
			displayAlert("eventAlertDiv", content);
			document.getElementById("showSlider").style.display = "none";
			document.getElementById("hideSlider").style.display = "inline";
		}
		else 
		{
			if(document.getElementById("eventAlertDiv").innerHTML == "") 
			{
				var content = "No Event Alert";
				//document.getElementById("eventAlertDiv").style.width = content.length * 10;
				document.getElementById("eventAlertDiv").innerHTML = content;
			}
		}

		responseFlag =  true;
}

function slideAlertDiv(divID)
{	
	document.getElementById(divID).style.display = "inline"; 
	var left = document.body.clientWidth/2 - 400;
	document.getElementById(divID).style.pixelTop= 0;

	if(document.getElementById(divID).style.pixelLeft < left)
	{
		if(tm != null)
			clearTimeout(tm);
		document.getElementById(divID).style.pixelLeft=document.getElementById(divID).style.pixelLeft+20;
		tm = setTimeout("slideAlertDiv('"+divID+"')", 50);
	}
	else
	{
		document.getElementById("moreDiv").style.display = "inline";
		document.getElementById("moreDiv").style.pixelLeft = parseFloat(document.getElementById(divID).style.pixelLeft)+parseFloat(document.getElementById(divID).style.width)+10;
		document.getElementById("showSlider").style.display = "none";
		document.getElementById("hideSlider").style.display = "inline";
	}
}


function slideAlertDivBack(divID)
{	
	var left = -800;
	
	if(document.getElementById(divID).style.pixelLeft > left)
	{
		if(tm != null)
			clearTimeout(tm);
		document.getElementById(divID).style.pixelLeft=document.getElementById(divID).style.pixelLeft-20;
		tm = setTimeout("slideAlertDivBack('"+divID+"')", 50);
	}
	else
	{
		document.getElementById("showSlider").style.display = "inline";
		document.getElementById("hideSlider").style.display = "none";
		document.getElementById("moreDiv").style.display = "none";
	}
	//window.status = "Back left "+left+" pixel "+document.getElementById(divID).style.pixelLeft+" width "+document.getElementById(divID).style.width;
}

function displayEventChainView(instanceID)
{
	var url = encodeURI("/XMII/CM/REVAMP/EventAnalyzer/IRPT/DisplayEventChain.irpt?eventInstanceID="+instanceID);        
	var childEventInstance= window.showModalDialog(url,  null ,"dialogWidth:1000px;dialogHeight:800px;center:yes;resizable:yes;edge:sunken;status:no");

}

function displayEventAlertList(offSetVal)
{
	if(offSetVal == null)
		offSetVal = 0;
	
	var dt = new Date(((new Date())  - parseFloat(offSetVal)) - 86400000);

	var fromTime = formatDate(dt, "yyyy-MM-ddTHH:mm:ss");

	var url = encodeURI("/XMII/CM/REVAMP/EventAnalyzer/IRPT/DisplayEventInstanceListForSubscriber.irpt?loginTime=");    
	var childEventInstance= window.showModalDialog(url,  null ,"dialogWidth:900px;dialogHeight:900px;center:yes;resizable:yes;edge:sunken;status:no");
}


function ValidateSMS()
{

if(document.getElementById("MobNum").value=="")
{
	displayMessage("msgArea", "Please enter a mobile number.");
	return false;
} 
else if(document.getElementById("MobNum").value.substring(0,1)!="+")
{
	displayMessage("msgArea", "Number should begin with +");
	return false;
}
else if(isNaN(document.getElementById("MobNum").value.substring(0)) == true )
{
	displayMessage("msgArea", "Please Check the Mobile No. [eg. +(country code)(10 digit mobile no)]");
	return false;	
}
else if(document.getElementById("MobNum").value.length < 13)
{
	displayMessage("msgArea", "Please Check the Mobile No. [eg. +(country code)(10 digit mobile no)]");	
	return false;
}
else 
	return true;
}


function ValidateEmail()
{
		if (document.getElementById("Email").value.indexOf("@")<1 || document.getElementById("Email").value.lastIndexOf(".")<document.getElementById("Email").value.indexOf("@")+2 || document.getElementById("Email").value.lastIndexOf(".")+2>=document.getElementById("Email").value.length)
  		{
			displayMessage("msgArea", "Please Provide a Valid e-mail Address (eg. abc@xyz.com)");
  			return false;
  		}
		else
			return true;	
}


function isInteger(s)
{
      var i;
	s = s.toString();
      for (i = 0; i < s.length; i++)
      {
         var c = s.charAt(i);
         if (isNaN(c)) 
	   {
		//alert("Given value is not a number");
		return false;
	   }
      }
      return true;
}


function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}



function trimAll(sString) 
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
return sString;
}



function checkConsecutiveSpecialCharacters(data)
{
   var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_"; 

   for (var i = 1; i < data.length; i++)
	 {
  	if((iChars.indexOf(data.charAt(i)) > 0) && (iChars.indexOf(data.charAt(i-1)) > 0))
		{
	 		return false;
  		}
 	 }
	return true;
}



function checkBlankSpace(string)
{
	var patt1=/[ ]/g;
	var a = (string.valueOf()).match(patt1);
	if(a != null)
	{
		return false;
	}
	return true;
}


function ToggleDisplay(img, i_section)
{
	var section = document.getElementById(i_section);
	var display;
	if (section != null) {
		if (section.id == i_section) {
			display = section.style.getAttribute("display");
			if (display == "none") {
					section.style.display = "inline";
					img.src="/XMII/CM/REVAMP/Common/Images/Minimize.gif";
					} else {
					section.style.display = "none";
					img.src="/XMII/CM/REVAMP/Common/Images/Maximize.gif";
			}
		}
	}
} 


function closePanel(img, i_section){
	var section = document.getElementById(i_section);
	imgicon = document.getElementById(img);
	section.style.display = "none";
	imgicon.src="/XMII/CM/AirProduct/Common/Images/Maximize.gif";
}

function openPanel(img, i_section){
	var section = document.getElementById(i_section);
	imgicon = document.getElementById(img);
	section.style.display = "inline";
	imgicon.src="/XMII/CM/AirProduct/Common/Images/Minimize.gif";
}

function showOverlay(){
	overlaydiv = document.getElementById("overlayDiv");
	shim = document.getElementById("loadingFrame");
	overlaydiv.style.visibility = "visible";
	shim.style.visibility = "visible";
}

function closeOverlay(){
	overlaydiv = document.getElementById("overlayDiv");
	shim = document.getElementById("loadingFrame");
	overlaydiv.style.visibility = "hidden";
	shim.style.visibility = "hidden";
}

function hideLoading(){
	document.getElementById("loadingDiv").style.visibility = "hidden";
	document.getElementById("loadingFrame").style.visibility = "hidden";
}

function showLoading(){
	document.getElementById("loadingDiv").style.visibility = "visible";
	document.getElementById("loadingFrame").style.visibility = "visible";
}