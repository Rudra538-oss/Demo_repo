jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.commons.MessageBox");
jQuery.sap.require("sap.m.MessageBox");
var selectedNodeID;
var userLanguage;
var oResourceModel;
var plant;
var nodeID;
var bDescending;
var sQuery = "";
var msgType;
var nodeDesc;
var prodDatePicker;
var qnttyInput;
var oEPOtable;
var bcpElement;
var oBCPStats;
var CrtBtn;
var oEPOTableModel, clientFromURL;


sap.ui.controller("ePO.EmergencyProcessOrder", {


	onInit: function () {

		bcpElement = this.getView().byId("bcpHDR");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		CrtBtn = this.getView().byId("crtEPOB");

		if (oBCPStats != "1") {

			this.getView().byId("crtEPOB").setEnabled(true);
		} else {
			this.getView().byId("crtEPOB").setEnabled(false);

		}
		oContr = this;
		bDescending = true;
		var DateNw = new Date();
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,EPOPROP_MESSAGE_TYPE,NPDashboard_Close,EPOPROP_LINE_NAME,EPO_UI_MATERIAL,EPO_UI_MAT_DESC,EPO_UI_PV,EPO_UI_ORG_QUANTITY,EPO_UI_PROD_DATE,EPOPROP_EPO_CREATION,EPO_UI_CREATE,TransferDisplay_Success";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
		clientFromURL = getURLParameter("clientFromURL");
		var oPlantModel = new sap.ui.model.xml.XMLModel();
		oPlantModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&Param.1=" + userLanguage + "&cache=" + DateNw + "&Content-Type=text/xml"), "", false);
		plant = oPlantModel.getProperty("/Rowset/Row/PLANT");
		client = oPlantModel.getProperty("/Rowset/Row/CLIENT");
		/*oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("page").setModel(oResourceModel,"EPO_PROP"); */
		var page = this.getView().byId("page");
		var identifier = "IMReceipt1>NPDashboard_Home,title1>InBndMatRecpt_title_BCP,EPO_PROP1>EPO_UI_HDR_TITLE,EPO_PROP2>EPO_UI_SELECTION_PANEL,EPO_PROP3>EPO_UI_SELECTION_PANEL,EPO_PROP4>EPO_UI_MATERIAL,EPO_PROP5>EPO_UI_PV,EPO_PROP6>EPO_UI_INPT_PO,EPO_PROP7>EPO_UI_REFRESH,EPO_PROP8>EPO_UI_INPT_PO,EPO_PROP9>EPO_UI_MATERIAL,EPO_PROP10>EPO_UI_PV,EPO_PROP11>EPO_UI_MAT_DESC,EPO_PROP12>EPO_UI_LAST_EXECUTION_DATE,EPO_PROP13>EPO_UI_QUANTITY,EPO_PROP14>EPO_UI_CREATE,EPO_PROP15>EPO_UI_EPO_REPORT";
		localize(page, identifier, userLanguage);
		var userName = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("usernameIds").setUsername(userName);

		nodeID = getURLParameter("node");


		if (nodeID == "" || nodeID == undefined) {
			this.getView().byId("lineValueHlpBtn").setText("Click here to select a line");
		} else {
			var oModel = new sap.ui.model.xml.XMLModel();
			oModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/SQLQ_GetLineByNode&Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.3=" + nodeID + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
			nodeDesc = oModel.getProperty("/Rowset/Row/DESCRIPTION");
			selectedNodeID = oModel.getProperty("/Rowset/Row/NODE_ID");
			this.getView().byId("lineValueHlpBtn").setText(nodeDesc);

		}


		oEPOTableModel = new sap.ui.model.xml.XMLModel();
		oEPOTableModel.setSizeLimit(10000);
		oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + nodeID + "&Param.2=%&Param.3=%&Param.4=%&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		oEPOtable = this.getView().byId("iDEPOTble");
		oEPOtable.setModel(oEPOTableModel);

	},

	onAfterRendering: function () {
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

		setInterval(function () {

			oBCPStats = getBCPStatus(bcpElement, "", "");

			oEPOtable = oContr.getView().byId("iDEPOTble");
			var rows = oEPOtable.getItems();

			for (var i = 0; i < rows.length; i++) {

				if (oBCPStats == "1") {
					rows[i].getCells()[6].setEnabled(false);
				} else {
					rows[i].getCells()[6].setEnabled(true);
				}
			}


		}, 30000);

		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);
	},
	goHome: function () {
		window.top.close();
	},

	getDocType: function () {
		/*
		var refresh = new Date();
		//var docValueHlpBtn = this.getView().byId("docValueHlpBtn");
		var oListXMLModel = new sap.ui.model.xml.XMLModel();

		var xmlText = "<Rowsets><Rowset><Row><DESCRIPTION>LOIPRO</DESCRIPTION></Row><Row><DESCRIPTION>Control Recipe</DESCRIPTION></Row></Rowset></Rowsets>";

		oListXMLModel.setXML(xmlText);

		var searchDoc = new sap.m.SearchField({placeholder: "Search", liveChange: function(oEvent){
						   			var sQuery = oEvent.getSource().getValue();
		    							var binding = oListDoc.getBinding("items");
		 
		    							var filters = [
		        							new sap.ui.model.Filter("DESCRIPTION", sap.ui.model.FilterOperator.Contains, sQuery)
		   
		    								];
		    							var oFilter = new sap.ui.model.Filter({
		        										aFilters: filters,
		        										_bMultiFilter: true
		    								      }); 
		 
		    							binding.filter(oFilter);

									}
							});
		var oListDoc= new sap.m.List({
						mode:sap.m.ListMode.SingleSelectMaster , 
						includeItemInSelection: true,
						select: function () {
							var selectedDocType = oListDoc.getSelectedItem().getTitle();	
							docValueHlpBtn.setText(selectedDocType);
							oDialogDocSearch.close();
							oDialogDocSearch.destroy();	
						}
						
				});
		var oListItem = new sap.m.StandardListItem({
		    				title: "{DESCRIPTION}",
						tooltip: "{DESCRIPTION}"
				});

		oListDoc.setModel(oListXMLModel);
		oListDoc.bindAggregation("items", "/Rowset/Row", oListItem);

		////////////////////////////////////////////////// Dialog for Doc Search /////////////////////////////////////////////////////

			var oDialogDocSearch = new sap.m.Dialog({
					title: getPropertyValue(oResourceModel, "EPOPROP_MESSAGE_TYPE"),
					content: [searchDoc, oListDoc],
					buttons: [
							new sap.m.Button({
							text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
							press: function () {
								oDialogDocSearch.close();
								oDialogDocSearch.destroy();
							}})
						]
							
						});
			
				oDialogDocSearch.setContentWidth("500px");
				oDialogDocSearch.setContentHeight("600px");
				oDialogDocSearch.open();
		*/
	},

	getLines: function () {
		var refresh = new Date();
		var lineValueHlpBtn = this.getView().byId("lineValueHlpBtn");
		var WorkcenterModel = new sap.ui.model.xml.XMLModel();
		WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.4=0&Param.5=0&Param.6=0&cache=" + refresh + "&Content-Type=text/xml", "", false);
		var userLocale1 = WorkcenterModel.getProperty('/Rowset/Row/USER_LANGUAGE');
		var oDataFlag = WorkcenterModel.getProperty('/Rowset/Row/ODATA_FLAG');
		var Error = getPropertyValue(oResourceModel, "ODATA_Error");

		if (oDataFlag == 1) {

			var xsrfidvalue;
			var xsrfid = "/XMII/IlluminatorOData/QueryTemplate?xsrfid=Fetch";
			$.ajax({
				type: "GET",
				async: false,
				success: function (data, textStatus, request) {

					xsrfidvalue = request.getResponseHeader('xsrfid');
				},
				error: function (request, textStatus, errorThrown) {
					console.log(request.getResponseHeader('xsrfid'));

				},
				url: xsrfid
			});
			var data = {
				client: client,
				extensionClient: client,
				extensionPlant: plant,
				plant: plant,

				userLocale: userLocale1
			};

			var eventurl = "/OEEDashboard/DataAccessServlet/GetPHNodesForUserInput?xsrfid=" + xsrfidvalue;
			$.ajax({
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(data),

				async: false,
				success: function (data) {
					console.log(data);
					var ODataForPH = JSON.stringify(data);

					WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines", "Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.3=" + encodeURIComponent(ODataForPH) + "&Param.4=1&Param.5=0&Param.6=0&cache=" + new Date() + "&Content-Type=text/xml", false, "POST");
 
				},
				error: function (errorThrown) {
					
					
                                                            WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.4=0&Param.5=1&Param.6=0&cache=" + refresh + "&Content-Type=text/xml", "", false);
		
				},
				url: eventurl
			});
		}


		var desc = WorkcenterModel.getProperty('/Rowset/Row/DESCRIPTION');
		/* oListXMLModel.setSizeLimit(10000);
		oListXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1="+plant+"&Param.2="+userLanguage+"&cache="+refresh+"&Content-Type=text/xml"),"",false); 
		var rowCount = $(oListXMLModel.getXML()).find("Row").size();
		oListXMLModel.setSizeLimit(rowCount);
		*/
		var searchLine = new sap.m.SearchField({
			placeholder: "Search for Line",
			liveChange: function (oEvent) {
				var sQuery = oEvent.getSource().getValue();
				var binding = oListLine.getBinding("items");

				var filters = [
					new sap.ui.model.Filter("DESCRIPTION", sap.ui.model.FilterOperator.Contains, sQuery)

				];
				var oFilter = new sap.ui.model.Filter({
					aFilters: filters,
					_bMultiFilter: true
				});

				binding.filter(oFilter);

			}
		});
		var oListLine = new sap.m.List({
			mode: sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection: true,
			select: function () {
				var selectedLine = oListLine.getSelectedItem().getTitle();
				selectedNodeID = oListLine.getSelectedItem().getTooltip();

				lineValueHlpBtn.setText(selectedLine);
				nodeDesc = selectedLine;

				var DateNw = new Date();
				var oEPOTableModel = new sap.ui.model.xml.XMLModel();
				oEPOTableModel.setSizeLimit(10000);
				oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + selectedNodeID + "&Param.2=%&Param.3=%&Param.4=%&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				oEPOtable.setModel(oEPOTableModel);
				oDialogLineSearch.close();
				oDialogLineSearch.destroy();
			}
		});
		var oListItem = new sap.m.StandardListItem({
			title: "{DESCRIPTION}",
			tooltip: "{NODE_ID}"
		});

		oListLine.setModel(WorkcenterModel);
		oListLine.bindAggregation("items", "/Rowset/Row", oListItem);

		////////////////////////////////////////////////// Dialog for Line Search /////////////////////////////////////////////////////

		var oDialogLineSearch = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "EPOPROP_LINE_NAME"),
			content: [searchLine, oListLine],
			buttons: [
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
					press: function () {

						oDialogLineSearch.close();
						oDialogLineSearch.destroy();
					}
				})
			]

		});

		oDialogLineSearch.setContentWidth("500px");
		oDialogLineSearch.setContentHeight("600px");
		oDialogLineSearch.open();
	},

	createEPO: function (oEvent) {

		var oCells = oEvent.getSource().getParent().getCells();
		var selectedMat = oCells[1].getText();
		var selectedPV = oCells[2].getText();
		var selectedDesc = oCells[3].getText();
		var selectedQuantity = oCells[5].getNumber();
		var selectedOrder = oCells[0].getText();


		///////////////////////////////////////////////// Dialog Content ///////////////////////////////////////////////////////////////////

		var matInput = new sap.m.Input({
			id: "input1",
			editable: false
		});
		matInput.setValue(selectedMat);

		var descInput = new sap.m.Input({
			id: "input2",
			editable: false
		});
		descInput.setValue(selectedDesc);

		var pvInput = new sap.m.Input({
			id: "input3",
			editable: false
		});
		pvInput.setValue(selectedPV);

		var oOrgQnttyInput = new sap.m.Input({
			id: "input4",
			editable: false
		});
		oOrgQnttyInput.setValue(selectedQuantity);
		qnttyInput = new sap.m.Input({
			width: "50px"
		});
		var oUOM = new sap.m.Input({
			width: "70px"
		});


		var DateNw = new Date();
		var oEPOTableModel = new sap.ui.model.xml.XMLModel();
		oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + selectedNodeID + "&Param.2=" + selectedOrder + "&Param.3=" + selectedMat + "&Param.4=" + selectedPV + "&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

		var UOM = oEPOTableModel.getProperty("/Rowset/Row/UOM");
		var commUOM = oEPOTableModel.getProperty("/Rowset/Row/CommUOM");
		var Quantity = oEPOTableModel.getProperty("/Rowset/Row/QUANTITY");

		//alert(Quantity);
		//alert(commUOM);
		//alert(UOM);
		oUOM.setValue(commUOM);

		/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF = new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml", "", false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");

		//prodDatePicker = new sap.m.DatePicker({width: "190px"});
		prodDatePicker = new sap.m.DatePicker({

			type: "DateTime",
			valueFormat: "MM/dd/yyyy",
			displayFormat: oDisplayFormat,
			width: "190px",
			editable: true
		});
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy"
		});

		var datenowNow = timeFormat.format(new Date(DateNw));
		prodDatePicker.setValue(datenowNow);

		/////////////////////////////////////////////////// Form - Emergency PO Creation////////////////////////////////////////////////////////////
		var oLayoutLabel = new sap.ui.layout.form.ResponsiveGridLayout({
			labelSpanL: 3,
			labelSpanM: 3,
			labelSpanS: 3,
			emptySpanL: 0,
			emptySpanM: 0,
			emptySpanS: 0,
			columnsL: 1,
			columnsM: 1,
		});

		var oForm = new sap.ui.layout.form.Form({
			id: "createFrm",
			layout: oLayoutLabel,
			editable: true,
			formContainers: [

				new sap.ui.layout.form.FormContainer({
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: getPropertyValue(oResourceModel, "EPO_UI_MATERIAL"),
							fields: [matInput]
						}),
						new sap.ui.layout.form.FormElement({
							label: getPropertyValue(oResourceModel, "EPO_UI_MAT_DESC"),
							fields: [descInput]
						}),
						new sap.ui.layout.form.FormElement({
							label: getPropertyValue(oResourceModel, "EPO_UI_PV"),
							fields: [pvInput]
						}),
						new sap.ui.layout.form.FormElement({
							label: getPropertyValue(oResourceModel, "EPO_UI_ORG_QUANTITY"),
							fields: [oOrgQnttyInput]
						})
					]
				}),

				new sap.ui.layout.form.FormContainer({
					formElements: [

						new sap.ui.layout.form.FormElement({
							label: getPropertyValue(oResourceModel, "EPO_UI_PROD_DATE"),
							fields: [prodDatePicker]
						})
					]
				})
			]
		});

		oLayoutLabel.addStyleClass("epoCreateFrm");

		////////////////////////////////////////////////// Dialog for Emergency PO Creation /////////////////////////////////////////////////////


		var oDialogEPO = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "EPOPROP_EPO_CREATION"),
			content: [oForm],
			buttons: [
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "EPO_UI_CREATE"),
					press: function () {

						var ProdDate = prodDatePicker.getValue();

						if (ProdDate == "") {
							sap.ui.commons.MessageBox.alert("Production Date can't be Blank", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
						} else {
							var oReleaseOrderModel = new sap.ui.model.xml.XMLModel();
							oReleaseOrderModel.attachRequestSent(function () {
								sap.ui.core.BusyIndicator.show(1);
							});

							oReleaseOrderModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_ReleaseLOIPRO_PO&Param.1=" + selectedMat + "&Param.2=" + selectedOrder + "&Param.3=" + selectedNodeID + "&Param.4=" + selectedPV + "&Param.5=" + UOM + "&Param.6=" + ProdDate + "&Param.7=" + Quantity + "&d=" + DateNw + "&Content-Type=text/xml"), "", true);
							oReleaseOrderModel.attachRequestCompleted(function () {
								sap.ui.core.BusyIndicator.hide();
								var oStatus = oReleaseOrderModel.getProperty("/Rowset/Row/O_Status");
								var oMessage = oReleaseOrderModel.getProperty("/Rowset/Row/O_Message");

								if (oStatus == "S") {
									sap.ui.commons.MessageBox.alert(oMessage, sap.ui.commons.MessageBox.Icon.SUCCESS, getPropertyValue(oResourceModel, "TransferDisplay_Success"));
									var oEPOTableModel = new sap.ui.model.xml.XMLModel();
									oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + selectedNodeID + "&Param.2=%&Param.3=%&Param.4=%&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
									oEPOtable.setModel(oEPOTableModel);
									oDialogEPO.close();
									oDialogEPO.destroy();
								} else {
									sap.ui.commons.MessageBox.alert(oMessage, sap.ui.commons.MessageBox.Icon.ERROR, "Error");
								}
							});
						}
					}
				}),
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
					press: function () {
						oDialogEPO.close();
						oDialogEPO.destroy();
					}
				})
			]
		});

		oDialogEPO.setContentWidth("650px");
		oDialogEPO.setContentHeight("320px");
		oDialogEPO.open();

	},

	onFilter: function (oEvent) {

		sQuery = oEvent.getSource().getValue();
		var binding = this.getView().byId("iDEPOTble").getBinding("items");
		var filters = [
			new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery),
			new sap.ui.model.Filter("PV", sap.ui.model.FilterOperator.Contains, sQuery),
			new sap.ui.model.Filter("PO", sap.ui.model.FilterOperator.Contains, sQuery)
		];
		var oFilter = new sap.ui.model.Filter({
			aFilters: filters,
			_bMultiFilter: true
		});

		binding.filter(oFilter);
	},
	onSort: function (oEvent) {

		bDescending = !bDescending;
		//sQuery = oEvent.getSource().getValue();
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("PLANNED_STDATE", bDescending));
		var filters = [
			new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery),
			new sap.ui.model.Filter("PV", sap.ui.model.FilterOperator.Contains, sQuery),
			new sap.ui.model.Filter("PO", sap.ui.model.FilterOperator.Contains, sQuery)
		];
		var aFilters = new sap.ui.model.Filter({
			aFilters: filters,
			_bMultiFilter: true
		});

		this.byId("iDEPOTble").getBinding("items").filter(aFilters).sort(aSorters);
	},
	getEPOReport: function () {
		// var nodeID = this.getView().byId("lineValueHlpBtn").getText();
		//var msgType = this.getView().byId("docValueHlpBtn").getText();
		window.open(encodeURI("/XMII/CM/MaterialHandling/EmergencyPO/Page/EmergencyProcessOrderReport.irpt?node=" + selectedNodeID), "_blank");
	},

	refresh: function (oEvent) {
		var DateNw = new Date();
		var MATNR = this.getView().byId("inputMat").getValue();
		var PV = this.getView().byId("inputPV").getValue();
		//var MATDesc = this.getView().byId("inputMatDesc").getValue();
		var PO = this.getView().byId("inputPO").getValue();

		if (MATNR == "") {
			MATNR = "%";
		}
		if (PV == "") {
			PV = "%";
		}

		if (PO == "") {
			PO = "%";
		}

		var oEPOTableModel = new sap.ui.model.xml.XMLModel();
		oEPOTableModel.setSizeLimit(10000);
		oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + selectedNodeID + "&Param.2=" + PO + "&Param.3=" + MATNR + "&Param.4=" + PV + "&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var oEPOtable = this.getView().byId("iDEPOTble");
		oEPOtable.setModel(oEPOTableModel);

	},
	getDateDisplayFormat: function (date) {

		if (date === "0000-00-00") {
			return date;
		} else {
			return formatDate(date, "MM/dd/yyyy HH:mm:ss");
		}
	},

	getFormattedQuantityUOM: function (obj1, obj2) {

		var FormattedQuantity = formatQuantity(obj1, "FORMAT");
		return (FormattedQuantity + " " + obj2);

	}

});