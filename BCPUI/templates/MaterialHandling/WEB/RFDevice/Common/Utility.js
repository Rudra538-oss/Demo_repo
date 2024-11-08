var symbolQuant;
//////////////////////////////////////////////////////////////////// Populate Dropdown Data /////////////////////////////////////////////////////////////////////////

function populateDropdownData(dropdownID, value, key, queryTemplate)
{
var refresh = new Date();
 var resp;
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	resp = xhttp.responseXML;
	}
};
xhttp.open("GET", queryTemplate+"&cache="+refresh, false);
xhttp.send();

	var dropdownID = document.getElementById(dropdownID);
	var response = resp;
	//dropdownID.options.length = 0;

/*
	var option = document.createElement("option");
	option.text ="";
	option.value ="";
	dropdownID.add(option);
*/
	var options="<option value=''></option>";
	$(response).find("Row").each(function(){
	/*
	var option = document.createElement("option");
	option.text =$(this).find(value).text();
	option.value =$(this).find(key).text();
	*/
	 options += "<option value='"+$(this).find(key).text()+"'>"+$(this).find(value).text()+"</options>";
	/*
	try {
		dropdownID.add(option, null); //Standard 
	}catch(error) {
		dropdownID.add(option); // IE only
	}
	*/
	});
	//alert(dropdownID);
	dropdownID.innerHTML = options;

return resp;
}

//////////////////////////////////////////////////////////////////// Load Query Template Data /////////////////////////////////////////////////////////////////////////

function loadXMLDoc(filename)
{
var refresh = new Date();
var resp;
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	resp = xhttp.responseXML;
	}
};
xhttp.open("GET", filename+"&cache="+refresh, false);
xhttp.send();

return resp;
}

/////////////////////////////////////////////////////////////////////   Get Parameters values from URL /////////////////////////////////////////////////////

function getURLParameter(paramName){

	var paramValue;
	var urlDecoded = decodeURI(window.location.search);	
	var url = urlDecoded.substring(1);
		if(url!= null || url!= "" || url != " "){
			var param = url.split("&");
				for(var i =0 ; i < param.length; i++){

					var splitter = param[i].split("=");

					if(splitter[0] == paramName.trim()){
						paramValue = splitter[1];
						
					}				
					
				}
			
		}
return  paramValue;

}
///////////////////////////////////////////////////////////////// Populate Dropdown Data /////////////////////////////////////////////////////////////////////////

function populateDatalist(datalistID, value, key, queryTemplate)
{
var refresh = new Date();
 var resp;
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	resp = xhttp.responseXML;
	}
};
xhttp.open("GET", queryTemplate+"&cache="+refresh, false);
xhttp.send();

	var datalist = document.getElementById(datalistID);
	var response = resp;
	//dropdownID.options.length = 0;

	var options="<option value=''></option>";
	$(response).find("Row").each(function(){

	 options += "<option value='"+$(this).find(key).text()+"'>"+$(this).find(value).text()+"</options>";

	});

	datalist.innerHTML = options;

return resp;
}

////////////////////////////////   get Resr Property /////////////////////////////////////
function getProperty(xml,keyName){
var keyValue;

$(xml).find('Row').each(function(){
	
	$(this).find('PROPERTY').text();
	$(this).find('VALUE').text();
	
	if ($(this).find('PROPERTY').text()== keyName)
			{
		keyValue = $(this).find('VALUE').text();
			}
	
	});
		return keyValue;
}
///////////////////////////////////////////////////////////////////////////////////////////////// Get BCP Status ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getBCPStatus(){
var bcpXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&Content-Type=text/xml");
var flag=$(bcpXML).find("O_Flag").text();
return flag;
}


/////////////////////// session expired function /////////////////////////////////////////////

var timeOut ;
function callTimeOut (){
var oModel= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetTimeOutPeriod&Content-Type=text/xml");
var timeoutPeriod=$(oModel).find("TimeoutPeriod").text();

  timeOut = setTimeout(function(){alert("Session expired");
		window.open("/XMII/CM/MaterialHandling/RFDevice/Page//MainMenu.irpt","_self");
		} , timeoutPeriod );
document.onmousemove = function(){ reset(timeoutPeriod);};
document.onkeypress = function(){reset(timeoutPeriod);};
document.onclick = function(){ reset(timeoutPeriod);};

}

function reset(timeoutPeriod) {
    window.clearTimeout(timeOut);
    timeOut = setTimeout(function(){alert("Session expired");
		window.open("/XMII/CM/MaterialHandling/RFDevice/Page//MainMenu.irpt","_self");	
		} , timeoutPeriod );
	}


////////////////////////////////////////session expired function /////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////// Protect Default Functionalities of Funcktion Keys ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stopDefaultFunctionalityOfFunctionKeys(evtArg) {

   // Internet Explorer
if ("onhelp" in window)
    window.onhelp = function () { 
        return false;
    }
// Others
else {
    document.onkeydown = function(evt) {
        cancelKeypress = (evt.keyCode == 112);
        if (cancelKeypress) {  // F1 was pressed
            showMyHelpInsteadOfTheUsualDefaultHelpWindow(true);
            return false;
        }
    }

    // Additional step required for Opera
    document.onkeypress = function(evt) {
        if (cancelKeypress) 
            return false;
    }
}
}

function getLanguage(){

var refresh = new Date();
var lang_data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_LanguageForLocalization&Param.1=READ&cache="+refresh+"&Content-type=text/xml");
var lang = $(lang_data).find("O_LangCode").text();

return lang;
}

function dateConvert(){

	var dateFormatConvertModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_DateTimeConversion&Content-type=text/xml");
	var outputDate = $(dateFormatConvertModel).find("OutputDate").text();

	return outputDate;

}

function dateInGMTFormat(ParamDate){
		var datef = new Date(ParamDate);
			var date = datef.getDate();
			var month = datef.getMonth()+1; //since month is 0 indexed
			//fullYear = datef.getFullYear().toString().substr(-2);
			var fullYear = datef.getFullYear();
			if (date < 10) {
					var dateNum = "0" + date;
				} else {
					var dateNum = date;
			}
			if (month < 10) {
					var monthNum = "0" + month;
			} else {
				var monthNum = month;
			}
			
			var fullDate = fullYear + "-" + monthNum + "-" + dateNum;
			return fullDate;
}

function bcpStatus(element,L_values){

data= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&Content-Type=text/xml");
var flag=$(data).find("O_Flag").text();
var t=document.getElementById(element);
 if (flag=="2")
{
t.value=getProperty(L_values,'RF_BCP_STATUS_AUTO_ON');
t.style.backgroundColor='yellow';
t.style.color='black';
}
else if (flag=="0")
{
t.value=getProperty(L_values,'RF_BCP_STATUS_ON');
t.style.backgroundColor='red';
t.style.color='white';
}
else
{
t.value=getProperty(L_values,'RF_BCP_STATUS_OFF');
t.style.backgroundColor='green';
t.style.color='white';
}
 return flag;
}

////////////////////////////////////////// Read Quantity/////////////////////////////////////////

function readQuant(qty,ID){
	//console.log(test+ID);
	
	var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Param.1="+qty+"&Content-Type=text/xml");
	symbolQuant=$(symbolXML).find("O_Quantity").text();
	document.getElementById(ID).value=symbolQuant;
	
}

/////////////////////////////////////////////Fetch SSCC first 20 characters from Bar Code/////////////////////////////////////////

function scanssccno(hu_No) {
if(hu_No!=""){
       if(hu_No.substring(0,2)=="00"){
		hu_No = hu_No.slice(0, 20);
	} else{
		hu_No = hu_No.slice(0, 18);
	}
}
return hu_No;
}

/////////////////////////////////////////////////Validation of Quantity Field/////////////////////////////////////////////////



function Validate(quantity,ID){
 	//alert(quantity);
	var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol=$(symbolXML).find("O_SymbolQuantity").text();

	if(quantity!="")
		{
			
			//var Quant = oEvent.getParameter("newValue"); 
 		 	var quantity1 = quantity.replace(symbol,".");
			//alert(quantity);
			if(quantity == symbol){ 
			
			}else
			 if(quantity1>=0 && !isNaN(quantity1)  )
			{	
				if(quantity1.indexOf(".") >=0 && quantity.indexOf(symbol) == -1) {
					  var value=getProperty(L_values,'BCP_COMMON_MSG_QUANTITY');
                                 			   alert(value);
					document.getElementById(ID).value="";
				}
			}
			else
			{
                        		  if(ID==undefined)
			   {
                                    	document.getElementById("quantityArea").value="";
                                        }
			   else
			   {
                                    	document.getElementById(ID).value="";
                                       }
                                    var value=getProperty(L_values,'BCP_COMMON_MSG_QUANTITY');
                                    alert(value);
                                 }
                       } 
}

/*function Validate(quantity,ID){


	var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol=$(symbolXML).find("O_SymbolQuantity").text();
	//alert(symbol);
	//var quantityAreaValue=document.getElementById("quantityArea").value;
	
	if(quantity.indexOf(".")>=0 && !isNaN(quantity))
	{
	}
	else
	{ 
	  	if(quantity>=0 && !isNaN(quantity)  )
		{		
		}
		else
		{	
			
		  	var value=getProperty(L_values,'BCP_COMMON_MSG_QUANTITY');
		  	 alert(value + symbol);
			if(ID==undefined)
			{
			          document.getElementById("quantityArea").value="";
			}
			else
		 	{
				document.getElementById(ID).value="";
			}
	   	}
	}
}*/



