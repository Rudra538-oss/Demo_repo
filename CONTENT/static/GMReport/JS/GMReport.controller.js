var oBCPStatusModel;
var userLanguage;
var oResourceModel;
var plantFromURL,nodeFromURL,clientFromURL;
var bcpElement;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.GMReport",{
onInit : function(){
	oControllerThis = this;
	var refresh = new Date();
	plantFromURL=getURLParameter("plant");
	clientFromURL=getURLParameter("client");
	nodeFromURL=getURLParameter("node");

	bcpElement = this.getView().byId("bcpStatus");	
	oBCPStats = getBCPStatus(bcpElement,"","");
	var oUserDataModel= new sap.ui.model.xml.XMLModel();
	oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&cache="+refresh+"&Content-Type=text/xml","",false);
	userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

	var details= "NPDashboard_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGR_GR_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GR_1,CustomGR_GMReport_20,CustomGR_GMReport_21";
	oResourceModel= new sap.ui.model.xml.XMLModel();
	oResourceModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&cache="+refresh+"&Content-Type=text/xml"),"",false);
	

	var page = this.getView().byId("pageID");
	var identifier = "GMReportTableProcOrd>CustomGR_GR_2,GMReport25>NPM_COMMON_BCP_STATUS,GMReport1>NPDashboard_Back,GMReport2>InBndMatRecpt_title_BCP,GMReport3>CustomGR_GMReport_1,GMReport4>NPDashboard_Line,GMReport5>CustomGR_GR_2,GMReport6>CustomGR_GMReport_2,GMReport7>CustomGR_GMReport_5,GMReport8>GMReport_NoOfDays,GMReport9>CustomGR_GMReport_11,GMReport10>CustomGR_PO_3,GMReport11>CustomGR_GMReport_2,GMReport12>CustomGR_GMReport_16,GMReport13>CustomGR_GMReport_3,GMReport14>CustomGR_GMReport_4,GMReport15>CustomGR_GMReport_5,GMReport16>TransferDisplay_colHeader_batch,GMReport17>CustomGR_GMReport_7,GMReport18>CustomGR_GMReport_8,GMReport19>CustomGR_GMReport_17,GMReport20>CustomGR_GMReport_9,GMReport21>GMReport_ECCGoodsMvmt";
	localize(page, identifier,userLanguage);
	var  properties="ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GMReport_1,GMReport_NoOfDaysValidation";
	oResourceModel = getResourceModel(properties,userLanguage);
	var Error=getPropertyValue(oResourceModel,"ODATA_Error");

	var oLineDropdown = oControllerThis.getView().byId("selLineId");	
	sortinglines(plantFromURL,clientFromURL,userLanguage,oLineDropdown,Error,0);	
	oLineDropdown.setSelectedKey(nodeFromURL);

	var oMvtTypeModel= new sap.ui.model.xml.XMLModel();
	oMvtTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/MDOQ_GetMovementTypes&Param.1="+plantFromURL+"&Param.2="+clientFromURL+"&cache="+refresh+"&Content-Type=text/xml"),"",false);
	var oMvtTypeDropDown = oControllerThis.getView().byId("mvtTypeId");	
	oMvtTypeDropDown.setModel(oMvtTypeModel);

	try{
	   document.title = getPropertyValue(oResourceModel,"CustomGR_GMReport_1") + "-"+oLineDropdown.getSelectedItem().getText();
	}catch(e){
	}
},
onAfterRendering : function(){
	sap.ui.controller("JS.GMReport").populateOrder(plantFromURL,clientFromURL,nodeFromURL,"ALL",3);
	sap.ui.controller("JS.GMReport").populateGMTable(plantFromURL,clientFromURL,nodeFromURL,"ALL","ALL",3,"ALL","ALL","ALL");	

	var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
	var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
	setIdleTime(sessionExpMsg,sessionExpTitle);

	setInterval(function(){
		oBCPStats = getBCPStatus(bcpElement,"","");
	},30000);	

	var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
	this.getView().byId("shell3").getUser().setUsername(username);
},
populateOrder: function(plant,client,node,mvtType,noOfDays){
	var refresh = new Date();
	var oProcessOrdModel= new sap.ui.model.xml.XMLModel();
	oProcessOrdModel.setSizeLimit(100000);
	oProcessOrdModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});
	oProcessOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetPOFromGM&Param.1="+plant+"&Param.2="+client+"&Param.3="+node+"&Param.4="+mvtType+"&Param.5="+noOfDays+"&cache="+refresh+"&Content-Type=text/xml"),"",true);
	var oProcessOrdDropDown = oControllerThis.getView().byId("procOrdId");	
	
	oProcessOrdModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		oProcessOrdDropDown.setModel(oProcessOrdModel);
	});
},
populateGMTable: function(plant,client,node,mvtType,procOrd,noOfDays,material,iSscc,iBatch){
	var refresh = new Date();
	var oGMModel= new sap.ui.model.xml.XMLModel();
	oGMModel.setSizeLimit(100000);
	oGMModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});

	oGMModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetGMReport_AllMvtType&Param.1="+plant+"&Param.2="+client+"&Param.3="+node
			+"&Param.4="+mvtType+"&Param.5="+procOrd+"&Param.6="+noOfDays+"&Param.7="+material+"&Param.8="+iBatch+"&Param.9="+iSscc+"&cache="+refresh+"&Content-Type=text/xml"),"",true);
	oGMTable = oControllerThis.getView().byId("GMTable");	

	oGMModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		oGMTable.setModel(oGMModel);
		var oGMModelXML = oGMModel.getXML();
		var oRowCount = $(oGMModelXML).find('Row').size();
		var oVisibleRowCount = ((oRowCount == 0) || (oRowCount > 16)) ? 16 : oRowCount;
		oGMTable.setVisibleRowCount(oVisibleRowCount);
		
		if(oRowCount > 0){
			oControllerThis.getView().byId("btnExcelReportId").setEnabled(true);
			oControllerThis.getView().byId("searchFieldGMTableId").setEnabled(true);	
		}else{
			oControllerThis.getView().byId("btnExcelReportId").setEnabled(false);
			oControllerThis.getView().byId("searchFieldGMTableId").setEnabled(false);	
		}
	});
},
getGMReport: function(){
	var nodeId = this.getView().byId("selLineId").getSelectedKey();
	this.getView().byId("btnECCGMId").setEnabled(false);
	this.getView().byId("btnExcelReportId").setEnabled(false);
	this.getView().byId("searchFieldGMTableId").setEnabled(false);	
	var oGMTable = this.getView().byId("GMTable");

	if(nodeId == undefined || nodeId == "undefined" || nodeId == "" || nodeId == null){
		oGMTable.setModel(new sap.ui.model.xml.XMLModel());
		oGMTable.setVisibleRowCount(16);
	}else{
		var noOfDays = this.getView().byId("inputDayId").getValue();
		var material = this.getView().byId("mat").getValue();
		var iBatch = this.getView().byId("Batch").getValue();
		var iSscc = this.getView().byId("sunit").getValue();
		var mvtTypeAll= this.getView().byId("mvtTypeId").getSelectedKeys();
		var procOrdAll= this.getView().byId("procOrdId").getSelectedKeys();
		var refresh = new Date();

		var commaSeparatedmvtType, commaSeparatedProcOrd;

		mvtTypeAll.forEach(function(mvtType){
			commaSeparatedmvtType = (commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)? "'"+mvtType+"'" : commaSeparatedmvtType + ",'"+mvtType+"'";
		});
		commaSeparatedmvtType=(commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)?"ALL":commaSeparatedmvtType;

		procOrdAll.forEach(function(procOrd){
			commaSeparatedProcOrd = (commaSeparatedProcOrd=="" || commaSeparatedProcOrd== undefined)?"'"+procOrd+"'": commaSeparatedProcOrd + ",'"+procOrd+"'";
		});
		commaSeparatedProcOrd = (commaSeparatedProcOrd=="" || commaSeparatedProcOrd== undefined)?"ALL":commaSeparatedProcOrd;
		material = (material=="" || material== undefined)?"ALL":material;
		iSscc = (iSscc=="" || iSscc== undefined)?"ALL":iSscc;
		iBatch = (iBatch=="" || iBatch== undefined)?"ALL":iBatch;


		if(noOfDays=="" || noOfDays== undefined || noOfDays =="undefined" || noOfDays == null){
			noOfDays = 3;
			this.getView().byId("inputDayId").setValue("3");
		}
		sap.ui.controller("JS.GMReport").populateGMTable(plantFromURL,clientFromURL,nodeId,commaSeparatedmvtType,commaSeparatedProcOrd,noOfDays,material, iSscc,iBatch);	
	}
	
		var counter = 0;
 		oGMTable.clearSelection();
  		var noOfColumns = oGMTable.getColumns().length;
  		var oListBinding = oGMTable.getBinding();
 		 if (oListBinding) {
 			 oListBinding.aSorters = null;
 			 oListBinding.aFilters = null;
			 oListBinding.sFilterParams = null;
			 oListBinding.sSortParams = null;
			  }
  		oGMTable.getModel().refresh(true);

		 for (counter = 0; counter < noOfColumns; counter++) {
  				oGMTable.getColumns()[counter].setSorted(false);
  				oGMTable.getColumns()[counter].setFilterValue("");
  				oGMTable.getColumns()[counter].setFiltered(false);
  			}
		
},
handleLineSelectionChange: function(){
	var oLineDropdown = this.getView().byId("selLineId");
	var nodeId = oLineDropdown.getSelectedKey();

	if(nodeId == undefined || nodeId == "undefined" || nodeId == "" || nodeId == null){
		this.getView().byId("procOrdId").setModel(new sap.ui.model.xml.XMLModel());
	}else{
		var noOfDays = this.getView().byId("inputDayId").getValue();
		var mvtTypeAll= this.getView().byId("mvtTypeId").getSelectedKeys();
		var refresh = new Date();

		var commaSeparatedmvtType;

		mvtTypeAll.forEach(function(mvtType){
			commaSeparatedmvtType = (commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)? "'"+mvtType+"'" : commaSeparatedmvtType + ",'"+mvtType+"'";
		});
		commaSeparatedmvtType=(commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)?"ALL":commaSeparatedmvtType;


		if(noOfDays=="" || noOfDays== undefined || noOfDays =="undefined" || noOfDays == null){
			noOfDays = 3;
			this.getView().byId("inputDayId").setValue("3");
		}
		sap.ui.controller("JS.GMReport").populateOrder(plantFromURL,clientFromURL,nodeId,commaSeparatedmvtType,noOfDays);	
	}

	try{
	   document.title = getPropertyValue(oResourceModel,"CustomGR_GMReport_1") + "-"+oLineDropdown.getSelectedItem().getText();
	}catch(e){
	}
},
handleDayChange: function(oEvent){

	var noOfDays = oEvent.getSource().getValue();
	
	if(isNaN(noOfDays) || noOfDays<=0 || noOfDays > 99){
		sap.m.MessageBox.error(getPropertyValue(oResourceModel,"GMReport_NoOfDaysValidation"),getPropertyValue(oResourceModel,"NPDashboard_Error"));
		oEvent.getSource().setValue("3");
	}else{
		var nodeId = this.getView().byId("selLineId").getSelectedKey();

		if(nodeId == undefined || nodeId == "undefined" || nodeId == "" || nodeId == null){
			this.getView().byId("procOrdId").setModel(new sap.ui.model.xml.XMLModel());
		}else{
			var mvtTypeAll= this.getView().byId("mvtTypeId").getSelectedKeys();
			var refresh = new Date();

			var commaSeparatedmvtType;

			mvtTypeAll.forEach(function(mvtType){
				commaSeparatedmvtType = (commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)? "'"+mvtType+"'" : commaSeparatedmvtType + ",'"+mvtType+"'";
			});
			commaSeparatedmvtType=(commaSeparatedmvtType=="" || commaSeparatedmvtType== undefined)?"ALL":commaSeparatedmvtType;

			sap.ui.controller("JS.GMReport").populateOrder(plantFromURL,clientFromURL,nodeId,commaSeparatedmvtType,noOfDays);	
		}
	}
},
onSearch : function(oEvent){
	var sQuery =oEvent.getSource().getValue();
	var oGMable= this.getView().byId("GMTable");
		
			
	var oFilter2 = new sap.ui.model.Filter("Batch",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter3 = new sap.ui.model.Filter("StorageUnit",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter4 = new sap.ui.model.Filter("UserID",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter5 = new sap.ui.model.Filter("Quantity",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter6 = new sap.ui.model.Filter("CommUOM",sap.ui.model.FilterOperator.Contains,sQuery);
	var oFilter7 = new sap.ui.model.Filter("MovementType",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter9 = new sap.ui.model.Filter("PostingDate",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter10 = new sap.ui.model.Filter("Pallet_Info",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter11 = new sap.ui.model.Filter("ProcOrd",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter12 = new sap.ui.model.Filter("Material",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter13 = new sap.ui.model.Filter("MaterialDescription",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter14 = new sap.ui.model.Filter("UOM",sap.ui.model.FilterOperator.Contains,sQuery); 
            var oFilter15 = new sap.ui.model.Filter("BCPStatus",sap.ui.model.FilterOperator.Contains,sQuery); 
            var oFilter16 = new sap.ui.model.Filter("StorageType",sap.ui.model.FilterOperator.Contains,sQuery); 
            var oFilter17 = new sap.ui.model.Filter("StorageBin",sap.ui.model.FilterOperator.Contains,sQuery);   
	var allFilter = new sap.ui.model.Filter([oFilter2,oFilter3,oFilter4, oFilter5,oFilter6,oFilter7,oFilter9,oFilter10,oFilter11,oFilter12,oFilter13,oFilter14,oFilter15,oFilter16,oFilter17], false); 
	oGMable.getBinding("rows").filter(allFilter); 

},
getExcelReport: function(){
	var inpXML;
	var oRowCount = 0;
	var refresh = new Date();
	var oGMTable = this.getView().byId("GMTable");
			
	
	try{
		inpXML= oGMTable.getModel().getXML(); 
		oRowCount = $(inpXML).find('Row').size();
	}catch(e){

	}
	
	if(oRowCount > 0){
		sap.ui.core.BusyIndicator.show(1);
		var Url = "/XMII/Runner?Transaction=MaterialHandling/GMReport/BLS/BLS_ExportGMReport";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", Url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function(eventInfo)
		{
			if (this.status == 200)
			{
				var blob = this.response;
  		     	 	saveAs(blob, "GMReport.xls");
			}
		};
		xhr.send("I_InputXML="+encodeURIComponent(inpXML)+"&cache="+refresh+"&OutputParameter=O_GMReport");
		xhr.onloadend = function(){
			sap.ui.core.BusyIndicator.hide();  
		};
	}
},
onRowSelection: function(){
	var oGMTable = this.getView().byId("GMTable");
	var oGMTableModel = oGMTable.getModel();
	var oSelectedIndex = oGMTable.getSelectedIndex();
	var oSelectedContext = oGMTable.getContextByIndex(oSelectedIndex);
	var mvtType= oGMTableModel.getProperty("MovementType",oSelectedContext);

	if(oSelectedIndex >=0 && mvtType.length > 0){
		this.getView().byId("btnECCGMId").setEnabled(true);
	}else{
		this.getView().byId("btnECCGMId").setEnabled(false);
	}
},
goToECCGM: function(){
	var oGMTable = this.getView().byId("GMTable");
	var oGMTableModel = oGMTable.getModel();
	var oSelectedIndex = oGMTable.getSelectedIndex();
	var oSelectedContext = oGMTable.getContextByIndex(oSelectedIndex);
	var procOrd= oGMTableModel.getProperty("ProcOrd",oSelectedContext);
	var mvtType= oGMTableModel.getProperty("MovementType",oSelectedContext);
	var refresh = new Date();
	var oECCURLModel= new sap.ui.model.xml.XMLModel();
	oECCURLModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});

	oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1="+procOrd+"&Param.2=GIGR&cache="+refresh+"&Content-Type=text/xml"),"",true);

	oECCURLModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
		window.open(oURL);
	});
},
goHome : function(){
	window.top.close();
}
});