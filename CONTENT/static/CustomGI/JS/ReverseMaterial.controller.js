var oResourceModel,oBCPStatusModel;
var userLanguage,oControllerThis;
var huFromURL,nodeFromURL;
var orderFromURL,matFromURL,desFromURL;
var ord,plantFromURL,mvtType,mvt_type_reverse;
var oSelectedContext,oDisplayTable;
var fname,lname,uom;
var dateNow,client,reportUom;
var res,resFromURL,huFromURL;
var clientFromURL,target,produced;
var selectedKey,oDialog1;
var su,wh,sLoc,postDate;
var mat,matDes;
var batchList,batch;
var stock,sCat,sled;
var stockFromURL,shelfFromURL;
var datenow,mvt_type,headerFromURL;
var uomFromURL,batchFromURL,conFromURL,reqFromURL
var reqUOMFromURL, conUOMFromURL,percentQuant,CRUom ;
var requiredQuant,consumedStock;
var consumedQuant=0;
var a,b,pDateFromURL;
var diffDays,day1,slocFromURL;
var sTypeFromURL,sBinFromURL;
var oDialog,sled1,StockQty;
var unit,GITitle;
var RSPOSFromURL,stockFromURL1;
var NonBatchManagedFlag;
var AltUom;
var POrder;
var AssignedPO;
var nonsuBatchFlag=0;
jQuery.sap.require("sap.m.MessageBox");


sap.ui.controller("JS.ReverseMaterial",{

onInit : function(){


		// client="103";
		var batch_sled;
		mvt_type="262";
		oControllerThis = this;
		jQuery.sap.require("sap.ui.commons.MessageBox");
		jQuery.sap.require("sap.ui.core.format.DateFormat"); 
		var DateNw = new Date();
		
		sFlag="0";

		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");
		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
		
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details="NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPM_COMMON_Message,EPO_AlreadyAssigned,CustomGI_GI_23,BCP_COMMON_MSG_QUANTITY,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Goods_Issue,CustomGI_alert_13,CustomGI_GIR_13,CustomGI_alert_1,CustomGR_alert_4,CustomGI_alert_2,CustomGR_alert_1,CustomGR_alert_3,CustomGI_alert_4,NPDashboard_Ok,NPDashboard_Error,TransferDisplay_Message,CustomGR_alert_26,CustomGR_alert_27,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "GIReverse"); */
		//document.title=getPropertyValue(oResourceModel, "NPDashboard_Goods_Issue");
		var page = this.getView().byId("pageID");
		var identifier = "Reversal1>NPDashboard_Back,Reversal2>InBndMatRecpt_title_BCP,Reversal3>CustomGI_GIR_1,ReversalGIList24>NPDashboard_Line,Revesal20>GMReport_ECCGoodsMvmt,Revesal21>CustomGI_CL_12,Reversal4>CustomGR_GRR_2,Reversal5>CustomGI_GIR_3,Reversal6>CustomGI_GIR_4,Reversal7>CustomGI_GIR_5,Reversal8>CustomGI_GIR_6,Reversal9>CustomGI_GIR_7,Reversal10>CustomGI_GIR_8,Reversal11>CustomGI_GIR_9,Reversal12>CustomGI_GIR_10,Reversal13>CustomGI_GIR_11,Reversal14>CustomGI_GIR_12";
		localize(page, identifier,userLanguage);
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		 datenow = dateFormat.format(new Date(DateNw));	
		clientFromURL=getURLParameter("clientFromURL");
		plantFromURL=getURLParameter("plantFromURL");
		resFromURL=decodeURIComponent(getURLParameter("resFromURL"));
                           GITitle=getPropertyValue(oResourceModel, "CustomGI_GI_23"); 
                       document.title=GITitle+"-"+resFromURL;
		orderFromURL=getURLParameter("orderFromURL");
		matFromURL=getURLParameter("matFromURL");
		desFromURL=decodeURIComponent(getURLParameter("desFromURL"));
		nodeFromURL=decodeURIComponent(getURLParameter("nodeFromURL"));
		huFromURL=decodeURIComponent(getURLParameter("huFromURL"));
		whFromURL=getURLParameter("whFromURL");
		headerFromURL=decodeURIComponent(getURLParameter("headerFromURL"));
		pDateFromURL=getURLParameter("pDateFromURL");
		sTypeFromURL=getURLParameter("sTypeFromURL");
		sBinFromURL=getURLParameter("sBinFromURL");
		day1=getURLParameter("day1");
		conFromURL=getURLParameter("conFromURL");
		reqFromURL=getURLParameter("reqFromURL");
		reqUOMFromURL=getURLParameter("reqUOMFromURL");
		conUOMFromURL=getURLParameter("conUOMFromURL");
		
		 var batchRev=getURLParameter("batchFromURL");
		//console.log("batchRev"+batchRev);
		//unit=conFromURL.split(" ")[1];
		ord=orderFromURL;
		RSPOSFromURL=getURLParameter("RSPOSFromURL");
		
		var processOrder=getPO(ord);
		ord=processOrder[0];
		
		POrder=processOrder[1];
		
		nonBatchManagedModel= new sap.ui.model.xml.XMLModel();
		nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1="+plantFromURL+"&Param.2="+clientFromURL+"&Param.3="+matFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		NonBatchManagedFlag=nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');
		
		var prodUomModel= new sap.ui.model.xml.XMLModel();
		prodUomModel.setSizeLimit(10000);
		prodUomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1="+clientFromURL+"&Param.2="+matFromURL+"&Param.3="+userLanguage+"&Param.4=GI&Param.5="+RSPOSFromURL+"&Param.6="+ord+"&Content-Type=text/xml"),"",false);
		var prodUom = this.getView().byId("uom");
		var prodUomitemline= new sap.ui.core.ListItem();
		prodUomitemline.bindProperty("text", "UOMDESC");
		prodUomitemline.bindProperty("key", "UOM");
		prodUom.bindItems("/Rowset/Row", prodUomitemline);
		prodUom.setModel(prodUomModel);

		 CRUom=prodUomModel.getProperty("/Rowset/Row/0/UOM");
                      

		
		if(huFromURL!=""){

		this.getView().byId("batchNo").setVisible(true);
		this.getView().byId("sscc").setVisible(true);
		this.getView().byId("ssccLabel").setVisible(true);
		// stockFromURL=getURLParameter("stockFromURL");
		
		shelfFromURL=getURLParameter("shelfFromURL");
		// alert(shelfFromURL);
		uomFromURL=getURLParameter("uomFromURL");
		batchFromURL=getURLParameter("batchFromURL");
		
		// this.getView().byId("stock").setValue(stockFromURL);
		var batchDetail= new sap.ui.model.xml.XMLModel();	
		batchDetail.setSizeLimit(10000);	
		
		batchDetail.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+POrder+"&Param.5="+matFromURL+"&Param.6="+batchFromURL+"&Param.7="+huFromURL+"&Param.8="+RSPOSFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		// sled = batchDetail.getProperty("/Rowset/Row/SLED");
		stockFromURL=batchDetail.getProperty("/Rowset/Row/QTY_IN_REPORT_UOM");
		stockFromURL=(Math.round(stockFromURL*1000)/1000).toFixed(3);
		//stockFromURL=Math.round(stockFromURL*1000)/1000;
		//alert(reportUom);
                        reportUom=batchDetail.getProperty("/Rowset/Row/UOM");
		consumedStock=stockFromURL;
		consumedQuant = formatQuantity(stockFromURL, "FORMAT");
		var consumedUOM = getURLParameter("conUOMFromURL");
		this.getView().byId("conQuant").setValue(consumedQuant+" "+consumedUOM);
		
		
		
		batch=getURLParameter("batchFromURL");
		batch_sled=batch+" "+oControllerThis.getDateDisplayFormat(shelfFromURL);
		sled1=shelfFromURL+"T00:00:00Z";
		
		if(batch=="" || batch=="null" || batch=="---")
		{
		this.getView().byId("batchNo").setValue("");
		}
		else
		{
		this.getView().byId("batchNo").setValue(batch_sled);
		}
		this.getView().byId("sscc").setValue(decodeURIComponent(getURLParameter("huFromURL")));
		var date1 = new Date(shelfFromURL);
		var date2 = new Date(datenow);
		var date3 = date1.toString(); 
		
		var showSled = date3.split(" ")[1]+" "+date3.split(" ")[2]+","+date3.split(" ")[3];
		if(shelfFromURL=="TimeUnavai" && NonBatchManagedFlag!="X"){
			shelfFromURL="";
		}
		this.getView().byId("shelfID").setValue(shelfFromURL);
		var timeDiff = (date1.getTime() - date2.getTime());
		diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		 // alert(uomFromURL); 
	/*********************************************VSTS 87516******************************************************/
		
			if(NonBatchManagedFlag=="X"){

			if(diffDays<0){
				this.getView().byId("shelfDays").setValue(getPropertyValue(oResourceModel, "CustomGI_alert_13"));
			}
			else{
				this.getView().byId("shelfDays").setValue(diffDays+" "+getPropertyValue(oResourceModel, "CustomGI_GIR_13"));
			}}
			else{

				this.getView().byId("shelfDays").setValue("");
				this.getView().byId("shelfID").setValue("");
                                                
			}
	/*********************************************END******************************************************/		
		sled=shelfFromURL;
		// alert(sled);
		var uom1 = this.getView().byId("uom");
		//uom1.setSelectedKey(uomFromURL);
		}
		else{
		this.getView().byId("batchCombo").setVisible(true);	

		slocFromURL=getURLParameter("slocFromURL");
		batchList= new sap.ui.model.xml.XMLModel();		
		batchList.setSizeLimit(10000);	
		
		batchList.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+POrder+"&Param.5="+matFromURL+"&Param.6=&Param.7="+huFromURL+"&Param.8="+RSPOSFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var selectBatch = this.getView().byId("batchCombo");
		// selectBatch.setModel(batchList);
		var batcitemline= new sap.ui.core.ListItem();
		// batcitemline.bindProperty("text", "BATCH_SLED");
		// batcitemline.bindProperty("key", "BATCH_NO");
		// selectBatch.bindItems("/Rowset/Row", batcitemline);
		selectBatch.setModel(batchList);
		
		var uomModel= new sap.ui.model.xml.XMLModel();
		uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetMaterialDetailsByOrderMat&Param.1="+ord+"&Param.2="+matFromURL+"&Param.3=" + RSPOSFromURL + "&cache="+DateNw+"&Content-Type=text/xml"),"",false);
		var uom = this.getView().byId("uom");
		var uom1=uomModel.getProperty('/Rowset/Row/MEINS');
                        uomFromURL=uom1;
		//uom.setSelectedKey(uom1);
		if(NonBatchManagedFlag!="X")
		 {
                       
		 this.getBatch();
		 }
		}
		
		fname=document.getElementById("firstname").value;
		lname=document.getElementById("lastname").value;
		
		loginID=document.getElementById("login").value;
		workstation=document.getElementById("machine").value;
		this.getView().byId("PostDate").setDateValue(DateNw);
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		this.getView().byId("Material").setValue(matFromURL);
		this.getView().byId("MatDes").setValue(desFromURL);
		 this.getView().byId("resDes").setValue(resFromURL);
		
		// this.getView().byId("conQuant").setValue(getURLParameter("conFromURL"));

		requiredQuant =formatQuantity(getURLParameter("reqFromURL"), "FORMAT");
		var requiredUOM =getURLParameter("reqUOMFromURL");
		
		this.getView().byId("reqQuant").setValue(requiredQuant+" "+requiredUOM);
		percentQuant= (consumedStock/reqFromURL)*100;
		this.getView().byId("pInd").setPercentValue(percentQuant);
		this.getView().byId("pInd").setDisplayValue(consumedQuant+ " of "+requiredQuant + " " + requiredUOM);
		
       		 if(percentQuant>100){
			this.getView().byId("pInd").setPercentValue(100);
			this.getView().byId("pInd").setState("Error");
			
       		 }
		
		
		// alert(datenow);
		
	/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("shelfID").setDisplayFormat(oDisplayFormat);
		this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);	
		
		

		
},

combineBatchSled : function (BATCH_NO,SLED){
// alert("hi");
//console.log("BAtch No:"+BATCH_NO+":::::SLED:"+SLED);
var combined_batch = BATCH_NO+" " + oControllerThis.getDateDisplayFormat(SLED);

 return combined_batch;

},

getBatch : function(){
		huFromURL="";
		var DateNw = new Date();
		//console.log("BATCH"+batch);
		var batchID=this.getView().byId("batchCombo");
		batchID.getSelectedKey();
 		batch=batchID.getSelectedKey();
		//console.log("BATCH"+batch);
		
		
		var batchDetail= new sap.ui.model.xml.XMLModel();		
                        batchDetail.setSizeLimit(10000);
		//console.log("3");
		batchDetail.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1="+clientFromURL+"&Param.2="+plantFromURL+"&Param.3="+nodeFromURL+"&Param.4="+POrder+"&Param.5="+matFromURL+"&Param.6="+batch+"&Param.7="+huFromURL+"&Param.8="+RSPOSFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		sled = batchDetail.getProperty("/Rowset/Row/SLED");
		//console.log(sled);
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		var exp = dateFormat.format(new Date(sled));	
		this.getView().byId("shelfID").setValue(exp);
		stockFromURL=batchDetail.getProperty("/Rowset/Row/QTY_IN_REPORT_UOM");
		stockFromURL=(Math.round(stockFromURL*1000)/1000).toFixed(3);
		//stockFromURL=Math.round(stockFromURL*1000)/1000;
		//stockFromURL=stockFromURL.toFixed(3);
                      
                        uomFromURL=batchDetail.getProperty("/Rowset/Row/UOM"); 					
                        this.getUom();
		sled1=sled+"Z";
		consumedStock=stockFromURL;
		
		
		consumedQuant = formatQuantity(stockFromURL, "FORMAT");
		var consumedUOM = getURLParameter("conUOMFromURL");
		
		this.getView().byId("conQuant").setValue(consumedQuant+" "+consumedUOM);
		percentQuant= (consumedStock/reqFromURL)*100;
		this.getView().byId("pInd").setPercentValue(percentQuant);
		this.getView().byId("pInd").setDisplayValue(consumedQuant+ " of "+requiredQuant + " " + consumedUOM);
		
       		 if(percentQuant>100){
			this.getView().byId("pInd").setPercentValue(100);
			this.getView().byId("pInd").setState("Error");
			
       		 }
		if(NonBatchManagedFlag=="X")
		 {
		
		var date1 = new Date(sled1);
		var date2 = new Date(datenow);
		var date3 = date1.toString();
		var showSled = date3.split(" ")[1]+" "+date3.split(" ")[2]+","+date3.split(" ")[3];	
		
		var timeDiff = (date1.getTime() - date2.getTime());
		diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			if(diffDays<0){
				this.getView().byId("shelfDays").setValue(getPropertyValue(oResourceModel, "CustomGI_alert_13"));
				}
			else{
				this.getView().byId("shelfDays").setValue(diffDays+" "+getPropertyValue(oResourceModel, "CustomGI_GIR_13"));
				}
		}
		else
		{
	
		batchID.setEnabled(false);
                        this.getView().byId("batchCombo").setVisible(false);	
		this.getView().byId("shelfDays").setValue("");
		this.getView().byId("shelfID").setValue("");
		batch=batchList.getProperty("/Rowset/Row/batchNumber");

		}
		
		
		
		
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 stockFromURL1= formatQuantity(stockFromURL,"PARSE");

 if(huFromURL!="" && stockFromURL1!=""  && reportUom!=""){
  
                       var StockQty1= new sap.ui.model.xml.XMLModel();
                       StockQty1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1="+clientFromURL+"&Param.2="+matFromURL+"&Param.3="+stockFromURL1+"&Param.4="+userLanguage+"&Param.5="+reportUom+"&Param.6="+CRUom+"&Content-Type=text/xml"),"",false);
                       var ConvertedQty1=StockQty1.getProperty("/Rowset/Row/O_ConvertedQuantity");
                       var oErrorMessage1=StockQty1.getProperty("/Rowset/Row/O_ErrorMessage");
                        var oType1=StockQty1.getProperty("/Rowset/Row/O_Type");
		ConvertedQty1 = formatQuantity(ConvertedQty1,"FORMAT");				

                         if(oType1=="E")
                                    {
			//sap.m.MessageBox.error(oErrorMessage1); 
			sap.m.MessageBox.error(oErrorMessage1,{title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
			this.getView().byId("stock").setValue("");	
                                    }
                          else
                                    {
                                
                                   this.getView().byId("stock").setValue(ConvertedQty1);	       
	                        } 
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
},

doReverse : function(){

		var DateNw = new Date();
		if (POrder.indexOf("E_") == "0") {
       
        var EPOrdModel = new sap.ui.model.xml.XMLModel();
        EPOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/MDO_GetSourcePO&Param.1=" + POrder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
       AssignedPO = EPOrdModel.getProperty('/Rowset/Row/AssignedPO');
	   
    }
	
		if((AssignedPO != "---")  && POrder.indexOf("E") != "-1")
		{
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "EPO_AlreadyAssigned"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		//sap.m.MessageBox.show(getPropertyValue(oResourceModel,"EPO_AlreadyAssigned"),sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
	}else{
		var tomorrow = new Date(DateNw.getTime() + (1000 * 60 * 60 * 24));
		// alert(tomorrow);
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		dateNow = dateFormat.format(new Date(tomorrow));	
		dateNow=dateNow+"T00:00:00Z";
		
		/* var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
		sled1 = dateFormat.format(new Date(sled));	
		sled1=sled1+"T00:00:00Z"; */
		
		var uom=this.getView().byId("uom").getSelectedKey();
		var qty=this.getView().byId("stock").getValue();
		qty= formatQuantity(qty, "PARSE");
		
		nonBatchManagedModel= new sap.ui.model.xml.XMLModel();
		nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1="+plantFromURL+"&Param.2="+clientFromURL+"&Param.3="+matFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		NonBatchManagedFlag=nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');

		postDate=this.getView().byId("PostDate").getValue();	
		var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "'T'HH:mm:ss'Z'"}); 
		var timeNow = timeFormat.format(new Date(DateNw));	
		postDate=postDate+timeNow;
		
		if(huFromURL=="" && (batch=="" || batch==undefined) && NonBatchManagedFlag=="X"){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGI_alert_1"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		//sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		
		else if(qty <=0 || qty==""){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		//sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		
		else if(isNaN(qty)){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		//sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		
		else if(postDate>dateNow)
		{
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_1"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		//sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		
		/* else if(postDate<pDateFromURL){
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_3"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		} */
		
		else{
			if(batch=="null"||batch=="---"){
				batch="";
			}
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>"+
	     "<client>"+clientFromURL+"</client><plant>"+plantFromURL+"</plant><nodeID>"+nodeFromURL+"</nodeID><orderNumber>"+ord+"</orderNumber><EPorder>" + POrder + "</EPorder><RSPOS>"+RSPOSFromURL+"</RSPOS><warehouseNumber>"+whFromURL+"</warehouseNumber><userId>"+loginID+"</userId>"+ 
	    "<goodsMovementItems><client>"+clientFromURL+"</client><goodsMovementItem><postingDate>"+postDate+"</postingDate><huNumber>"+huFromURL+"</huNumber><materialNumber>"+matFromURL+"</materialNumber>"+ 
            "<quantityInReportUom>"+qty+"</quantityInReportUom><availableStock>"+stockFromURL+"</availableStock><reportUom>"+uom+"</reportUom><reservationNumber></reservationNumber><recordType/><psaNumber/>"+ 
            "<reservationItemNumber></reservationItemNumber><batchNumber>"+batch+"</batchNumber><movementType>"+mvt_type+"</movementType><shelfLifeDate>"+sled1+"</shelfLifeDate>"+
	    "<storageType>"+sTypeFromURL+"</storageType><storageBin>"+sBinFromURL+"</storageBin><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>"+ 
           "<goodsMovementPostingMessages><client>"+clientFromURL+"</client><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>"+
             "</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>" ;
	
		// alert(InputXMLInStringFormat);
		var GIModel= new sap.ui.model.xml.XMLModel();
		GIModel.attachRequestSent(function()
	{
		sap.ui.core.BusyIndicator.show(1);
	});  
		GIModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1="+InputXMLInStringFormat+"&Content-Type=text/xml"),"",true);
		GIModel.attachRequestCompleted(function()
								{
									sap.ui.core.BusyIndicator.hide();
		var status=GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/status');
		
					if(status=="S")		
		{
		var mes=GIModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber');
		
		oDialog = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "TransferDisplay_Message"),
			id: 'successdialog',
			icon: 'sap-icon://message-success',
			draggable: true,
			content: [new sap.m.Text({ text: getPropertyValue(oResourceModel, "CustomGI_alert_4")+" "+mes})],
			buttons: [

					new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
					press: oControllerThis.okDialogFn
					})
				],
					
				});
	
		oDialog.setContentWidth("250px");
		oDialog.setContentHeight("80px");
		oDialog.open();


		// sap.ui.commons.MessageBox.alert(oResourceModel.getProperty("CustomGI_alert_4")+ GIModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber'),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		
		oControllerThis.getView().byId("batchNo").setValue("");
		oControllerThis.getView().byId("batchCombo").setValue("");
		oControllerThis.getView().byId("stock").setValue("");
		oControllerThis.getView().byId("shelfID").setValue("");
		oControllerThis.getView().byId("PostDate").setDateValue(DateNw);		
		// window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&pDateFromURL="+pDateFromURL+"&headerFromURL="+headerFromURL+"&nodeFromURL="+nodeFromURL+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");
		}
		else{
		sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Error")+" "+GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'),{title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")});
		//sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPDashboard_Error")+" "+GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}

		
		
		}); 

}
}
},

okDialogFn : function(event)
{		
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&pDateFromURL="+pDateFromURL+"&headerFromURL="+encodeURIComponent(headerFromURL)+"&nodeFromURL="+encodeURIComponent(nodeFromURL)+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");
		
},

doGI : function(){
	var DateNw = new Date();
if(huFromURL!=""){
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>"+huFromURL+"</huNumber><orderNumber>"+ord+"</orderNumber><materialNumber>"+matFromURL+"</materialNumber><warehouseNumber>"+whFromURL+"</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>"+plantFromURL+"</plant><client>"+clientFromURL+"</client><RSPOS>"+RSPOSFromURL+"</RSPOS><language>"+userLanguage+"</language></PackageDetailsInput>" 
// alert(InputXMLInStringFormat);
var materialList= new sap.ui.model.xml.XMLModel();		
materialList.setSizeLimit(10000);	
materialList.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1="+InputXMLInStringFormat+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
var status=materialList.getProperty('/packageMessages/packageMessage/status');

// alert(status);
if(status=="E"){
var message=materialList.getProperty('/packageMessages/packageMessage/message');
//sap.ui.commons.MessageBox.alert(message);
sap.m.MessageBox.error(message,{title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
}
else
{
var stock=materialList.getProperty('/packageItems/packageItem/stock');

 window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ConsumeMaterial.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&matFromURL="+matFromURL+"&pDateFromURL="+pDateFromURL+"&headerFromURL="+encodeURIComponent(headerFromURL)+"&desFromURL="+encodeURIComponent(desFromURL)+"&huFromURL="+encodeURIComponent(huFromURL)+"&nodeFromURL="+encodeURIComponent(nodeFromURL)+"&sTypeFromURL="+sTypeFromURL+"&sBinFromURL="+sBinFromURL+"&resFromURL="+decodeURIComponent(resFromURL)+"&whFromURL="+whFromURL+"&reqFromURL="+reqFromURL+"&reqUOMFromURL="+reqUOMFromURL+"&conFromURL="+conFromURL+"&conUOMFromURL="+conUOMFromURL+"&batchFromURL="+batchFromURL+"&shelfFromURL="+shelfFromURL+"&stockFromURL="+stock+"&uomFromURL="+uomFromURL+"&RSPOSFromURL="+RSPOSFromURL),"_self");
}
}
else{

window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ConsumeMaterial.irpt?orderFromURL="+orderFromURL+"&matFromURL="+matFromURL+"&day1="+day1+"&pDateFromURL="+pDateFromURL+"&headerFromURL="+headerFromURL+"&desFromURL="+encodeURIComponent(desFromURL)+"&huFromURL="+encodeURIComponent(huFromURL)+"&nodeFromURL="+encodeURIComponent(nodeFromURL)+"&resFromURL="+encodeURIComponent(resFromURL)+"&reqFromURL="+reqFromURL+"&reqUOMFromURL="+reqUOMFromURL+"&conFromURL="+conFromURL+"&conUOMFromURL="+conUOMFromURL+"&whFromURL="+whFromURL+"&clientFromURL="+clientFromURL+"&sTypeFromURL="+sTypeFromURL+"&slocFromURL="+slocFromURL+"&sBinFromURL="+sBinFromURL+"&plantFromURL="+plantFromURL+"&RSPOSFromURL="+RSPOSFromURL),"_self");

}
},
goHome : function(){
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL="+orderFromURL+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&pDateFromURL="+pDateFromURL+"&headerFromURL="+encodeURIComponent(headerFromURL)+"&nodeFromURL="+encodeURIComponent(nodeFromURL)+"&resFromURL="+encodeURIComponent(resFromURL)),"_self");
},
getDateDisplayFormat: function(date){

	if(date === "0000-00-00"){
		return date;
	}else{
		return formatDate(date,"yyyy-MM-dd");
	}
},
 getUom : function(){
	
                      AltUom=this.getView().byId("uom").getSelectedKey();
						if(AltUom=="" || AltUom=="---")
						{
						AltUom=CRUom;
						}
                      stockFromURL1= formatQuantity(stockFromURL,"PARSE");
	         if(stockFromURL1!=""  && uomFromURL!=""){
                        var StockQty= new sap.ui.model.xml.XMLModel();
                       StockQty.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1="+clientFromURL+"&Param.2="+matFromURL+"&Param.3="+stockFromURL1+"&Param.4="+userLanguage+"&Param.5="+uomFromURL+"&Param.6="+AltUom+"&Content-Type=text/xml"),"",false);
                       var ConvertedQty=StockQty.getProperty("/Rowset/Row/O_ConvertedQuantity");
                       var oErrorMessage=StockQty.getProperty("/Rowset/Row/O_ErrorMessage");
                        var oType=StockQty.getProperty("/Rowset/Row/O_Type");
		ConvertedQty = formatQuantity(ConvertedQty,"FORMAT");				

                         if(oType=="E")
                                    {
                                    jQuery.sap.require("sap.m.MessageBox");
			//sap.m.MessageBox.error(oErrorMessage);
			sap.m.MessageBox.error(oErrorMessage,{title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
			this.getView().byId("stock").setValue("");	
                                    }
                          else
                                    {
                                
                                   this.getView().byId("stock").setValue(ConvertedQty);	       
	                        } 

}
}  ,

doReport: function () {

		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/GIReport.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
	},

goToECCGM: function () {

		var refresh = new Date();
		var oECCURLModel = new sap.ui.model.xml.XMLModel();
		oECCURLModel.attachRequestSent(function () {
			sap.ui.core.BusyIndicator.show(1);
		});

		oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1=" + orderFromURL + "&Param.2=GI&cache=" + refresh + "&Content-Type=text/xml"), "", true);

		oECCURLModel.attachRequestCompleted(function () {
			sap.ui.core.BusyIndicator.hide();
			var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
			window.open(oURL);
		});
	}

/*onLiveChange:function(oEvent){
		var quantityValue=this.getView().byId("stock").getValue();
		if(quantityValue != ""){
			var quantity= formatQuantity(quantityValue, "PARSE");

			if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
			
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_27"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
			this.getView().byId("stock").setValue(""); 
		}
		this.getView().byId("stock").setEnabled(true); 
		}
 } */

});