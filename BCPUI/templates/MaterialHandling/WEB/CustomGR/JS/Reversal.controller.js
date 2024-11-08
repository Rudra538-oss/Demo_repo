var oResourceModel,oBCPStatusModel;
var userLanguage,oControllerThis;
var typeFromURL,nodeFromURL,plantFromURL;
var orderFromURL,matFromURL,desFromURL;
var mvt_type_declare,mvt_type_reverse;
var ord,hu,oSSCCTable;
var selectssccModel,oSelectedContext;
var sscc,oDialog;
var loginID,workstation;
var fname,lname;
var client,whNo,mvtType;
var storageLoc, sLoc_whNo_source;
var batchDetails,info,qty1;
var clientFromURL,target,produced;
var resFromURL,rc,day1;
var pDateFromURL,dateNow;
var expiryDate,batchNo,postDate,prodDate,qty,uom,docID;
var headerFromURL,prod,suFromURL;
var prodDate;
var bcpElement;
var changeMat,chgMat, parcentProd;
var getUOM;
var InternalUOM,GRTitle;
var selectBatchModel;
var EPorder=0;
var AssignedPO;
var storageType="";
var storageBin="";
var NonBatchManagedFlag,BKTXT_USNAMEStatus,oGRPalletInfoModel;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.Reversal",{



onInit : function(){


		jQuery.sap.require("sap.ui.commons.MessageBox");
		oControllerThis = this;
		var DateNw = new Date();
		jQuery.sap.require("sap.ui.core.format.DateFormat"); 
		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");

		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
		
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details= "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGR_GR_23,EPO_AlreadyAssigned,NPM_COMMON_Message,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GR_1,CustomGR_GRR_6,CustomGR_GRR_8,CustomGR_PO_8,CustomGR_GR_12,CustomGR_alert_11,CustomGR_alert_9,NPDashboard_Cancel,CustomGR_alert_12,TransferDisplay_Message,CustomGR_alert_4,CustomGR_alert_1,CustomGR_alert_10,CustomGR_alert_3,CustomGR_alert_8,NPDashboard_Error,CustomGR_alert_26,BCP_COMMON_MSG_QUANTITY, CustomGR_alert_27,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
		 oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "GRReverse"); */
		
                         GRTitle= getPropertyValue(oResourceModel, "CustomGR_GR_23");                                              
                      
		var page = this.getView().byId("pageID");
		var identifier = "GRReverse1>NPDashboard_Back,GRReverse2>InBndMatRecpt_title_BCP,GRReverse3>CustomGR_GRR_1,GRReverse4>CustomGR_GRR_2,GRReverse5>CustomGR_GRR_3,GRReverse6>CustomGR_GRR_4,GRReverse7>CustomGR_GRR_5,GRReverse8>CustomGR_GRR_6,GRReverse9>CustomGR_GRR_7,GRReverse10>CustomGR_GRR_8,GRReverse11>CustomGR_GRR_9,GRReverse12>CustomGR_GRR_11,GRReverse13>CustomGR_GRR_12,GRReverse14>CustomGR_GR_18,GRReverse15>CustomGR_GRR_15,GRReverse16>CustomGR_GRR_13,GRReverse17>CustomGR_GR_22,GMReport21>GMReport_ECCGoodsMvmt";
		localize(page, identifier,userLanguage);
		fname=document.getElementById("firstname").value;
		lname=document.getElementById("lastname").value;
		
		loginID=document.getElementById("login").value;
		workstation=document.getElementById("machine").value;
		clientFromURL=getURLParameter("clientFromURL");
		plantFromURL=getURLParameter("plantFromURL");	
		
		orderFromURL=getURLParameter("orderFromURL");
		matFromURL=getURLParameter("matFromURL");
		desFromURL=decodeURIComponent(getURLParameter("desFromURL"));
		typeFromURL=getURLParameter("typeFromURL");
		nodeFromURL=getURLParameter("nodeFromURL");
		resFromURL=decodeURIComponent(getURLParameter("resFromURL"));
                          document.title=GRTitle+"-"+resFromURL;
		pDateFromURL=getURLParameter("pDateFromURL");
		headerFromURL=getURLParameter("headerFromURL");
		suFromURL=getURLParameter("suFromURL");
		day1=getURLParameter("day1");
		
		hu=getURLParameter("suFromURL");
		mvtType = typeFromURL=="BYPRODUCT" ? "532":"102" ;
		
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		this.getView().byId("Material").setValue(matFromURL);
		this.getView().byId("MatDes").setValue(desFromURL);
		 this.getView().byId("resDes").setValue(resFromURL);
		this.getView().byId("PostDate").setDateValue(DateNw);

		ord=orderFromURL;
		var processOrder=getPO(ord);
		ord=processOrder[0];
		
		EPorder=processOrder[1];
		
/* 	*****GR Pallet Info Field to have no value***************
		
 ///////////////////////////////////////////////////////////////////////////GR Pallet Info Field///////////////////////////////////////////////////////////////////////////////////////////////	
		oGRPalletInfoModel = new sap.ui.model.xml.XMLModel();
		oGRPalletInfoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=0&Param.2=GR_PALLETINFOFIELD&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
	            BKTXT_USNAMEStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/BKTXT_USNAME");
		if(BKTXT_USNAMEStatus == 1) {
			this.getView().byId("info").setEnabled(false);
			this.getView().byId("info").setValue(loginID.toUpperCase());
		} 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  */
		/////////////////////////////////////////////////////////////////////////// ReasonCode //////////////////////////////////////////////////////////////////////
		/* var rc="REASONCODE";
		var rcModel= new sap.ui.model.xml.XMLModel();
		rcModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+rc+"&Param.5="+clientFromURL+"&Param.6="+plantFromURL+"&Param.11="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectRC = this.getView().byId("stopCode");
		var rcitemline= new sap.ui.core.ListItem();
		rcitemline.bindProperty("text", "Value");
		rcitemline.bindProperty("key", "Key");
		selectRC.bindItems("/Rowset/Row", rcitemline);
		selectRC.setModel(rcModel); */
		
		mvt_type_declare= typeFromURL=="BYPRODUCT" ? "531" : "101"; 
		mvt_type_reverse= typeFromURL=="BYPRODUCT" ? "532" : "102"; 
		var oTargetModel= new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+EPorder+"&Param.5="+matFromURL+"&Param.6="+mvt_type_declare+"&Param.7="+mvt_type_reverse+"&Param.8="+hu+"&Param.9="+typeFromURL+"&Param.10="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		target = oTargetModel.getProperty("/Rowset/Row/Target");	
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");

		var formattedTarget = formatQuantity(target, "FORMAT");
		this.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
	
		var formattedProduced = formatQuantity(produced, "FORMAT");
		this.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
		////////////////////////////added for progress indicator Userstory 109434/////////////////////////////////
		parcentProd= (produced/target)*100;
		parcentProd= parcentProd<100?parcentProd:100;
		this.getView().byId("pi").setPercentValue(parcentProd);
		this.getView().byId("pi").setDisplayValue(formattedProduced+ " of "+formattedTarget + " " + producedUOM);
		if(parcentProd<100){
		  this.getView().byId("pi").setState("Success");
		} else{
		  this.getView().byId("pi").setState("Error");
		}///////////END///////
		
		////////////////Nonbatch managed Query call////////////////////////////////

		var nonBatchManagedModel = new sap.ui.model.xml.XMLModel();
		nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		NonBatchManagedFlag = nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');


		if(hu=="X")
		{
		this.getView().byId("ssccID").setEnabled(true);
		this.getView().byId("ssccID").setValueHelpOnly(true);
		selectssccModel= new sap.ui.model.xml.XMLModel();
		selectssccModel.setSizeLimit(10000);
		selectssccModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetSSCCDetails_Reversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		}

		else{
		this.getView().byId("ssccLabel").setVisible(false);
		this.getView().byId("ssccID").setVisible(false);
		this.getView().byId("batchNo").setEnabled(true);
		this.getView().byId("quant").setEnabled(true);
		this.getView().byId("uom").setEnabled(false);

		selectBatchModel= new sap.ui.model.xml.XMLModel();
                       selectBatchModel.setSizeLimit(10000);
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetBatch_GRReversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&Param.5="+userLanguage+"&Param.6="+clientFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectBatch = this.getView().byId("batchNo");
		var batchitemline= new sap.ui.core.ListItem();
		batchitemline.bindProperty("text", "Value");
		batchitemline.bindProperty("key", "Key");
		selectBatch.bindItems("/Rowset/Row", batchitemline);
		selectBatch.setModel(selectBatchModel);
		if (NonBatchManagedFlag == "X") {
		this.getView().byId("batchNo").setEnabled(true);
		}
		else{
		this.getView().byId("batchNo").setEnabled(false);
		if($(selectBatchModel.getData()).find("Rowset").children().size() >2)
		{
		this.getBatch();
		}
		}
		}


		///////////////////////////////////////////////////////Change Material/////////////////////////////////////////////

		var changeMaterialModel= new sap.ui.model.xml.XMLModel();
		changeMaterialModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetChangeMaterial&Param.1="+ord+"&Param.2="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		 changeMat = this.getView().byId("changeMatID");
		var changeMatline= new sap.ui.core.ListItem();
		changeMatline.bindProperty("text", "Value");
		changeMatline.bindProperty("key", "Key");
		changeMat.bindItems("/Rowset/Row", changeMatline);
		changeMat.setModel(changeMaterialModel);
		chgMat=changeMaterialModel.getProperty('/Rowset/Row/Key');
		// this.getView().byId("changeMatID").setValue(matFromURL);
		var xmlDoc = changeMaterialModel.getXML();
		var i =0;
		
 		$(xmlDoc).find("Row").each(function() { 
		var justMat=$(this).find("Value").text().split("-")[0] ;
		if(justMat == matFromURL){
			changeMat.setSelectedKey($(this).find("Key").text());
		}
				
		});
		
		// this.getView().byId("reworkID").setVisible(false);
		var whModel= new sap.ui.model.xml.XMLModel();
		whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1="+matFromURL+"&Param.2="+plantFromURL+"&Param.3="+clientFromURL+"&Param.4="+ord+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		whNo=whModel.getProperty('/Rowset/Row/WHNumber');
		
		////////////////////////////////////////////////SLOC//////////////////////////////////////////////////////////////
		var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
		ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
		storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");

		////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
		var ogetSource= new sap.ui.model.xml.XMLModel();
		ogetSource.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		sLoc_whNo_source = ogetSource.getProperty("/Rowset/Row/source");
		if (sLoc_whNo_source=="EWM" && typeFromURL=="HEADER"){
		  changeMat.setEnabled(false);
		  this.getView().byId("btnECCGMId").setVisible(false);
		} else{
		  changeMat.setEnabled(true);
		  this.getView().byId("btnECCGMId").setVisible(true);
		}


/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);
		
},

/////////////////////////////////////////////////////////////////////////// BATCH DROPDOWN //////////////////////////////////////////////////////////////////////

getBatch : function(){
var DateNw = new Date();
if (NonBatchManagedFlag == "X") {
batchDetails=this.getView().byId("batchNo").getSelectedKey();
batchNo=this.getView().byId("batchNo").getSelectedItem().getText();
}
else
{
batchDetails=selectBatchModel.getProperty('/Rowset/Row/1/Key');
batchNo=selectBatchModel.getProperty('/Rowset/Row/1/Value');

}

var a = batchDetails.split("---")[2];
expiryDate=a.split(" ")[0];
// alert(expiryDate);
qty1=batchDetails.split("---")[0];
qty1=(Math.round(qty1*1000)/1000).toFixed(3);
//alert(qty1);
qty1= formatQuantity(qty1, "FORMAT");
uom=batchDetails.split("---")[1];
InternalUOM=batchDetails.split("---")[1];
docID=batchDetails.split("---")[3];
prodDate=batchDetails.split("---")[4];
commUOM=batchDetails.split("---")[5];
//alert(uom);
sscc="";
this.getView().byId("quant").setValue(qty1);
this.getView().byId("uom").setValue(commUOM);
postDate=this.getView().byId("PostDate").getValue();
 //alert(commUOM);



},

onAfterRendering : function(){
/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg,sessionExpTitle);

/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
setInterval(function(){
oBCPStats = getBCPStatus(bcpElement,"","");
},30000);	

var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
this.getView().byId("shell3").getUser().setUsername(username);
},

/////////////////////////////////////////////////////////////////////////// STORAGE UNIT //////////////////////////////////////////////////////////////////////

getsscc : function(){

var DateNw = new Date();
	
	      oSSCCTable = new sap.m.Table( {
	      select: sap.ui.controller("JS.Reversal").okDialogFn,  
	      headerDesign : sap.m.ListHeaderDesign.Standard,
	      mode: sap.m.ListMode.SingleSelectMaster
	     
	    }); 
	
	    var col3 = new sap.m.Column({header: new sap.m.Label({text: getPropertyValue(oResourceModel, "CustomGR_GRR_6")}), width: "12rem"});  
	    oSSCCTable.addColumn(col3); 

	    var col4 = new sap.m.Column({header: new sap.m.Label({text: getPropertyValue(oResourceModel, "CustomGR_GRR_8")}) });
	    oSSCCTable.addColumn(col4); 

	    var col5 = new sap.m.Column({header: new sap.m.Label({text: getPropertyValue(oResourceModel, "CustomGR_PO_8")}) });
	    oSSCCTable.addColumn(col5);

	    var col6 = new sap.m.Column({header: new sap.m.Label({text: getPropertyValue(oResourceModel, "CustomGR_GR_12")}) });
	    oSSCCTable.addColumn(col6);

var oTemplate = new sap.m.ColumnListItem({
    cells : [
        new sap.m.Text({
            text : "{SSCC}"
        }),

        new sap.m.Text({
            text : "{BATCH}"
        }), 
        new sap.m.Text({
            text : "{QUANTITY}"
        }),
        new sap.m.Text({
            text : "{POSTDATE}"
        })
    ]
});

// selectList = new sap.m.SelectList({selectionChange: sap.ui.controller("JS.ProcessOrder").okDialogFn});
oSSCCTable.bindItems("/Rowset/Row", oTemplate);  
oSSCCTable.setModel(selectssccModel);
var searchSSCC = new sap.m.SearchField({placeholder: getPropertyValue(oResourceModel, "CustomGR_alert_11"), liveChange: function(oEvent){
var sQuery = oEvent.getSource().getValue();
    							var binding = oSSCCTable.getBinding("items");
 
    							var filters = [
        							new sap.ui.model.Filter("SSCC", sap.ui.model.FilterOperator.Contains, sQuery)
   
    								];
    							var oFilter = new sap.ui.model.Filter({
        										aFilters: filters,
        										_bMultiFilter: true
    								      }); 	
 
    							binding.filter(oFilter);

							}
					});

oDialog = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "CustomGR_alert_9"),
			content: [searchSSCC,oSSCCTable],
			buttons: [

					new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
					press: function () {
						oDialog.close();
					}})
				],
					
				});
	
		oDialog.setContentWidth("720px");
		oDialog.setContentHeight("300px");
		oDialog.open();


		
},

okDialogFn : function(event)
{		
		var DateNw = new Date();
		oSelectedContext = oSSCCTable.getSelectedContexts();
		var contextLen = oSelectedContext.length;
		if(contextLen == 0){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_12"));
		}
		else{
		for(var i = 0; i< contextLen; i++){
		sscc= selectssccModel.getProperty(oSelectedContext[i]+"/SSCC");
		}
		
		oDialog.destroy();
		oControllerThis.getView().byId("ssccID").setValue(sscc);
		}

		
		//var ssccDetailModel= new sap.ui.model.xml.XMLModel();
		//ssccDetailModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetDetailsBasedOnSSCC&Param.1="+ord+"&Param.2="+matFromURL+"&Param.3="+sscc+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var getUOM_Model = new sap.ui.model.xml.XMLModel();
		getUOM_Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUOMBasedOnMDO&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+sscc+"&Param.4=" + userLanguage + "&Param.5=" + clientFromURL + "&d="+DateNw+"&Content-Type=text/xml"),"",false);
	
		expiryDate = getUOM_Model.getProperty('/Rowset/Row/ExpiryDate');
		batchNo = getUOM_Model.getProperty('/Rowset/Row/BatchSCCC');
		prodDate = getUOM_Model.getProperty('/Rowset/Row/ProductionDate');
		qty1 = getUOM_Model.getProperty('/Rowset/Row/Quantity');
		commUOM = getUOM_Model.getProperty('/Rowset/Row/UOM');
		docID = getUOM_Model.getProperty('/Rowset/Row/Doc_No');
		InternalUOM = getUOM_Model.getProperty('/Rowset/Row/InternalUOM');
		//alert(uom + internalUOM);
		qty1=Math.round(qty1*1000)/1000;
		oControllerThis.getView().byId("quant").setValue(qty1);
		oControllerThis.getView().byId("uom").setValue(commUOM);
		oControllerThis.getView().byId("batchNo").setValue(batchNo);
		postDate=oControllerThis.getView().byId("PostDate").getValue();
		expiryDate=expiryDate.split(" ")[0];
		// alert(prodDate);
				//alert(uom);
		
		
},

doReverse : function(){
	var DateNw = new Date();
 if (EPorder.indexOf("E_") == "0") {
       
        var EPOrdModel = new sap.ui.model.xml.XMLModel();
        EPOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/MDO_GetSourcePO&Param.1=" + EPorder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
       AssignedPO = EPOrdModel.getProperty('/Rowset/Row/AssignedPO');
	  
    }
	
		if((AssignedPO != "---")  && EPorder.indexOf("E") != "-1")
		{
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel,"EPO_AlreadyAssigned"));
	}else{
	qty=this.getView().byId("quant").getValue();
	qty= formatQuantity(qty, "PARSE");
	if((sscc=="" || sscc=="undefined" || sscc==null) && suFromURL=="X"){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_9"));
	}
	else if(whNo=="---" || whNo=="" || whNo=="-"){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_26"));
	}
	else if(qty<=0 || qty==""){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"));
	}
	else if(isNaN(qty)){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"));
	}
	else if(postDate>dateTod){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_1"));
	}
	else if(Number(qty)>Number(qty1)){
	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_10"));
	}
	/*
	else if(posting_date<pDateFromURL){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_3"));
	}
	*/
	else{
			var DateNw = new Date();
			/* var shlfYear = parseInt(expiryDate.split('/')[2]);
			var shlfMonth = parseInt(expiryDate.split('/')[0]);
			var shlfDate = parseInt(expiryDate.split('/')[1]); 
					
		 	var shelflife_date = shlfYear+"-"+('0'+shlfMonth).slice(-2)+"-"+('0'+shlfDate).slice(-2)+"T00:00:00Z"; */
			var shelflife_date=expiryDate;
			postDate=oControllerThis.getView().byId("PostDate").getValue();
	 
	 				
					info=this.getView().byId("info").getValue();
					
		var DateNw = new Date();
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		dateNow = dateFormat.format(new Date(DateNw));	
		var dateTod=dateFormat.format(new Date(DateNw));	
		dateNow=dateNow+"T00:00:00Z";
		var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "'T'HH:mm:ss'Z'"}); 
		var timeNow = timeFormat.format(new Date(DateNw));	
		    var posting_date=postDate+timeNow;
			
		if(batchNo=="---" || batchNo=="null")	
		{
		batchNo="";
		}
		if(shelflife_date=="TimeUnavailable" || shelflife_date=="")
		{
		shelflife_date="0000-00-00T00:00:00Z";
		}
		
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>"+
    			"<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><client>"+clientFromURL+"</client><plant>"+plantFromURL+"</plant>"+
  			"<nodeID>"+nodeFromURL+"</nodeID><orderNumber>"+ord+"</orderNumber><EPorder>" + EPorder + "</EPorder><warehouseNumber>"+whNo+"</warehouseNumber>"+
 			"<userId>"+loginID+"</userId> <goodsMovementItems><client>"+clientFromURL+"</client><goodsMovementItem><postingDate>"+posting_date+"</postingDate>"+
			"<productionDate>"+prodDate+"</productionDate><huNumber>"+sscc+"</huNumber><materialNumber>"+matFromURL+"</materialNumber> "+
			"<quantityInReportUom>"+qty+"</quantityInReportUom> <reportUom>"+InternalUOM+"</reportUom><type>"+typeFromURL+"</type><storagetype>"+storageType+"</storagetype><storagebin>"+storageBin+"</storagebin><batchNumber>"+batchNo+"</batchNumber><info>"+info+"</info>"+
           			"<movementType>"+mvtType+"</movementType><shelfLifeDate>"+shelflife_date+"</shelfLifeDate><documentNumber>"+docID+"</documentNumber><documentYear/> <postingID/>"+
			"<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><I_MIIEWMFlag>" + sLoc_whNo_source + "</I_MIIEWMFlag><client>"+clientFromURL+"</client><goodsMovementPostingMessage>"+
			"<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>"+
			"</IOReportGoodsMovementDetails>";
            
	//  alert(InputXMLInStringFormat);   		

		var RevModel= new sap.ui.model.xml.XMLModel();
		RevModel.attachRequestSent(function()
	{
		sap.ui.core.BusyIndicator.show(1);
	});  
		RevModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GoodsReceiptDeclarationReversal&Param.1="+InputXMLInStringFormat+"&d="+DateNw+"&Content-Type=text/xml"),"",true);
		 RevModel.attachRequestCompleted(function()
								{
									sap.ui.core.BusyIndicator.hide();
		var status=RevModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/status');
		
		if(status=="S")		
		{
		sap.m.MessageBox.success(getPropertyValue(oResourceModel, "CustomGR_alert_8")+" " +RevModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber'));
		
		var oTargetModel= new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+EPorder+"&Param.5="+matFromURL+"&Param.6="+mvt_type_declare+"&Param.7="+mvt_type_reverse+"&Param.8="+hu+"&Param.9="+typeFromURL+"&Param.10="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		
		target = oTargetModel.getProperty("/Rowset/Row/Target");	
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");

		var formattedTarget = formatQuantity(target, "FORMAT");
		oControllerThis.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
		var formattedProduced = formatQuantity(produced, "FORMAT");
		oControllerThis.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
		////////////////////////////added for progress indicator Userstory 109434/////////////////////////////////
		parcentProd= (produced/target)*100;
		parcentProd= parcentProd<100?parcentProd:100;
		oControllerThis.getView().byId("pi").setPercentValue(parcentProd);
		oControllerThis.getView().byId("pi").setDisplayValue(formattedProduced+ " of "+formattedTarget + " " + producedUOM);
		if(parcentProd<100){
		  oControllerThis.getView().byId("pi").setState("Success");
		} else{
		  oControllerThis.getView().byId("pi").setState("Error");
		}///////////END///////
		if(hu=="X"){
		
		oControllerThis.getView().byId("ssccID").setEnabled(true);
		selectssccModel= new sap.ui.model.xml.XMLModel();
                        selectssccModel.setSizeLimit(10000);
		selectssccModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetSSCCDetails_Reversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		}
		else{
		var selectBatchModel= new sap.ui.model.xml.XMLModel();
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetBatch_GRReversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&Param.5="+userLanguage+"&Param.6="+clientFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectBatch = oControllerThis.getView().byId("batchNo");
		var batchitemline= new sap.ui.core.ListItem();
		batchitemline.bindProperty("text", "Value");
		batchitemline.bindProperty("key", "Key");
		selectBatch.bindItems("/Rowset/Row", batchitemline);
		selectBatch.setModel(selectBatchModel);
		}

		oControllerThis.getView().byId("ssccID").setValue("");
		oControllerThis.getView().byId("quant").setValue("");
		oControllerThis.getView().byId("info").setValue("");
		}
		else{
		oControllerThis.getView().byId("info").setValue("");
		sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Error")+ RevModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'));
		}

		oControllerThis.getView().byId("ssccID").setValue("");
		oControllerThis.getView().byId("quant").setValue("");
		//oControllerThis.getView().byId("info").setValue("");
		oControllerThis.getView().byId("batchNo").setValue("");
		/////////////////////////////////////////////////////////////////////////////Goods Receipt Pallet Info field/////////////////////////////////////////////////////////////////////////////////////////////////////////
                 /*      if(BKTXT_USNAMEStatus == 1) {
			oControllerThis.getView().byId("info").setEnabled(false);
			oControllerThis.getView().byId("info").setValue(loginID.toUpperCase());
		} else{
                       oControllerThis.getView().byId("info").setValue("");
                        }									*/
		///////////////////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		});
		
		

}


		}

},
doGR : function(){
var spl=headerFromURL.split("*");
		a=spl[0];
		b=spl[1];

window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GoodReceipt.irpt?orderFromURL="+orderFromURL+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&matFromURL="+matFromURL+"&desFromURL="+encodeURIComponent(desFromURL)+"&day1="+day1+"&typeFromURL="+typeFromURL+"&pDateFromURL="+pDateFromURL+"&nodeFromURL="+nodeFromURL+"&resFromURL="+encodeURIComponent(resFromURL)+"&suFromURL="+suFromURL),"_self");
},
goHome : function(){
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/ProcessOrder.irpt?nodeFromURL="+nodeFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");
},

doReport : function(){
var flag=2;
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GMReport.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&headerFromURL="+headerFromURL+"&resFromURL="+encodeURIComponent(resFromURL)+"&plantFromURL="+plantFromURL+"&matFromURL="+matFromURL+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(desFromURL)+"&typeFromURL="+typeFromURL+"&nodeFromURL="+nodeFromURL+"&suFromURL="+suFromURL+"&flag="+flag),"_self");
},

changeMaterial : function(){
		chgMat=this.getView().byId("changeMatID").getSelectedKey();
		var DateNw= new Date();
		typeFromURL=chgMat.split("---")[0];
		suFromURL=chgMat.split("---")[2];
		desFromURL=chgMat.split("---")[3];
		matFromURL=chgMat.split("---")[1];
		
		mvtType = typeFromURL=="BYPRODUCT" ? "532":"102" ;
		hu=suFromURL;
		
		mvt_type_declare= typeFromURL=="BYPRODUCT" ? "531" : "101"; 
		mvt_type_reverse= typeFromURL=="BYPRODUCT" ? "532" : "102"; 
		var oTargetModel= new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+EPorder+"&Param.5="+matFromURL+"&Param.6="+mvt_type_declare+"&Param.7="+mvt_type_reverse+"&Param.8="+hu+"&Param.9="+typeFromURL+"&Param.10="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		target = oTargetModel.getProperty("/Rowset/Row/Target");	
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");

		var formattedTarget = formatQuantity(target, "FORMAT");
		this.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
	
		var formattedProduced = formatQuantity(produced, "FORMAT");
		this.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
		////////////////////////////added for progress indicator Userstory 109434/////////////////////////////////
		parcentProd= (produced/target)*100;
		parcentProd= parcentProd<100?parcentProd:100;
		this.getView().byId("pi").setPercentValue(parcentProd);
		this.getView().byId("pi").setDisplayValue(formattedProduced+ " of "+formattedTarget + " " + producedUOM);
		if(parcentProd<100){
		  this.getView().byId("pi").setState("Success");
		} else{
		  this.getView().byId("pi").setState("Error");
		}///////////END///////

		this.getView().byId("Material").setValue(matFromURL);
		this.getView().byId("MatDes").setValue(desFromURL);

		//////////////////////////////////////SU or Non SU////////////////////////////////////////////////
		if(hu=="X")
		{
		this.getView().byId("ssccLabel").setVisible(true);
		this.getView().byId("ssccID").setVisible(true);
		this.getView().byId("ssccID").setEnabled(true);
		this.getView().byId("ssccID").setValueHelpOnly(true);
		selectssccModel= new sap.ui.model.xml.XMLModel();
                        selectssccModel.setSizeLimit(10000);
		selectssccModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetSSCCDetails_Reversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		}

		else{
		this.getView().byId("ssccLabel").setVisible(false);
		this.getView().byId("ssccID").setVisible(false);
		this.getView().byId("batchNo").setEnabled(true);
		this.getView().byId("quant").setEnabled(true);
		this.getView().byId("uom").setEnabled(true);

		var selectBatchModel= new sap.ui.model.xml.XMLModel();
                        selectBatchModel.setSizeLimit(10000);
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetBatch_GRReversal&Param.1="+EPorder+"&Param.2="+matFromURL+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&Param.5="+userLanguage+"&Param.6="+clientFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectBatch = this.getView().byId("batchNo");
		var batchitemline= new sap.ui.core.ListItem();
		batchitemline.bindProperty("text", "Value");
		batchitemline.bindProperty("key", "Key");
		selectBatch.bindItems("/Rowset/Row", batchitemline);
		selectBatch.setModel(selectBatchModel);
		}
		
		////////////////////////////////////////////////WarehouseNo//////////////////////////////////////////////////////////////
		var whModel= new sap.ui.model.xml.XMLModel();
		whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1="+matFromURL+"&Param.2="+plantFromURL+"&Param.3="+clientFromURL+"&Param.4="+ord+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		whNo=whModel.getProperty('/Rowset/Row/WHNumber');
		
}
,
goToECCGM: function(){

	var refresh = new Date();
	var oECCURLModel= new sap.ui.model.xml.XMLModel();
	oECCURLModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});

	oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1="+orderFromURL+"&Param.2=GR&cache="+refresh+"&Content-Type=text/xml"),"",true);

	oECCURLModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
		window.open(oURL);
	});
}

/*
quantInput : function(event) { 
		
		var quantityValue=this.getView().byId("quant").getValue();
		if(quantityValue != ""){
		var quantity= formatQuantity(quantityValue, "PARSE");

		if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_27"));
			this.getView().byId("quant").setValue(""); 
		}
			this.getView().byId("quant").setEnabled(true); 
		}
}*/
});