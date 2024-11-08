var oTemplateID
var ScreenType; 
var LabelType;
var oControllerIMR;	
var dOrderNotxtFld;
var oDialog1;
var index;
var  machine1;
var oResourceModel;
var userLanguage;
var timeOut;
var isOpenCnf = false; 
var bcpElement;
var oBCPStats;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.TemplateManagement", {

onInit : function(){

/////////////////////////////////////////////////////////////////////////////////////////////////BCP Status Logic////////////////////////////////////////////////////////////////////
		var DateNw=new Date();
		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");


	var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
	this.getView().byId("shell1").getUser().setUsername(username);
	oControllerIMR=this;
	this.getView().byId("workstation").setValue(document.getElementById("machine").value);
	this.getView().byId("noCopies").setValue(1);
	var RefreshDate = new Date();
	var oUserDataModel= new sap.ui.model.xml.XMLModel();
	oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+RefreshDate+"&Content-Type=text/xml","",false);
	userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
	
	//New code start for Localization default to English/////START
		var details="NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,PrintMsg_Msg19,PrintMsg_Msg33,PrintMsg_Msg20,PrintMsg_Msg21,PrintMsg_Msg22,PrintMsg_Msg23,PrintMsg_Msg12,Print_Select_Printer,PrintMsg_Msg33,Print_Select_ScreenType,Print_Select_LabelType,PrintMsg_Msg22,PrintMsg_Msg25,PrintMsg_Msg26,PrintMsg_Msg27,PrintMsg_Msg28,Print_Edit_Template,Print_Save,Print_Close,PrintMsg_Msg13,PrintMsg_Msg15,PrintMsg_Msg29,PrintMsg_Msg30,Print_Message,Print_Question";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		


		var page=this.getView().byId("page");
		var identifier="TManage1>NPDashboard_Back,TManage2>Print_BCPManagePrinterConfiguration,TManage3>Print_Template_Mangemnt,TManage4>Print_Workstation,TManage5>Print_PrinterName,TManage6>Print_ScreenType,TManage7>Print_Label_Type,TManage8>Print_Copies,TManage9>Print_Global_Template,TManage10>Print_InsertTemplate,TManage11>Print_OverrideGlobalTemplate,TManage13>Print_UploadTemplate,TManage14>Print_DeleteTemplate,TManage15>Print_PrinterName,TManage16>Print_ScreenType,TManage17>Print_Label_Type,TManage18>Print_PrinterTemplate,TManage19>Print_TemplateID,title1>InBndMatRecpt_title_BCP";
		localize(page, identifier,userLanguage);

//New code start for Localization default to English//// END


	//oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
	//this.getView().byId("page").setModel(oResourceModel, "TManage");
	
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
doFetch: function()
{
	var RefreshDate = new Date();
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Printer/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var oPrinter="PRINTER";
	machine1 = this.getView().byId("workstation").getValue();
	var oPrinterModel= new sap.ui.model.xml.XMLModel();
	oPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oPrinter+"&Param.2="+machine1+"&d="+RefreshDate+"&Param.4="+userLanguage+"&Content-Type=text/xml"),"",false);

	var selPrinter = this.getView().byId("printer_name");
	var oListItemprinter= new sap.ui.core.ListItem();
	oListItemprinter.bindProperty("text", "Value");
	oListItemprinter.bindProperty("key", "Key");
	selPrinter.bindItems("/Rowset/Row", oListItemprinter);
	selPrinter.setModel(oPrinterModel);
	selPrinter.setSelectedKey("Select Printer");
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Screen type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var oScreenType="SCREEN_TYPE";
	var oScreenTypeModel= new sap.ui.model.xml.XMLModel();
	oScreenTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oScreenType+"&d="+RefreshDate+"&Param.4="+userLanguage+"&Content-Type=text/xml"),"",false);

	var selScreenType = this.getView().byId("ScreenTypeID");
	var oListItemScreenType= new sap.ui.core.ListItem();
	oListItemScreenType.bindProperty("text", "Value");
	oListItemScreenType.bindProperty("key", "Key");
	selScreenType.bindItems("/Rowset/Row", oListItemScreenType);
	selScreenType.setModel(oScreenTypeModel);
	selScreenType.setSelectedKey("Select Screen Type");

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Global Template/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var oGlobal="GLOBAL_TEMPLATE";
	var oGlobalTemplateModel= new sap.ui.model.xml.XMLModel();
	oGlobalTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oGlobal+"&d="+RefreshDate+"&Param.4="+userLanguage+"&Content-Type=text/xml"),"",false);

	var selGlobalTemplate = this.getView().byId("template");
	var oListItemGlobalTemplate= new sap.ui.core.ListItem();
	oListItemGlobalTemplate.bindProperty("text", "Value");
	oListItemGlobalTemplate.bindProperty("key", "Key");
	selGlobalTemplate.bindItems("/Rowset/Row", oListItemGlobalTemplate);
	selGlobalTemplate.setModel(oGlobalTemplateModel);
	selGlobalTemplate.setSelectedKey("Select Global Template");

	
	var oDisplayPrinterTemplateModel =new sap.ui.model.xml.XMLModel();
           oDisplayPrinterTemplateModel.setSizeLimit(10000);
	oDisplayPrinterTemplateModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetButtonText_PrinterTemplate&Param.1="+machine1+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);
	var oPrinterTemplateTable= this.getView().byId("PrinterTemplateTable");
	oPrinterTemplateTable.setModel(oDisplayPrinterTemplateModel);
	var PrinterTemplateItems = this.getView().byId("PrinterTemplateItems");
	oPrinterTemplateTable.bindItems("/Rowset/Row",PrinterTemplateItems);  

},
handleScreenTypeSelectionChange : function()
{
	var RefreshDate = new Date();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Label type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var oLabelType="LABEL_TYPE";
	this.getView().byId("LabelTypeID").setEnabled(true);
	var ScreenType = this.getView().byId("ScreenTypeID").getSelectedKey();
	
	var oLabelTypeModel= new sap.ui.model.xml.XMLModel();
	oLabelTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1="+oLabelType+"&Param.3="+ScreenType+"&d="+RefreshDate+"&Param.4="+userLanguage+"&Content-Type=text/xml"),"",false);

	var selLabelType = this.getView().byId("LabelTypeID");
	var oListItemLabelType= new sap.ui.core.ListItem();
	oListItemLabelType.bindProperty("text", "Value");
	oListItemLabelType.bindProperty("key", "Value");
	selLabelType.bindItems("/Rowset/Row", oListItemLabelType);
	selLabelType.setModel(oLabelTypeModel);
	selLabelType.setSelectedKey("Select Label Type");



},

OverrideGlobalTemplateFunction : function()
{
	var oCheckedBox =this.getView().byId("Change").getSelected();
	if(oCheckedBox==true)
	{
		this.getView().byId("fileUploader").setEnabled(true);
		this.getView().byId("UploadTemplate").setEnabled(true);
		this.getView().byId("InsertTemplate").setEnabled(false);
		this.getView().byId("template").setEnabled(false);
		
	}
	else
	{
		this.getView().byId("fileUploader").setEnabled(false);
		this.getView().byId("UploadTemplate").setEnabled(false);
		this.getView().byId("InsertTemplate").setEnabled(true);
		this.getView().byId("template").setEnabled(true);
	}

},

doLogoff2 : function()
{
	window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/Printer_Config_Template.irpt","_self");
},

goToPrinterConfig : function()
{

	var app = sap.ui.getCore().byId("idapp");
	app.to("PrinterConfig","show");
},


doInsertTemplate: function()
{
	var RefreshDate = new Date();
	var oPrinterID= this.getView().byId("printer_name").getSelectedKey();
	var oLabelType= this.getView().byId("LabelTypeID").getSelectedKey();
	var oScreenType= this.getView().byId("ScreenTypeID").getSelectedKey();
	var noOfCopies = this.getView().byId("noCopies").getValue();
	
	var oGlobalTemplate= this.getView().byId("template").getSelectedKey();
	var TemplateName= this.getView().byId("template").getSelectedItem().getText();
	if(oPrinterID=="---")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg19"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}

	else if (isNaN(noOfCopies)){

		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg33"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	
	else if(oScreenType=="---")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg20"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else if(oLabelType=="Select Label Type")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg21"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else
	{
		var oInsertTemplateModel= new sap.ui.model.xml.XMLModel();
		oInsertTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ValidationOfAddSameFile&Param.1="+machine1+"&Param.2="+oPrinterID+"&Param.3="+oScreenType+"&Param.4="+oLabelType+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);
		var oFlag=oInsertTemplateModel.getProperty("/Rowset/Row/Flag");
		if(oFlag==1)
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg22"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
		else
		{
			var usrname = document.getElementById("login").value;
			var oCheckedBox =this.getView().byId("Change").getSelected();
			if(oCheckedBox==false)
				oCheckedBox=0;
			else
			oCheckedBox=1;
	
			if(TemplateName=="Select Global Template")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg23"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
			}	
			else
			{
				var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();
				oPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_InsertTemplate_Printer&Param.1="+oPrinterID+"&Param.2="+TemplateName+"&Param.3="+oScreenType+"&Param.5="+oGlobalTemplate+"&Param.6="+oCheckedBox+"&Param.7="+usrname+"&Param.8="+oLabelType+"&Param.9="+noOfCopies+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg12"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));

				var oDisplayPrinterTemplateModel =new sap.ui.model.xml.XMLModel();
				oDisplayPrinterTemplateModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetButtonText_PrinterTemplate&Param.1="+machine1+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);
				var oPrinterTemplateTable= this.getView().byId("PrinterTemplateTable");
				oPrinterTemplateTable.setModel(oDisplayPrinterTemplateModel);
				var PrinterTemplateItems = this.getView().byId("PrinterTemplateItems");
				oPrinterTemplateTable.bindItems("/Rowset/Row",PrinterTemplateItems);  
			}
		}
	}
},

doUpload : function()
{
	var RefreshDate = new Date();
	this.getView().byId("EditTemplate1").setVisible(true);
	var oPrinterTemplateTable= this.getView().byId("PrinterTemplateTable");
	var PrinterTemplateItems = this.getView().byId("PrinterTemplateItems");
	var oPrinterID= this.getView().byId("printer_name").getSelectedKey();
	var oScreenType= this.getView().byId("ScreenTypeID").getSelectedKey();
	var oLabelType= this.getView().byId("LabelTypeID").getSelectedKey();
	var oGlobalTemplate= this.getView().byId("template").getSelectedKey();
	var TemplateName= this.getView().byId("template").getSelectedItem().getText();
	var usrname = document.getElementById("login").value;
	var noOfCopies = this.getView().byId("noCopies").getValue();
	var filename;
	var oCheckedBox =this.getView().byId("Change").getSelected();
	if(oCheckedBox==false)
	oCheckedBox=0;
	else
	oCheckedBox=1;
	var file = document.getElementById("TemplateManagement--fileUploader-fu").files[0];
	var fullPath = document.getElementById("TemplateManagement--fileUploader-fu").value;

	if(oPrinterID=="---")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "Print_Select_Printer"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else if (isNaN(noOfCopies)){

		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg33"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else if(oScreenType=="---")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "Print_Select_ScreenType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else if(oLabelType=="Select Label Type")
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "Print_Select_LabelType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	}
	else
	{
		var oInsertTemplateModel= new sap.ui.model.xml.XMLModel();
		oInsertTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ValidationOfAddSameFile&Param.1="+machine1+"&Param.2="+oPrinterID+"&Param.3="+oScreenType+"&Param.4="+oLabelType+"&Content-Type=text/xml"),"",false);
		var oFlag=oInsertTemplateModel.getProperty("/Rowset/Row/Flag");
	
		if(oFlag==1)
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg22"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
		else
		{
		if(fullPath=="")
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg25"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
		}
		else
		{
			if (fullPath)
			{
   				var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    				var filename = fullPath.substring(startIndex);
   				if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) 
				{
        					filename = filename.substring(1);
  	 			}
    
			}

			if (file) 
			{
   				var reader = new FileReader();
    				reader.readAsText(file, "UTF-8");
    				reader.onload = function (evt) {
      		
				var jqxhr = $.post( "/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_InsertTemplate_Printer&Content-Type=text/xml",{
				 "Param.1": oPrinterID, "Param.2": filename,"Param.3": oScreenType, "Param.4": evt.target.result,"Param.6": oCheckedBox, "Param.7": usrname,"Param.8":oLabelType,"Param.9":noOfCopies
				},"xml")
					  .done(function() {
   						jQuery.sap.require("sap.ui.commons.MessageBox");
						sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg26"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));
						var oDisplayPrinterTemplateModel =new sap.ui.model.xml.XMLModel();
                                                                        oDisplayPrinterTemplateModel.setSizeLimit(10000);
						oDisplayPrinterTemplateModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetButtonText_PrinterTemplate&Param.1="+machine1+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);
						oPrinterTemplateTable.setModel(oDisplayPrinterTemplateModel);
						oPrinterTemplateTable.bindItems("/Rowset/Row",PrinterTemplateItems);  

				  })
					  .fail(function() {
   						 alert( getPropertyValue(oResourceModel, "PrintMsg_Msg27") );
 				 });
	
   				}
				
    				reader.onerror = function (evt)
				{
       					alert(getPropertyValue(oResourceModel, "PrintMsg_Msg28"));
    				}
			}
		}		
	}

}
	
},
doRowSelect: function()
{
	var oPrinterTemplateTable= this.getView().byId("PrinterTemplateTable");
	var selected_Item =oPrinterTemplateTable.getSelectedItem().toString(); 
	
	index  = selected_Item.substr(selected_Item.length - 1);
	var oPrinterTemplateModel =oPrinterTemplateTable.getModel();

	oTemplateID=oPrinterTemplateModel.getProperty("/Rowset/Row/"+index+"/TEMPLATE_ID");
	ScreenType=oPrinterTemplateModel.getProperty("/Rowset/Row/"+index+"/SCREEN_TYPE");
	LabelType=oPrinterTemplateModel.getProperty("/Rowset/Row/"+index+"/LABEL_TYPE");
	
},
doPressEdit : function(evt)
{
	var DateNow=new Date();
	var context=evt.getSource().getBindingContext().toString();

	var oPrinterTemplateTable= this.getView().byId("PrinterTemplateTable");
	var index1=context.substr(12,13);
	var oPrinterTemplateModel =oPrinterTemplateTable.getModel();

	var TemplateID=oPrinterTemplateModel.getProperty("/Rowset/Row/"+index1+"/TEMPLATE_ID");
	
	var oEditTemplateModel= new sap.ui.model.xml.XMLModel();
	oEditTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetTemplateContent&Param.1="+TemplateID+"&d="+DateNow+"&Content-Type=text/xml"),"",false);
	var oTemplateContent=oEditTemplateModel.getProperty("/Rowset/Row/GlobalTemplatePath");
	var oFlag=oEditTemplateModel.getProperty("/Rowset/Row/Flag");

	//alert(window.atob(oTemplateContent.replace(/\s/g, '')));
	dOrderNotxtFld = new sap.m.TextArea('Input1',{rows:23,cols:50});
	dOrderNotxtFld.setValue(window.atob(oTemplateContent.replace(/\s/g, '')));	

	if(oFlag==1)
	{
		dOrderNotxtFld.setEditable(false);
	}
	else
	{
		dOrderNotxtFld.setEditable(false);
	}	
	var oOrdrDetLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout( {
					labelSpanL: 2,
					labelSpanM: 1,
					labelSpanS: 1,
					emptySpanL: 0,
					emptySpanM: 0,
					emptySpanS: 0,
					columnsL: 1,
					columnsM: 1,
					
				});

				var oOrderFormLabels = new sap.ui.layout.form.Form({
							          layout: oOrdrDetLayoutLabels,
							          formContainers: [

										new sap.ui.layout.form.FormContainer({
													formElements: [
																															new sap.ui.layout.form.FormElement({
																	fields:[dOrderNotxtFld]									
											})]})

				
				]}); 

oDialog1 = new sap.m.Dialog({
			title:getPropertyValue(oResourceModel, "Print_Edit_Template"),
			content: [oOrderFormLabels],
			buttons: [
					/*new sap.m.Button({
					   id:'SaveID',
					   text: getPropertyValue(oResourceModel, "Print_Save"),
					   press: oControllerIMR.SaveDialogFn}),
				*/

					
					new sap.m.Button({
					id:'CloseID',
					text: getPropertyValue(oResourceModel, "Print_Close"),
					press: function () {
						oDialog1.close();
						oDialog1.destroy();
					}})
				],
					
				});
	
				oDialog1.setContentWidth("1620px");
				oDialog1.setContentHeight("600px");
		oDialog1.open();	
	if(oFlag==1)
	{
		sap.ui.getCore().byId("SaveID").setVisible(false);
	}
	else
	{
		sap.ui.getCore().byId("SaveID").setVisible(false);
	}	
},		
SaveDialogFn : function (event)
{
	
/*	var TemplateContent=dOrderNotxtFld.getValue();
	
	var oEditTemplateModel= new sap.ui.model.xml.XMLModel();
	oEditTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_UpdateTemplate_PrinterTemplate&Param.1="+TemplateContent+"&Param.2="+oTemplateID+"&Content-Type=text/xml"),"",false);
	oDialog1.close();
	oDialog1.destroy();
*/
},
doDelete: function (evt)
{
	var RefreshDate = new Date();
	var oTemplateTable=this.getView().byId("PrinterTemplateTable");
	var PrinterTemplateItems = this.getView().byId("PrinterTemplateItems");
	var selectedIndex =oTemplateTable.indexOfItem(oTemplateTable.getSelectedItem());
	
	if(selectedIndex == -1)
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg13"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));	
	
  	}
	else
	{
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.confirm(getPropertyValue(oResourceModel, "PrintMsg_Msg15"),fnCallbackConfirm, getPropertyValue(oResourceModel, "Print_Question"));
		function fnCallbackConfirm(bResult)
		{
			if(bResult==true)
			{
				var oEditTemplateModel= new sap.ui.model.xml.XMLModel();
				oEditTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_Delete_PrinterTemplate&Param.1="+oTemplateID+"&Param.2="+ScreenType+"&Param.3="+LabelType+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);
		
				if(oEditTemplateModel.getProperty("/FatalError") != "")
				{
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg29"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));
				}
				else
				{
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg30"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "Print_Message"));

					var oDisplayPrinterTemplateModel =new sap.ui.model.xml.XMLModel();
                                                             oDisplayPrinterTemplateModel.setSizeLimit(10000);
					oDisplayPrinterTemplateModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetButtonText_PrinterTemplate&Param.1="+machine1+"&d="+RefreshDate+"&Content-Type=text/xml", "", false);
					oTemplateTable.setModel(oDisplayPrinterTemplateModel);
					oTemplateTable.bindItems("/Rowset/Row",PrinterTemplateItems);  	
				}
			}
		}
	}
},
goBack : function()
{
 	//window.top.close();
	var app = sap.ui.getCore().byId("idapp");
	app.back("PrinterConfig","show");

}

});

