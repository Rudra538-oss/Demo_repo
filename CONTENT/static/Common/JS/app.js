/************************************* Application Specific Common Functions ***********************************************/

/*
*@Date: 14 Dec,2017
*/

/*
* function localize(page, identifier,userLanguage) - this function is to localize the UI labels. It first tries to localize the text as per the user's language, if not found then it localizes in English.
*Params Description -

*page = Page element object used in  XML View 
*identifier = Used in XML View for each label/text for example, labelKey > Property_Key. For multiple values, use comma separated string.
*userLanguage = User specific language which all the text/labels needs to be translated to.

*/
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.commons.MessageBox");

function localize(page, identifier,userLanguage){

		userLanguage =userLanguage.toLowerCase();
		var oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/UI.properties?refresh="+Math.random(), bundleLocale: userLanguage});
		
		var textNotFound ="" ;
		var identifierArray = identifier.split(",");
		var identifierArrayLen = identifierArray.length;

		for(var i =0;i<identifierArrayLen;i++){

			  var labelIdentifier = identifierArray[i].split(">");
			  var labelKey = labelIdentifier[0];
			  var labelLangKey = labelIdentifier[1];
			  var localizedText = oResourceModel.getProperty(labelLangKey);

			  if(localizedText == "" || localizedText == "undefined" || localizedText == undefined || localizedText == null || localizedText == labelLangKey){

				if(userLanguage == "en"){
					page.setModel(oResourceModel,labelKey);

				}else{
					var temp = textNotFound == ""?identifierArray[i] :","+identifierArray[i];
					textNotFound = textNotFound+ temp;
				}

			   }else{
				page.setModel(oResourceModel,labelKey);	
			   }
		}
		if(textNotFound != "" && userLanguage != "en"){

			oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/UI.properties?refresh="+Math.random(), bundleLocale: "en"});
			var identifierArray = textNotFound.split(",");
			var identifierArrayLen = identifierArray.length;
			
				for(var i =0;i<identifierArrayLen;i++){

					var labelIdentifier = identifierArray[i].split(">");
			  		var labelKey = labelIdentifier[0];
			  		var labelLangKey = labelIdentifier[1];

			  		var localizedText = oResourceModel.getProperty(labelLangKey);
					page.setModel(oResourceModel,labelKey);	
				}

		}
}


/*

*getBCPStatus(bcpElement?,switchBCPElement?,tileBCPElement?) - this is to used to get status of ECC whether it's up or not and set the icon in UI accordingly.
*Input Details:-

*bcpElement - Element object of BCP Icon. (Optional)
*switchBCPElement - Element object of Switch element. (Optional)
*tileBCPElement =Element object of BCP Switch tile. (Optional)

*/
function getBCPStatus(bcpElement,switchBCPElement,tileBCPElement){


		var oBCPStatusModel= new sap.ui.model.xml.XMLModel();
		oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d="+Math.random()+"&Content-Type=text/xml"),"",false);
		var oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");
		

		if(oBCPStats == "2")
		{
		switchBCPElement=="" || switchBCPElement=="undefined" || switchBCPElement== undefined?"":switchBCPElement.setState(true);
		bcpElement == "" || bcpElement == "undefined" || bcpElement == undefined?"":bcpElement.setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-Auto-On.png");
		tileBCPElement=="" || tileBCPElement=="undefined" || tileBCPElement== undefined?"":tileBCPElement.setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-Auto-On.png");
		
		}
		else if(oBCPStats == "1")
		{
		switchBCPElement=="" || switchBCPElement=="undefined" || switchBCPElement== undefined?"":switchBCPElement.setState(true);
		bcpElement == "" || bcpElement == "undefined" || bcpElement == undefined?"":bcpElement.setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
		tileBCPElement=="" || tileBCPElement=="undefined" || tileBCPElement== undefined?"":tileBCPElement.setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
		}
		else
		{
		switchBCPElement=="" || switchBCPElement=="undefined" || switchBCPElement== undefined?"":switchBCPElement.setState(false);
		bcpElement == "" || bcpElement == "undefined" || bcpElement == undefined?"":bcpElement.setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
		tileBCPElement=="" || tileBCPElement=="undefined" || tileBCPElement== undefined?"":tileBCPElement.setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
		}	

		return oBCPStats;

}

/*
*getPropertyValue(oResourceModel,property) - this is used to get the localized text for a particular key/property, specially for texts those comes from backend.
*Input Details -

*oResourceModel - Model which holds the Text Key and Text Localized Value
*Property - Key for which this function returns the localized text 

*/
function getPropertyValue(oResourceModel,property){

	var propertyValue;
	var oResourceXML = oResourceModel.getXML();
	$(oResourceXML).find('Row').each(function(){

		var p = $(this).find('PROPERTY').text();
		var v = $(this).find('VALUE').text();

		if (p== property){
			propertyValue =v;
		}
	});
	return propertyValue;
}

/*
* getResourceModel(properties,userLanguage) - this returns a model which contains Property and Value based on the Properties.
*Input Details -

*properties - properties foe which this function returns the model.
*userLanguage - User Language.
*/
function getResourceModel(properties,userLanguage){

	var refresh = new Date();
	var oResourceModel = new sap.ui.model.xml.XMLModel();
	var propertiesFileLocation = encodeURIComponent("MaterialHandling/Common/resources");

	oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.1="+propertiesFileLocation+"&Param.2="+userLanguage+"&Param.3="+properties+"&cache="+refresh+"&Content-Type=text/xml", "", false);
	return oResourceModel;
}
/*
* getLocalizedQuantity(value,locale) - this returns the value in the specified locale number format.
*Input Details -

*value - value that needs to be localized in the specified locale format.
*locale - The locale, which the value needs to be localized to. Ex. - for US, en-US.
*type - it indicates whether to localize the value to a locale or to convert the value to JavaScript Standard format from localized format. type can be either format or parse. to localize the value, it's format and to convert the value to JavaScript standard format, it's parse.
*/
function getLocalizedQuantity(value,locale,type){

	var oLocale = new sap.ui.core.Locale(locale);
	var oFormatOptions = {
   		minFractionDigits: 2,
    		maxFractionDigits: 3
	};
	jQuery.sap.require("sap.ui.core.format.NumberFormat");
	var oFloatFormat = sap.ui.core.format.NumberFormat.getInstance(oFormatOptions, oLocale);

	if(type == "format"){
		return oFloatFormat.format(value);
	}
	else if(type == "parse"){
		return oFloatFormat.parse(value);
	}else{
		return "type undefined";
	}
}
/*
* setIdleTime(message,hdrTitle) - this is capture the user's idle time and to show a dialog for Session expiration .
*Input Details -

*message - This message gets displayed when user's session expires.
*hdrTitle -  Title for session expiration dialog.
*/

var timeOut;
var isOpenCnf=false;
function setIdleTime(message,hdrTitle){

	var oModel= new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetTimeOutPeriod&d="+new Date()+"&Content-Type=text/xml","",false);
	var timePeriod =parseInt(oModel.getProperty("/Rowset/Row/TimeoutPeriod"));
               
	if(timePeriod > 0){
		timeOut = setTimeout(function(){showTimeoutMsg(message,hdrTitle,timePeriod)} , timePeriod );
		window.onmousemove = function(){reset(message,hdrTitle,timePeriod);};
		window.onkeypress = function(){reset(message,hdrTitle,timePeriod);};
		window.onclick = function(){reset(message,hdrTitle,timePeriod);};
		document.onmousemove = function(){reset(message,hdrTitle,timePeriod);};
		document.onkeypress = function(){reset(message,hdrTitle,timePeriod);};
		document.onclick = function(){reset(message,hdrTitle,timePeriod);};
	}

}
/*
* reset(message,hdrTitle,timePeriod) - this is used in setIdleTime(message,hdrTitle) function.
*Input Details -

*message - This message gets displayed when user's session expires.
*hdrTitle -  Title for session expiration dialog.
*timePeriod- Idle time before showing the session expiration dialogue.
*/

function reset(message,hdrTitle,timePeriod) {
        window.clearTimeout(timeOut);
        timeOut = setTimeout(function(){showTimeoutMsg(message,hdrTitle,timePeriod)} , timePeriod );
}


/*
Fetch SSCC first 20 characters from Bar Code
*/

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

function getPO(ord) {
    var DateNw = new Date();
    var ordLength;
    var flag = 0;
    var sourcePO = ord;
    var POrder = ord;
    if (ord.indexOf("E_") == "0") {
        flag = 1;
        var EPOrdModel = new sap.ui.model.xml.XMLModel();
        EPOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/MDO_GetSourcePO&Param.1=" + ord + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        sourcePO = EPOrdModel.getProperty('/Rowset/Row/SourcePO');
    }
    ordLength = sourcePO.length;
    for (var p = 0; p < (12 - ordLength); p++) {
        sourcePO = "0" + sourcePO;
    }
    if (flag == "0") {
        POrder = sourcePO;
    }

    return [sourcePO, POrder];


}
function serializeXmlNode(xmlNode) {
    if (typeof window.XMLSerializer != "undefined") {
        return (new window.XMLSerializer()).serializeToString(xmlNode);
    } else if (typeof xmlNode.xml != "undefined") {
        return xmlNode.xml;
    }
    return "";
}
/*
* showTimeoutMsg(message,hdrTitle,timePeriod) - this is used in setIdleTime(message,hdrTitle) function.
*Input Details -

*message - This message gets displayed when user's session expires.
*hdrTitle -  Title for session expiration dialog.
*timePeriod- Idle time before showing the session expiration dialogue.
*/

function showTimeoutMsg(message,hdrTitle,timePeriod) {

if(isOpenCnf == false){
   isOpenCnf = true;
   sap.m.MessageBox.show(
      		message, {
         	icon: sap.m.MessageBox.Icon.QUESTION,
         	title: hdrTitle,
       		actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
      		onClose: function(oAction){
       			if(oAction === sap.m.MessageBox.Action.NO){
			    window.open('','_parent','');
           			    window.close();
			}else{
				isOpenCnf = false;
				reset(message,hdrTitle,timePeriod);
			}
		}
	});
	}
}
/*
* formatDate(date,dateFormat,isTimeComponentRequired) - this is to format a given date to the date format configured in shared memory  .
*Input Details -

*date - date to be formatted to.
*dateFormat - date format of the given date.
*isTimeComponentRequired - If the time component to be shown with the date.

*/

function formatDate(date,dateFormat,isTimeComponentRequired) {
	var oModel= new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&Param.1="+date+"&Param.2="+dateFormat+"&Param.3="+isTimeComponentRequired+"&cache="+new Date()+"&Content-Type=text/xml","",false);
	return oModel.getProperty("/Rowset/Row/O_FormattedDate");
}

/*function formatQuantity(quanity,type){

	
	//alert(type1);
	//alert(type2);
	//alert(type);
	try{
		
		if(type == "PARSE"){
			jQuery.sap.require("sap.ui.core.format.NumberFormat");
			var floatFormatter= sap.ui.core.format.NumberFormat.getFloatInstance();
			return(floatFormatter.parse(quanity));
		}else if(type == "FORMAT"){
			//alert(quanity);
			return(sap.oee.ui.Formatter.formatQuantityForOrderCard(quanity));	
			
		}else{
			
			return "undefined";
			
		}
		//alert("1");
	}catch(e){
		//alert("2"+e);
		return "undefined";
	} */

function formatQuantity(quanity,type){
	try{
		var sample=1.2; 
		var decimalSymbol=sample.toLocaleString().substring(1,2); /// dot
		var separator_sample=1000;
		var separatorSymbol= "";
		var locale_sample= separator_sample.toLocaleString();
		if(locale_sample.length > 4){
		  separatorSymbol= locale_sample.substring(1,2);
		}

		if(type == "PARSE"){
			//////////////////////////////////////Userstory 109434 - parse Thousand separator//////////////////////////////////
			if(locale_sample.length > 4 && separatorSymbol != decimalSymbol){
			  while (quanity.indexOf(separatorSymbol)>0) {
			    quanity = quanity.replace(separatorSymbol,"");
			  }
			}
			//////////////////////////////////////END//////////////////
			quanity= quanity.replace(decimalSymbol,".");
			if(quanity[0] == "."){
				return("0"+quanity);
			}else{
				return(quanity);
			}
		}else if(type == "FORMAT" || type == ""){
			//////////////////////////////////////Userstory 109434 - Add Thousand separator//////////////////////////////////
			var quantity_dec, quantity_num;
			if(separatorSymbol != decimalSymbol){
				if( quanity.indexOf(".")>0){
				  quanity_dec= quanity.split(".")[1];
				  quantity_num= Number(quanity.split(".")[0]);
				  quanity = quantity_num.toLocaleString()+decimalSymbol+ quanity_dec;
				} else if( quanity.indexOf(".")==0){
				  quanity= "0"+quanity.replace(".", decimalSymbol);
				} else{
				  quanity = Number(quanity).toLocaleString();
				}
			} else{
				if( quanity.indexOf(".")==0){
				  quanity= "0"+quanity.replace(".", decimalSymbol);
				} else{
				  quanity = quanity.replace(".", decimalSymbol);
				}
			}
			//////////////////////////////////////END//////////////////
			return(quanity);
			
		}else{
			return "undefined";
		}
	}catch(e){
		//alert("2"+e);
		return "undefined";
	}
}
	
function validateQuantity(oEvent){

	var control = oEvent.getSource();
	var lVal, lVal_dec, lVal_num;
	var sVal = oEvent.getParameter("newValue"); //2,3
	var sample=1.2; 
	var decimalSymbol=sample.toLocaleString().substring(1,2); /// dot
	if (sVal == decimalSymbol ){
	
	}else
	if(sVal == "" || sVal == "undefined" || sVal == undefined){
		control.setValue("");
	}
	else{
		var separator_sample=1000;
		var locale_sample= separator_sample.toLocaleString();
		lVal = sVal;
		if(locale_sample.length > 4){
			var groupingSymbol=locale_sample.substring(1,2);
			if(groupingSymbol != decimalSymbol){
			  while (lVal.indexOf(groupingSymbol)>0) {
			    lVal = lVal.replace(groupingSymbol,"");
			  }
			}
		}
		lVal = lVal.replace(decimalSymbol,"."); //2.3

		if(!isNaN(lVal)) {
			if(lVal.indexOf(".") >=0 && sVal.indexOf(decimalSymbol) == -1) {
				sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_27"),{title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")});
				control.setValue(sVal.substring(0,sVal.length-1));
				return;
			}
			else{
				if(groupingSymbol != decimalSymbol){
					if(lVal.indexOf(".")>0){
					  lVal_dec= lVal.split(".")[1];
					  lVal_num= Number(lVal.split(".")[0]);
					  lVal = lVal_num.toLocaleString()+decimalSymbol+ lVal_dec;
					} else if( lVal.indexOf(".")==0){
					  lVal= "0"+lVal.replace(".", decimalSymbol);
					} else{
					  lVal = Number(lVal).toLocaleString();
					}
				} else{
					if( lVal.indexOf(".")==0){
					  lVal= "0"+lVal.replace(".", decimalSymbol);
					} else{
					  lVal = lVal.replace(".", decimalSymbol);
					}
				}
				control.setValue(lVal);
			}
		}
		else{
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_27"),{title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")});
			control.setValue(sVal.substring(0,sVal.length-1));
			return;
		}

	}
}