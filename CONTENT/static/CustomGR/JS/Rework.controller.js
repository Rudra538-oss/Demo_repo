var oResourceModel,oBCPStatusModel;
var userLanguage,oControllerThis;
var typeFromURL,nodeFromURL;
var orderFromURL,matFromURL,desFromURL;
var ord,plantFromURL,mvtType,mvt_type_reverse;
var batch,qty;
var prod,sled;
var sBin,loginID;
var post,su;
var flag,sFlag;
var prod,prod_type;
var expiryDate,expiryDate1;
var storageBin;
var strBin,oBCPStats;
var postDate, prodDate;
var loginID,workstation;
var client,whNo;
var postDate,info;
var fname,lname,oDialog;
var dateNow,selectList;
var res,resFromURL,suFromURL;
var clientFromURL,target,produced;
var des,matNo,selectedKey,selectedItem;
var pDateFromURL,day1,headerFromURL;
var selectBatchModel,selectList,selectedItem;
var LEQuant,LEUoM;
var dateTod,postToday;
var batchFlag;
var print,PrintDesc,copies;
var bcpElement,GRTitle;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.Rework",{


onInit : function(){

		jQuery.sap.require("sap.ui.commons.MessageBox");
		batchFlag="0";
		
		
		oControllerThis = this;
		var DateNw = new Date();
		sFlag="0";
		jQuery.sap.require("sap.ui.core.format.DateFormat"); 
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");

		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
		
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details= "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGR_GR_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GR_1,CustomGR_alert_20,CustomGI_CM_4,NPDashboard_Cancel,CustomGR_alert_21,TransferDisplay_Message,CustomGR_alert_22,CustomGR_alert_17,CustomGR_alert_4,CustomGR_alert_16,CustomGR_alert_1,CustomGR_alert_2,CustomGR_alert_18,CustomGR_alert_23,CustomGR_alert_3,CustomGR_alert_5,CustomGR_alert_6,CustomGR_alert_24,CustomGI_alert_1,ECCLabel_alert6,CustomGR_alert_7,NPDashboard_Error,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,CustomGR_alert_25,BCP_COMMON_MSG_QUANTITY";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "GRReverse"); */
		//document.title=getPropertyValue(oResourceModel, "CustomGR_GR_1"); 
                       
		var page = this.getView().byId("pageID");
		var identifier = "Rework1>NPDashboard_Back,Rework2>InBndMatRecpt_title_BCP,Rework3>CustomGR_GRR_16,Rework4>CustomGR_GRR_2,Rework5>CustomGR_GRR_3,Rework6>CustomGR_GRR_4,Rework7>CustomGR_GRR_5,Rework8>CustomGR_GRR_21,Rework9>CustomGR_GRR_7,Rework10>CustomGR_GRR_8,Rework11>CustomGR_GRR_20,Rework12>CustomGR_GRR_19,Rework13>CustomGR_GRR_18,Rework14>CustomGR_GRR_9,Rework15>CustomGR_GRR_11,Rework16>CustomGR_GR_15,Rework17>CustomGR_GR_16,Rework18>CustomGR_GRR_14,Rework19>CustomGR_GRR_12,Rework20>CustomGR_GRR_13";
		localize(page, identifier,userLanguage);
		this.getView().byId("PostDate").setDateValue(DateNw);
		this.getView().byId("ProdDate").setDateValue(DateNw);
		clientFromURL=getURLParameter("clientFromURL");
		plantFromURL=getURLParameter("plantFromURL");
		resFromURL=decodeURIComponent(getURLParameter("resFromURL"));
                         GRTitle=getPropertyValue(oResourceModel, "CustomGR_GR_23"); 
                        document.title=GRTitle+"-"+resFromURL;
		orderFromURL=getURLParameter("orderFromURL");
		matFromURL=getURLParameter("matFromURL");
		desFromURL=decodeURIComponent(getURLParameter("desFromURL"));
		typeFromURL=getURLParameter("typeFromURL");
		nodeFromURL=getURLParameter("nodeFromURL");
		suFromURL=getURLParameter("suFromURL");
		pDateFromURL=getURLParameter("pDateFromURL");
		headerFromURL=getURLParameter("headerFromURL");
		day1=getURLParameter("day1");		
		ord=orderFromURL;
		
		var ordLength = ord.length;
		for(var p=0; p<(12-ordLength); p++){
			ord = "0"+ord;
		}
		
		mvtType=typeFromURL=="BYPRODUCT" ? "531":"101" ;
		mvt_type_reverse= typeFromURL=="BYPRODUCT" ? "532" : "102"; 
		fname=document.getElementById("firstname").value;
		lname=document.getElementById("lastname").value;
		des=desFromURL;
		matNo=matFromURL;
		loginID=document.getElementById("login").value;
		workstation=document.getElementById("machine").value;
		this.getView().byId("Target").setValue(target);
		this.getView().byId("Produced").setValue(produced);
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		this.getView().byId("Material").setValue(matNo);
		this.getView().byId("MatDes").setValue(des);
		 this.getView().byId("resDes").setValue(resFromURL);

		//////////////////////////////////////////////////// PRINTER ////////////////////////////////////////////////////////////////////////////////////////////
		if(suFromURL=="X" && oBCPStats!="1")
		{
		this.getView().byId("copies").setVisible(true);
		this.getView().byId("printerID").setVisible(true);
		this.getView().byId("copyLabel").setVisible(true);
		this.getView().byId("printerLabel").setVisible(true);
		var oExisPrinterModel= new sap.ui.model.xml.XMLModel();
		oExisPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1="+nodeFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		 PrintDesc = this.getView().byId("printerID");
		var oPrintDescline= new sap.ui.core.ListItem();
		oPrintDescline.bindProperty("text", "VALUE");
		oPrintDescline.bindProperty("key", "KEY");
		PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
		PrintDesc.setModel(oExisPrinterModel);
		print=oExisPrinterModel.getProperty('/Rowset/Row/KEY');
		copies=print.split("---")[2];
		this.getView().byId("copies").setValue(copies);
		}
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var whModel= new sap.ui.model.xml.XMLModel();
                        whModel.setSizeLimit(10000);
		whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=GR&Param.11="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		whNo=whModel.getProperty('/Rowset/Row/Value');
			

		var oTargetModel= new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+ord+"&Param.5="+matNo+"&Param.6="+mvtType+"&Param.7="+mvt_type_reverse+"&Param.8="+suFromURL+"&Param.9="+typeFromURL+"&Param.10="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		target = oTargetModel.getProperty("/Rowset/Row/Target");	
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");


		var formattedTarget = formatQuantity(target, "FORMAT");
		this.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
	
		var formattedProduced = formatQuantity(produced, "FORMAT");
		this.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);

		 var prodUomModel= new sap.ui.model.xml.XMLModel();
		prodUomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1="+clientFromURL+"&Param.2="+matNo+"&Param.3="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var prodUom = this.getView().byId("uom");
		var prodUomitemline= new sap.ui.core.ListItem();
		prodUomitemline.bindProperty("text", "UOMDESC");
		prodUomitemline.bindProperty("key", "UOM");
		prodUom.bindItems("/Rowset/Row", prodUomitemline);
		prodUom.setModel(prodUomModel); 

		var LEModel= new sap.ui.model.xml.XMLModel();
		var uomModel= new sap.ui.model.xml.XMLModel();
		LEModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetLEUOMGR&Param.1="+plantFromURL+"&Param.2="+clientFromURL+"&Param.3="+matNo+"&Param.4="+userLanguage+ "&Param.5=" + ord +"&Param.6=" + typeFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var uom = this.getView().byId("uom");
		LEUoM=LEModel.getProperty('/Rowset/Row/UOM');
		LEQuant=LEModel.getProperty('/Rowset/Row/QUANTITY');
		if(LEQuant=="" || LEQuant=="---"){
			
		uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetUnitAreaForCo_ByProd&Param.1="+ord+"&Param.2="+matNo+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var uom = this.getView().byId("uom");
		var uom1=uomModel.getProperty('/Rowset/Row/MEINS');
		uom.setSelectedKey(uom1);
		}
		else{
		var quantity1 = formatQuantity(LEQuant, "FORMAT");
		this.getView().byId("quant").setValue(quantity1);
		this.getView().byId("uom").setSelectedKey(LEUoM); 
		}
		
		var bat="BATCHES";
		selectBatchModel= new sap.ui.model.xml.XMLModel();
                        selectBatchModel.setSizeLimit(10000);
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+bat+"&Param.5="+clientFromURL+"&Param.6="+plantFromURL+"&Param.7="+nodeFromURL+"&Param.8="+ord+"&Param.9="+matNo+"&Param.10="+mvtType+"&Param.11="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectBatch = this.getView().byId("batchNo");		
		var batc=selectBatchModel.getProperty('/Rowset/Row/Value');
		selectBatch.setValue(batc);
		var sledModel= new sap.ui.model.xml.XMLModel();		
		sledModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+ord+"&Param.5="+matNo+"&Param.6="+mvtType+"&Param.7="+batc+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var sled = oControllerThis.getView().byId("sledDate");
		var expiryDate1 = sledModel.getProperty('/Rowset/Row/SLED');
		var pDate=sledModel.getProperty('/Rowset/Row/PRODUCTION_DATE');
		if(expiryDate1 != ""){
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		expiryDate = dateFormat1.format(new Date(expiryDate1));	
		
		sled.setValue(expiryDate);
		}
		//var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		//pDate = dateFormat1.format(new Date(pDate));	
		oControllerThis.getView().byId("ProdDate").setValue(pDate);
		oControllerThis.getView().byId("sledDate").setEnabled(false);
		oControllerThis.getView().byId("ProdDate").setEnabled(false);

/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("ProdDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("sledDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);
		
		
},
onAfterRendering : function(){
/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg,sessionExpTitle);

/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
var PrinterIDRefresh=this.getView().byId("printerID");
var PrinterlabelRefresh=this.getView().byId("printerLabel");
var CopiesRefresh=this.getView().byId("copies");
var CopyLabelRefresh=this.getView().byId("copyLabel");
setInterval(function(){
oBCPStats = getBCPStatus(bcpElement,"","");
//alert(this.getView().byId("printerID"));
if(oBCPStats==1)
{

PrinterIDRefresh.setVisible(false);		
PrinterlabelRefresh.setVisible(false);
CopiesRefresh.setVisible(false);		
CopyLabelRefresh.setVisible(false);

}
else if(suFromURL=="X" && oBCPStats!=1 )
{

PrinterIDRefresh.setVisible(true);		
PrinterlabelRefresh.setVisible(true);
CopiesRefresh.setVisible(true);		
CopyLabelRefresh.setVisible(true);

}
},30000);

var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
this.getView().byId("shell3").getUser().setUsername(username);
},

getPrinter : function() {
print=this.getView().byId("printerID").getSelectedKey();
		// alert(print);
		copies=print.split("---")[2];
		this.getView().byId("copies").setValue(copies);
},

handlePostingDateChange : function(){
var DateNw = new Date();
var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
dateNow = dateFormat.format(new Date(DateNw));	

},

getBatch : function(){

		 var DateNw = new Date();
	

		selectList = new sap.m.SelectList({selectionChange: sap.ui.controller("JS.Rework").okDialogFn}); 
			var odialogItemline= new sap.ui.core.ListItem();
			odialogItemline.bindProperty("text", "Value");
			odialogItemline.bindProperty("key", "Key");
			selectList.bindItems("/Rowset/Row", odialogItemline);
			selectList.setModel(selectBatchModel);
			// alert(selectList.getModel().getXML());
var searchBatch = new sap.m.SearchField({placeholder: getPropertyValue(oResourceModel, "CustomGR_alert_20"), liveChange: function(oEvent){
var sQuery = oEvent.getSource().getValue();
    							var binding = selectList.getBinding("items");
 
    							var filters = [
        							new sap.ui.model.Filter("Key", sap.ui.model.FilterOperator.Contains, sQuery)
   
    								];
    							var oFilter = new sap.ui.model.Filter({
        										aFilters: filters,
        										_bMultiFilter: true
    								      }); 	
 
    							binding.filter(oFilter);

							}
					});

oDialog = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "CustomGI_CM_4"),
			content: [searchBatch,selectList],
			buttons: [

					new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
					press: function () {
						oDialog.close();
					}})
				],
					
				});
	
		oDialog.setContentWidth("150px");
		oDialog.setContentHeight("300px");
		oDialog.open();


		
},
okDialogFn : function(event)
{		
		var DateNw = new Date();
		batch = selectList.getSelectedItem().getText();
		var sledModel= new sap.ui.model.xml.XMLModel();		
		sledModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+ord+"&Param.5="+matNo+"&Param.6="+mvtType+"&Param.7="+batch+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var sled = oControllerThis.getView().byId("sledDate");
		var expiryDate1 = sledModel.getProperty('/Rowset/Row/SLED');
		var pDate=sledModel.getProperty('/Rowset/Row/PRODUCTION_DATE');
		
		if(expiryDate1 != ""){
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		expiryDate = dateFormat1.format(new Date(expiryDate1));	
		
		sled.setValue(expiryDate);
		
}
		oControllerThis.getView().byId("batchNo").setValue(batch);
		oDialog.destroy();
		//var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		//pDate = dateFormat1.format(new Date(pDate));	
		oControllerThis.getView().byId("ProdDate").setValue(pDate);
		oControllerThis.getView().byId("sledDate").setEnabled(false);
		oControllerThis.getView().byId("ProdDate").setEnabled(false);

/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("ProdDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("sledDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);
		
		
},

checkExistBatch : function(obj){
batchFlag="1";
var DateNw = new Date();
var batch = this.getView().byId("batchNo").getValue();
batch = batch.toUpperCase();
			//alert(batch);
this.getView().byId("batchNo").setValue(batch);

var batchExistModel= new sap.ui.model.xml.XMLModel();		
batchExistModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+ord+"&Param.5="+matNo+"&Param.6="+mvtType+"&Param.7="+batch+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	var noOfRows = $(batchExistModel.getData()).find("Row").size();

if(noOfRows>0)
oControllerThis.getView().byId("ProdDate").setEnabled(false);
else
oControllerThis.getView().byId("ProdDate").setEnabled(true);
oControllerThis.getView().byId("sledDate").setEnabled(true);
},

pressBatch : function()
{
var DateNw = new Date();
var matType="undefined";
if(this.getView().byId("ProdDate").getEnabled() == false){
this.getView().byId("ProdDate").setDateValue(DateNw);
}

prodDate=this.getView().byId("ProdDate").getValue();
var bool=oControllerThis.getView().byId("batchNo").getEnabled();

if(bool=="false"){
var DateNw = new Date();
this.getView().byId("ProdDate").setDateValue(DateNw);
prodDate=this.getView().byId("ProdDate").getValue();
}

var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>"+matNo+"</materialNumber><plant>"+plantFromURL+"</plant><client>"+clientFromURL+"</client><materialType>"+matType+"</materialType><productionDate>"+prodDate+"</productionDate></BatchDetailsInput>" 

		var BatchModel= new sap.ui.model.xml.XMLModel();
		BatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1="+InputXMLInStringFormat+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		
		var BatchNo = this.getView().byId("batchNo");
		var batc=BatchModel.getProperty('/batchNumber');
		BatchNo.setValue(batc);
		var message = BatchModel.getProperty('/message');
		expiryDate = BatchModel.getProperty('/expiryDate');
		
		
		this.getView().byId("sledDate").setValue(expiryDate);
		var status= BatchModel.getProperty('/status');
		if(status="S"){
		sap.m.MessageToast.show(message);
		}
		else{
		alert(message);
		}	
		this.getView().byId("sledDate").setEnabled(true);
		this.getView().byId("ProdDate").setEnabled(true);
		this.getView().byId("batchNo").setEnabled(true);
		batchFlag="1";
},

handleProdDateChange : function(){

var DateNw = new Date();
if(batchFlag=="1"){

batch=this.getView().byId("batchNo").getValue();
var matType="undefined";
prodDate=this.getView().byId("ProdDate").getValue();
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>"+matNo+"</materialNumber><plant>"+plantFromURL+"</plant><client>"+clientFromURL+"</client><materialType>"+matType+"</materialType><productionDate>"+prodDate+"</productionDate></BatchDetailsInput>" 
// alert(InputXMLInStringFormat);
		var BatchModel= new sap.ui.model.xml.XMLModel();
		BatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1="+InputXMLInStringFormat+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		expiryDate = BatchModel.getProperty('/expiryDate');
		this.getView().byId("sledDate").setValue(expiryDate);
		this.getView().byId("sledDate").setEnabled(true);
}

},

doGR : function(){
		var DateNw = new Date();

		if(suFromURL=="X")
		{
		print=this.getView().byId("printerID").getSelectedKey();
		print=print.split("---")[0];
		copies=this.getView().byId("copies").getValue();
		}
		else{
		print="";
		copies="";
		}
		postDate=this.getView().byId("PostDate").getValue();
		prodDate=this.getView().byId("ProdDate").getValue();
		var prodD=prodDate;
		 postToday=postDate;
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		dateNow = dateFormat.format(new Date(DateNw));	
		var refresh=dateFormat.format(new Date(DateNw));	
		dateTod=dateFormat.format(new Date(DateNw));	
		dateNow=dateNow+"T00:00:00Z";
		var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "'T'HH:mm:ss'Z'"}); 
		var timeNow = timeFormat.format(new Date(DateNw));	
		postDate=postDate+timeNow;
		prodDate=prodDate+"T00:00:00Z";
		expiryDate=this.getView().byId("sledDate").getValue();
		// expiryDate = dateFormat.format(new Date(expiryDate));	
 		
		expiryDate=expiryDate+"T00:00:00";
		batch=this.getView().byId("batchNo").getValue();
		var batchLen=batch.length;
		qty=this.getView().byId("quant").getValue();
		qty= formatQuantity(qty, "PARSE");
		//alert(qty);
		info=this.getView().byId("info").getValue();
		uom=this.getView().byId("uom").getSelectedKey();
		var sBinModel= new sap.ui.model.xml.XMLModel();		
		sBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1="+matNo+"&Param.2="+plantFromURL+"&Param.3="+clientFromURL+"&Param.4="+ord+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var sBin = this.getView().byId("sBin");
		 strBin= sBinModel.getProperty('/Rowset/Row/STRG_BIN');
		
		var DateNw = new Date();
		if(postToday==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_21"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(prodD==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_22"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(batch==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_17"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(qty <=0 || qty==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(isNaN(qty)){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if((LEQuant!="" && LEQuant!="---") && Number(qty)>Number(LEQuant) && uom==LEUoM){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_16"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(postToday>refresh)
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(prodDate>dateNow)
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_2"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(prodDate>postDate)
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_18"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(batch==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(prodDate>=expiryDate)
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_23"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		/* else if(postDate<pDateFromURL){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_3"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}  */
		
		else if(uom==""){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_5"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(batchLen>10){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_6"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(suFromURL=="X" && oBCPStats!="1" && print=="")
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_24"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else if(suFromURL=="X" && oBCPStats!="1" && copies=="")
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "ECCLabel_alert6"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else{
		oControllerThis.declare();
		}
},

declare : function(){
			var DateNw = new Date();

			var oBCPStatusModel= new sap.ui.model.xml.XMLModel();
		oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d="+DateNw+"&Content-Type=text/xml"),"",false);
		oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");

var PrinterIDRefresh=this.getView().byId("printerID");
var PrinterlabelRefresh=this.getView().byId("printerLabel");
var CopiesRefresh=this.getView().byId("copies");
var CopyLabelRefresh=this.getView().byId("copyLabel");

var PrintVisible=PrinterIDRefresh.getVisible();
if(suFromURL=="X" && PrintVisible==false && (oBCPStats=="0" || oBCPStats=="2") )
{
var DateNw = new Date();
PrinterIDRefresh.setVisible(true);		
PrinterlabelRefresh.setVisible(true);
CopiesRefresh.setVisible(true);		
CopyLabelRefresh.setVisible(true);

sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_25"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
//jQuery.sap.require("sap.ui.commons.MessageBox");
		//sap.ui.commons.MessageBox.alert(oResourceModel.getResourceBundle().getText("CustomGR_alert_25"),fnCallbackConfirm,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		
}
else
{
	
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>"+
    			"<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><workstation>"+workstation+"</workstation><client>"+clientFromURL+"</client><plant>"+plantFromURL+"</plant>"+
  			"<nodeID>"+nodeFromURL+"</nodeID><orderNumber>"+ord+"</orderNumber><warehouseNumber>"+whNo+"</warehouseNumber>"+
 			"<userId>"+loginID+"</userId> <goodsMovementItems><client>"+clientFromURL+"</client><goodsMovementItem><postingDate>"+postDate+"</postingDate><storagebin>"+strBin+"</storagebin>"+
			"<productionDate>"+prodDate+"</productionDate><huNumber/> <materialNumber>"+matNo+"</materialNumber>"+
			"<quantityInReportUom>"+qty+"</quantityInReportUom> <reportUom>"+uom+"</reportUom><type>"+typeFromURL+"</type><batchNumber>"+batch+"</batchNumber><printerID>"+print+"</printerID><copies>"+copies+"</copies><info>"+info+"</info>"+
           			"<movementType>"+mvtType+"</movementType><shelfLifeDate>"+expiryDate+"</shelfLifeDate><documentNumber/><documentYear/> <postingID/>"+
			"<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><client>"+clientFromURL+"</client><goodsMovementPostingMessage>"+
			"<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>"+
			"</IOReportGoodsMovementDetails>";
            
		 // alert(InputXMLInStringFormat);  
		var GRModel= new sap.ui.model.xml.XMLModel();
		 GRModel.attachRequestSent(function()
	{
		sap.ui.core.BusyIndicator.show(1);
	});  
		GRModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GoodsReceiptDeclarationReversal&Param.1="+InputXMLInStringFormat+"&d="+DateNw+"&Content-Type=text/xml"),"",true);
		
		 GRModel.attachRequestCompleted(function()
								{
									sap.ui.core.BusyIndicator.hide();
		var status=GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/status');
		if(status=="S")		
		{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_7")+ " " +GRModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber'),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		var bat="BATCHES";
		selectBatchModel= new sap.ui.model.xml.XMLModel();
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+bat+"&Param.5="+clientFromURL+"&Param.6="+plantFromURL+"&Param.7="+nodeFromURL+"&Param.8="+ord+"&Param.9="+matNo+"&Param.10="+mvtType+"&Param.11="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		

		var oTargetModel= new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+ord+"&Param.5="+matNo+"&Param.6="+mvtType+"&Param.7="+mvt_type_reverse+"&Param.8="+su+"&Param.9="+typeFromURL+"&Param.10="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml","",false);
		target = oTargetModel.getProperty("/Rowset/Row/Target");	
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");

		var formattedTarget = formatQuantity(target, "FORMAT");
		oControllerThis.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
		var formattedProduced = formatQuantity(produced, "FORMAT");
		oControllerThis.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);

		oControllerThis.getView().byId("sledDate").setEnabled(false);
		oControllerThis.getView().byId("ProdDate").setEnabled(false);
		oControllerThis.getView().byId("batchNo").setEnabled(true);  		
		oControllerThis.getView().byId("info").setValue("");
		}
		
		else{
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPDashboard_Error")+ GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		oControllerThis.getView().byId("sledDate").setEnabled(true);
		oControllerThis.getView().byId("ProdDate").setEnabled(true);
		oControllerThis.getView().byId("batchNo").setEnabled(true);  		
		oControllerThis.getView().byId("info").setValue("");
		batchFlag="1";
		}

		});     

	
					
		
expiryDate="";
batchFlag="0";
oControllerThis.getView().byId("sBin").setValue("");
var DateNw = new Date();

var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
// oControllerThis.getView().byId("PostDate").setDateValue(DateNw);


// oControllerThis.getView().byId("ProdDate").setDateValue(prodDate);
}
},

doReverse : function(){
prod="BYPRODUCT";
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Reversal.irpt?orderFromURL="+orderFromURL+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&day1="+day1+"&matFromURL="+matNo+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+typeFromURL+"&nodeFromURL="+nodeFromURL+"&suFromURL="+suFromURL+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");

},

goHome : function(){
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/ProcessOrder.irpt?nodeFromURL="+nodeFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");
},

validateNoOfPrintCopies: function(){
	var inputValue= this.getView().byId("copies");
	var noOfCopies = inputValue.getValue();

	if(noOfCopies !=""){
		if(noOfCopies>0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))){
		}else{
		inputValue.setValue("");
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
}
},

doReport : function(){
prod="BYPRODUCT";
var flag=3;
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GMReport.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&headerFromURL="+headerFromURL+"&resFromURL="+encodeURIComponent(resFromURL)+"&plantFromURL="+plantFromURL+"&matFromURL="+matNo+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+prod+"&nodeFromURL="+nodeFromURL+"&suFromURL="+suFromURL+"&flag="+flag),"_self");
},

/*quantInput : function(event) { 
		
		var quantityValue=this.getView().byId("quant").getValue();
		if(quantityValue != ""){
		var quantity= formatQuantity(quantityValue, "PARSE");

		if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_27"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
			this.getView().byId("quant").setValue(""); 
		}
			this.getView().byId("quant").setEnabled(true); 
		}
}*/
});