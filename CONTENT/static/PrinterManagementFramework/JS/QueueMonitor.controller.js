var machine;
var oResourceModel;
var userLanguage;
var bcpElement;
var oBCPStats, BCPOnStatus,clientFromURL,plantFromURL;
var oControllerThis;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.QueueMonitor", {

onInit : function()
{

	/////////////////////////////////////////////////////////////////////////////////////////////////BCP Status Logic////////////////////////////////////////////////////////////////////
		var DateNw=new Date();
		oControllerThis= this;
		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

		var RefreshDate = new Date();
		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+RefreshDate+"&Content-Type=text/xml","",false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

                       //New code start for Localization default to English/////START
		var details="NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,Print_Select_Printer,PrintMsg_Msg17,Print_Message,PrintMsg_Msg18,PrintMsg_Msg11,PrintMsg_Msg32";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		


		var page=this.getView().byId("page");
		var identifier="QMonitor1>NPDashboard_Back,QMonitor2>Print_BCPPrintQueueMonitor,QMonitor3>Print_QueueMonitor,QMonitor4>Print_PrinterName,QMonitor5>Print_ScreenType,QMonitor6>Print_Status,QMonitor7>Print_StartDateTime,QMonitor8>Print_EndDateTime,QMonitor9>Print_Workcenter,QMonitor10>Print_SSCCNumber,QMonitor11>Print_Fetch,QMonitor28>Print_PrintGivenOn,QMonitor12>Print_PrintedBy,QMonitor13>Print_PrinterName,QMonitor14>Print_PrinterPort,QMonitor15>Print_ScreenType,QMonitor16>Print_Status,QMonitor17>Print_Message,QMonitor18>Print_RetryCount,QMonitor19>Print_LastRetryTime,QMonitor20>Print_Print_ID,QMonitor21>TemplateID,QMonitor22>Print_Content,QMonitor23>Print_SSCCNumber,QMonitor24>Print_Copies,QMonitor25>Print_Reprint,QMonitor26>Print_Reprint,title1>InBndMatRecpt_title_BCP,QMonitor30>NPM_COMMON_BCP_STATUS";
		localize(page, identifier,userLanguage);

//New code start for Localization default to English//// END

		//oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		//this.getView().byId("page").setModel(oResourceModel, "QMonitor");

		machine=document.getElementById("machine").value;
		var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);
                        var ClientModel = new sap.ui.model.xml.XMLModel();
		ClientModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d="+DateNw+"&Content-Type=text/xml","",false);
		clientFromURL = ClientModel.getProperty("/Rowset/Row/CLIENT");
		plantFromURL = ClientModel.getProperty("/Rowset/Row/PLANT");
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Label and Workcenter type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		var oLine = "BCPSTATUS";
		var oLineModel = new sap.ui.model.xml.XMLModel();

		oLineModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oLine + "&d=" + RefreshDate + "&Param.4=" + userLanguage + "&Content-Type=text/xml"), "", false);
		var oLineDrop = this.getView().byId("bcpstatus");
		oLineDrop.setModel(oLineModel);
		BCPOnStatus = oLineModel.getProperty("/Rowset/Row/Value");

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Printer/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var oPrinter="PRINTER_DESC";
		var  machine = document.getElementById("machine").value;
		var oPrinterModel= new sap.ui.model.xml.XMLModel();
		oPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oPrinter+"&Param.2="+machine+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

		var selPrinter = this.getView().byId("printer_name");
		var oListItemprinter= new sap.ui.core.ListItem();
		oListItemprinter.bindProperty("text", "Value");
		oListItemprinter.bindProperty("key", "Key");
		selPrinter.bindItems("/Rowset/Row", oListItemprinter);
		selPrinter.setModel(oPrinterModel);
		//selPrinter.setSelectedKey(getPropertyValue(oResourceModel, "Print_Select_Printer"));
		//selPrinter.setSelectedKey("DATAMAX");
	
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Screen type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var oScreenType="SCREEN_TYPE";
		var oScreenTypeModel= new sap.ui.model.xml.XMLModel();
		oScreenTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oScreenType+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

		var selScreenType = this.getView().byId("screen_type");
		var oListItemScreenType= new sap.ui.core.ListItem();
		oListItemScreenType.bindProperty("text", "Value");
		oListItemScreenType.bindProperty("key", "Key");
		selScreenType.bindItems("/Rowset/Row", oListItemScreenType);
		selScreenType.setModel(oScreenTypeModel);
		selScreenType.setSelectedKey("Select Screen Type");
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Status/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var oStatus="STATUS";
		var oStatusModel= new sap.ui.model.xml.XMLModel();
		oStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oStatus+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

		var selStatus = this.getView().byId("Status");
		var oListItemStatus= new sap.ui.core.ListItem();
		oListItemStatus.bindProperty("text", "Value");
		oListItemStatus.bindProperty("key", "Key");
		selStatus.bindItems("/Rowset/Row", oListItemStatus);
		selStatus.setModel(oStatusModel);
		selStatus.setSelectedKey("Select Status");	
                          var Error=getPropertyValue(oResourceModel,"ODATA_Error");
                          var oLineDrop = this.getView().byId("Line");
                          sortinglines(plantFromURL,clientFromURL,userLanguage,oLineDrop,Error,1);		
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////Set date in Start date and End Date ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var datenow = new Date();
		var date1=datenow.setTime(datenow.getTime() - 5 * 24 * 60 * 60 * 1000);
		var day = datenow.getDate();
		
		var month = datenow.getMonth() + 1;
		var year = datenow.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today1 = month + "/" + day + "/" + year; 
		this.getView().byId("StartTime").setValue(today1);
		
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = month + "/" + day + "/" + year; 
		this.getView().byId("EndTimeDate").setValue(today);

		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy HH:mm:ss"}); 
		var stDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy 00:00:00"}); 
		var oStartTime=  stDateFormat.format(new Date(today1));
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy HH:mm:ss"}); 
		var stDateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy 23:59:59"}); 
		var oEndTime=  stDateFormat1.format(new Date(today));
		
		var oSSCCNumber = this.getView().byId("SSCCNumberID").getValue();
		if(oSSCCNumber=="")
		oSSCCNumber="%";

		var oPrinterName="%";
		var oScreenType="%";
		var oStatus="ALL";
		var oWorkstation="%";
		

			var oDisplayQueueMonitorModel =new sap.ui.model.xml.XMLModel();
                                    oDisplayQueueMonitorModel.setSizeLimit(10000);
			oDisplayQueueMonitorModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_QueueMonitor&Param.1="+oPrinterName+"&Param.2="+oScreenType+"&Param.3="+oStatus+"&Param.4="+oStartTime+"&Param.5="+oEndTime+"&Param.6="+oSSCCNumber+"&d="+RefreshDate+"&Param.7="+oWorkstation+"&Content-Type=text/xml"), "", false);
			var oQueueMonitorTable= this.getView().byId("QueueMonitorTable");
			oQueueMonitorTable.setModel(oDisplayQueueMonitorModel);
			var oQueueMonitorItems = this.getView().byId("QueueMonitorItems");
			oQueueMonitorTable.bindItems("/Rowset/Row",oQueueMonitorItems);  
	
	var nodes = $(oDisplayQueueMonitorModel.getData()).find("Row").size();
	for(var i=0;i<nodes;i++){
	if(oDisplayQueueMonitorModel.getProperty("/Rowset/Row/"+i+"/REPRINT_ENABLED")=="false")
	sap.ui.getCore().byId("idQueueMonitor--ReprintID-idQueueMonitor--QueueMonitorTable-"+i).setEnabled(false);
	}
/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
	var oModelDF= new sap.ui.model.xml.XMLModel();
	oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
	var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
	this.getView().byId("StartTime").setDisplayFormat(oDisplayFormat);
	this.getView().byId("EndTimeDate").setDisplayFormat(oDisplayFormat);
	},
	onAfterRendering: function(){
/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg,sessionExpTitle);

/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
		setInterval(function(){
		oBCPStats = getBCPStatus(bcpElement,"","");
		},30000);
	},
	
	toTilesPage : function()
	{
		var refresh= new Date();
		var app = sap.ui.getCore().byId("idapp");
		app.to("idview2","show");

		var gmTileVisibility=false;
		var loginuser = document.getElementById("login").value;
		loginuser=loginuser.toUpperCase();
		var client="103";
		var plant = sap.ui.getCore().byId("idview1--plant").getSelectedItem().getText();
		var wrkcntr = sap.ui.getCore().byId("idview1--workcenter").getValue();
		var NodeModel = new sap.ui.model.xml.XMLModel();
		NodeModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetNodebyPlant_Workcenter&Param.1="+plant+"&Param.2="+wrkcntr+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);

		var node_id = NodeModel.getProperty("/Rowset/Row/NODE_ID");

		var inputData = {
					client : client,
					plant : plant,
					nodeID : node_id
			   	 };

		gmTileVisibility = tileVisibility(inputData);
		console.log(gmTileVisibility);
		sap.ui.getCore().byId("idview2--goodsmvt_tile").setVisible(gmTileVisibility);
	},

	doLogoff : function()
	{


	},

	doCheck : function()
	{
		

		var oSSCCNumber = this.getView().byId("SSCCNumberID").getValue();
		var oPrinterName= this.getView().byId("printer_name").getSelectedKey();
		
		var oScreenType= this.getView().byId("screen_type").getSelectedKey();
		
		var oStatus= this.getView().byId("Status").getSelectedKey();
		
		var StartTime1= this.getView().byId("StartTime").getValue();
		
		var EndTime1= this.getView().byId("EndTimeDate").getValue();
		var StartTime= this.getView().byId("StartTime").getDateValue();
		
		var EndTime= this.getView().byId("EndTimeDate").getDateValue();
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy HH:mm:ss"}); 
		var stDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy 00:00:00"}); 
		var oStartTime=  stDateFormat.format(new Date(StartTime));
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy HH:mm:ss"}); 
		var stDateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MM/dd/yyyy 23:59:59"}); 
	
		var oEndTime=  stDateFormat1.format(new Date(EndTime));
		var oWorkstation=this.getView().byId("Line").getSelectedKey();
		var selectedBCPStatus = this.getView().byId("bcpstatus").getSelectedKeys().toString();
		
		if(oWorkstation=="Select Default")
		{
			oWorkstation="%";

		}
		if(oPrinterName=="---")
		{
			oPrinterName="%";
			
		}
		if(oScreenType=="---")
		{
			oScreenType="%";
			
		}
		if(oStatus=="---")
		{
			oStatus="ALL";	
		}
		if(oSSCCNumber=="")
		{
			oSSCCNumber="%";
		}else{
		  oSSCCNumber = "%"+oSSCCNumber.replace(/^0+/, '').replace('*','%');
		}
		if(StartTime1=="")
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg17"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
		else if(EndTime1=="")
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg18"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
		else
		{
		
			var date=new Date();
			var oDisplayQueueMonitorModel =new sap.ui.model.xml.XMLModel();
			oDisplayQueueMonitorModel.attachRequestSent(function(){
				sap.ui.core.BusyIndicator.show(1);
			});
			oDisplayQueueMonitorModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_QueueMonitor&Param.1="+oPrinterName+"&Param.2="+oScreenType+"&Param.3="+oStatus+"&Param.4="+oStartTime+"&Param.5="+oEndTime+"&Param.6="+oSSCCNumber+"&Param.7="+oWorkstation+"&Param.8="+selectedBCPStatus+"&d="+date+"&Content-Type=text/xml"), "", true);
			oDisplayQueueMonitorModel.attachRequestCompleted(function(){
				sap.ui.core.BusyIndicator.hide();
			var oQueueMonitorTable= oControllerThis.getView().byId("QueueMonitorTable");
			oQueueMonitorTable.setModel(oDisplayQueueMonitorModel);
			var oQueueMonitorItems = oControllerThis.getView().byId("QueueMonitorItems");
			oQueueMonitorTable.bindItems("/Rowset/Row",oQueueMonitorItems);  
			
			

			var nodes = $(oDisplayQueueMonitorModel.getData()).find("Row").size();

			//alert(nodes);
			for(var i=0;i<nodes;i++){
			if(oDisplayQueueMonitorModel.getProperty("/Rowset/Row/"+i+"/REPRINT_ENABLED")=="false")
			sap.ui.getCore().byId("idQueueMonitor--ReprintID-idQueueMonitor--QueueMonitorTable-"+i).setEnabled(false);
			else
			sap.ui.getCore().byId("idQueueMonitor--ReprintID-idQueueMonitor--QueueMonitorTable-"+i).setEnabled(true);
			}
			});
		}


	},
	doPressReprint  : function(evt)
	{
		var Context=evt.getSource().getBindingContext().toString();
		var index=Context.substr(12,13);
		
		var oReprintQueueTable= this.getView().byId("QueueMonitorTable");
		var oReprintQueueModel =oReprintQueueTable.getModel();
		var TemplateID=oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/TEMPLATE_ID");
		var PrinterID=oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/PRINTER_ID");
		var ScreenType=oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/SCREEN_TYPE");
		var oSSCCNumber = oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/SSCCNumber");
		var PrintContent=oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/Printer_DATETIME");
		var printer_ip = oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/PRINTED_ON_IP");
		var printer_port = oReprintQueueModel.getProperty("/Rowset/Row/"+index+"/PRINTED_ON_PORT");
		var copies = 1;
		var printed_by = document.getElementById("login").value;

		var date=new Date();
		var oReprintQueueMonitorModel =new sap.ui.model.xml.XMLModel();
		oReprintQueueMonitorModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Insert_Reprint_QueueMonitor&Param.1="+PrinterID+"&Param.2="+TemplateID+"&Param.3="+PrintContent+"&Param.4="+ScreenType+"&Param.5="+oSSCCNumber+"&Param.6="+printer_ip+"&Param.7="+printer_port+"&Param.8="+printed_by+"&Param.9="+copies+"&d="+date+"&Content-Type=text/xml"), "", false);
		if(oReprintQueueMonitorModel.getProperty("/Rowset/Row/O_Success")  == 0)
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg11"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));
		}
		else
		{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg32"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
	},
goBack : function(){

 	window.top.close();

},
/* getDateDisplayFormat: function(date){
	
	if(date === "0000-00-00"){
		return date;
	}else{
                 
                   
		return formatDate(date,"MM/dd/yyyy HH:mm:ss","YES");
                          
		}  
                
               
}, */
onSelectPrinter : function() {

		var oPrinterName= this.getView().byId("printer_name").getSelectedKey();

		////////////////////////////////////////////////////// IF No Printer Is Selected///////////////////////////////////////////////////////////////////
		if(oPrinterName=="---") {
		var oLine="WORKCENTER";
		var oLineModel= new sap.ui.model.xml.XMLModel();
		oLineModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oLine+"&d="+new Date()+"&Param.4="+userLanguage+"&Content-Type=text/xml"),"",false);

		var oLineDrop = this.getView().byId("Line");
		var oListItem= new sap.ui.core.ListItem();
		oListItem.bindProperty("text", "Value");
		oListItem.bindProperty("key", "Key");
		oLineDrop.bindItems("/Rowset/Row", oListItem);
		oLineDrop.setModel(oLineModel);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var oScreenType="SCREEN_TYPE";
		var oScreenTypeModel= new sap.ui.model.xml.XMLModel();
		oScreenTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oScreenType+"&d="+new Date()+"&Content-Type=text/xml"),"",false);

		var selScreenType = this.getView().byId("screen_type");
		var oListItemScreenType= new sap.ui.core.ListItem();
		oListItemScreenType.bindProperty("text", "Value");
		oListItemScreenType.bindProperty("key", "Key");
		selScreenType.bindItems("/Rowset/Row", oListItemScreenType);
		selScreenType.setModel(oScreenTypeModel);
		selScreenType.setSelectedKey("Select Screen Type");
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Status/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var oStatus="STATUS";
		var oStatusModel= new sap.ui.model.xml.XMLModel();
		oStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oStatus+"&d="+new Date()+"&Content-Type=text/xml"),"",false);

		var selStatus = this.getView().byId("Status");
		var oListItemStatus= new sap.ui.core.ListItem();
		oListItemStatus.bindProperty("text", "Value");
		oListItemStatus.bindProperty("key", "Key");
		selStatus.bindItems("/Rowset/Row", oListItemStatus);
		selStatus.setModel(oStatusModel);
		selStatus.setSelectedKey("Select Status");	
		}

 		else {

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////Set Workcenter/////////////////////////////////////////////////////////////////////////////////////////
		var oLine="WORKCENTER";
		var oLineModel= new sap.ui.model.xml.XMLModel();
		oLineModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetDropDownByPrinterDesc&Param.1="+oPrinterName+"&Param.2="+oLine+"&Param.3="+userLanguage+"&d="+new Date()+"&Content-Type=text/xml"),"",false);

		var oLineDrop = this.getView().byId("Line");
		var oListItem= new sap.ui.core.ListItem();
		oListItem.bindProperty("text", "Value");
		oListItem.bindProperty("key", "Key");
		oLineDrop.bindItems("/Rowset/Row", oListItem);
		oLineDrop.setModel(oLineModel);

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////Set Screen Type/////////////////////////////////////////////////////////////////////////////////////////
		var oScreenType="SCREEN_TYPE";
		var oScreenTypeModel= new sap.ui.model.xml.XMLModel();
		oScreenTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetDropDownByPrinterDesc&Param.1="+oPrinterName+"&Param.2="+oScreenType+"&Param.3="+userLanguage+"&d="+new Date()+"&Content-Type=text/xml"),"",false);

		var selScreenType = this.getView().byId("screen_type");
		var oListItemScreenType= new sap.ui.core.ListItem();
		oListItemScreenType.bindProperty("text", "Value");
		oListItemScreenType.bindProperty("key", "Key");
		selScreenType.bindItems("/Rowset/Row", oListItemScreenType);
		selScreenType.setModel(oScreenTypeModel);
		selScreenType.setSelectedKey("Select Screen Type");
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Set Status/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var oStatus="STATUS";
		var oStatusModel= new sap.ui.model.xml.XMLModel();
		oStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetDropDownByPrinterDesc&Param.1="+oPrinterName+"&Param.2="+oStatus+"&Param.3="+userLanguage+"&d="+new Date()+"&Content-Type=text/xml"),"",false);

		var selStatus = this.getView().byId("Status");
		var oListItemStatus= new sap.ui.core.ListItem();
		oListItemStatus.bindProperty("text", "Value");
		oListItemStatus.bindProperty("key", "Key");
		selStatus.bindItems("/Rowset/Row", oListItemStatus);
		selStatus.setModel(oStatusModel);
		selStatus.setSelectedKey("Select Status");
		
		}
}
 });