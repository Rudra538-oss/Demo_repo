var machine, loginID;
var userLanguage, clientFromURL, oLineDrop;
var oResourceModel, oDisplayLineMaterialTypeModel;
var plantFromURL, selectedLine;
var mat_type, stype, sbin;
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.MaterialType", {


	onInit: function () {

		var RefreshDate = new Date();
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + RefreshDate + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,Custom_GR_alertMat,Custom_GR_Error,Custom_GR_alertStype,Custom_GR_alertSbin,Custom_GR_AddSuccess,Custom_GR_Success,Custom_GR_AddFail,Custom_GR_UpdateSuccess,Custom_GR_UpdateFail,Custom_GR_DeleteSuccess,Custom_GR_DeleteFail,";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + RefreshDate + "&Content-Type=text/xml", "", false);

		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties?refresh="+Math.random()});
		this.getView().byId("page").setModel(oResourceModel, "Localized"); */
		var page = this.getView().byId("page");
		var identifier = "MatType1>NPDashboard_Back,MatType20>NPDashboard_Line,MatType2>Custom_GR_Heading,MatType12>Custom_GR_Heading,MatType3>Custom_GR_MaterialType,MatType4>Custom_GR_StorageType,MatType5>Custom_GR_StorageBin,MatType6>Custom_GR_Update,MatType7>Custom_GR_Add,MatType8>Custom_GR_Delete,MatType9>Custom_GR_MaterialType,MatType10>Custom_GR_StorageType,MatType11>Custom_GR_StorageBin";
		localize(page, identifier, userLanguage);

		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);
		
		plantFromURL = getURLParameter("plantFromURL");
  		clientFromURL = getURLParameter("clientFromURL");
		loginID = document.getElementById("login").value;
		var oMaterialTypeModel = new sap.ui.model.xml.XMLModel();
		oMaterialTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetStype_Sbin_MaterialType&Param.1=MAT_TYPE&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		var oMaterialType = this.getView().byId("material_type");
		var oListItemprinter = new sap.ui.core.ListItem();
		oListItemprinter.bindProperty("text", "Material_Type");
		oListItemprinter.bindProperty("key", "Material_Type"); 
		oMaterialType.bindItems("/Rowset/Row", oListItemprinter); 
		oMaterialType.setModel(oMaterialTypeModel);
                        var Error = getPropertyValue(oResourceModel, "ODATA_Error");
		oLineDrop = this.getView().byId("Line");
                     
		sortinglines(plantFromURL, clientFromURL, userLanguage, oLineDrop, Error, 0);
                        this.doDisplayTable();
	},
	onAfterRendering: function () {

		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
	},

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	doRowSelect: function (oEvent) {
		var Refresh = new Date();
		this.getView().byId("btn_delete").setEnabled(true);
		var oDisplayTable = this.getView().byId("MaterialTypeTable");

		var selected_Item1 = oDisplayTable.getSelectedItem().toString();
		var lineindex = selected_Item1.substr(selected_Item1.length - 1);
		oDisplayLineMaterialTypeModel = new sap.ui.model.xml.XMLModel();
		oDisplayLineMaterialTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetStype_Sbin_MaterialType&Param.1=TABLE&Param.2="+plantFromURL+"&Param.3="+userLanguage+"&d=" + Refresh + "&Content-Type=text/xml"), "", false);

		var olineModel = oDisplayTable.getModel();

		var materialtype = olineModel.getProperty("/Rowset/Row/" + lineindex + "/MATERIAL_TYPE");
		var storagetype = olineModel.getProperty("/Rowset/Row/" + lineindex + "/STORAGE_TYPE");
		var storagebin = olineModel.getProperty("/Rowset/Row/" + lineindex + "/STORAGE_BIN");
		var linedesc = olineModel.getProperty("/Rowset/Row/" + lineindex + "/NODEID");

		this.getView().byId("material_type").setSelectedKey(materialtype);
		this.getView().byId("storage_type").setValue(storagetype);
		this.getView().byId("storage_bin").setValue(storagebin);
		if (selectedLine != "" && selectedLine != "---" || selectedLine == "null") {
			this.getView().byId("Line").setSelectedKey(linedesc);
		}

	},

	doDisplayTable: function () {

		var Refresh = new Date();
		var oDisplayMaterialTypeModel = new sap.ui.model.xml.XMLModel();
		oDisplayMaterialTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetStype_Sbin_MaterialType&Param.1=TABLE&Param.2="+plantFromURL+"&Param.3="+userLanguage+"&d=" + Refresh + "&Content-Type=text/xml"), "", false);
		var oMaterialTypeTable = this.getView().byId("MaterialTypeTable");
		oMaterialTypeTable.setModel(oDisplayMaterialTypeModel);
		var oMaterialTypeItems = this.getView().byId("MaterialTypeItems");
		oMaterialTypeTable.bindItems("/Rowset/Row", oMaterialTypeItems);


	},

	doAdd: function () {
		var Refresh = new Date();
		mat_type = this.getView().byId("material_type").getSelectedKey();
		stype = this.getView().byId("storage_type").getValue();
		sbin = this.getView().byId("storage_bin").getValue();
		selectedLine = this.getView().byId("Line").getSelectedKey();
		if (selectedLine == "" || selectedLine == "---" || selectedLine == "null") {
			selectedLine = "null";
		}

		if (mat_type == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertMat"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: oResourceModel.getProperty("Custom_GR_Error")
				});
		} else if (stype == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertStype"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
		} else if (sbin == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertSbin"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
		} else {
			var oModel = new sap.ui.model.xml.XMLModel();
			oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_AddUpdateDelete_MaterialType&Param.1=ADD&Param.2=" + mat_type + "&Param.3=" + stype + "&Param.4=" + sbin + "&Param.5=" + selectedLine + "&Param.6=" + loginID + "&d=" + Refresh + "&Content-Type=text/xml"), "", false);
			var success = oModel.getProperty("/Rowset/Row/Output");
			if (success == 1) {
				sap.m.MessageBox.show(
					getPropertyValue(oResourceModel, "Custom_GR_AddSuccess"), {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: getPropertyValue(oResourceModel, "Custom_GR_Success")
					});
				this.doDisplayTable();
				this.clear();
                                    }   else if (success == 0) {
				sap.m.MessageBox.show(
					getPropertyValue(oResourceModel, "Custom_GR_UpdateSuccess"), {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: getPropertyValue(oResourceModel, "Custom_GR_Success")
					});
				this.doDisplayTable();
                                                 this.clear();
			} else {
				sap.m.MessageBox.show(
					getPropertyValue(oResourceModel, "Custom_GR_AddFail"), {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: getPropertyValue(oResourceModel, "Custom_GR_Error")
					});
			}
		}
	},

	doDelete: function () {
		var Refresh = new Date();
		mat_type = this.getView().byId("material_type").getSelectedKey();
		stype = this.getView().byId("storage_type").getValue();
		sbin = this.getView().byId("storage_bin").getValue();
		selectedLine = this.getView().byId("Line").getSelectedKey();
		if (selectedLine == "" || selectedLine == "---" || selectedLine == "null") {
			selectedLine = "null";
		}
		if (mat_type == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertMat"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
		} else if (stype == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertStype"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
		} else if (sbin == "") {
			sap.m.MessageBox.show(
				getPropertyValue(oResourceModel, "Custom_GR_alertSbin"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
		} else {
			var oModel = new sap.ui.model.xml.XMLModel();
			oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_AddUpdateDelete_MaterialType&Param.1=DELETE&Param.2=" + mat_type + "&Param.3=" + stype + "&Param.4=" + sbin + "&Param.5=" + selectedLine + "&d=" + Refresh + "&Content-Type=text/xml"), "", false);
			var success = oModel.getProperty("/Rowset/Row/Output");
			if (success == 1) {
				sap.m.MessageBox.show(
					getPropertyValue(oResourceModel, "Custom_GR_DeleteSuccess"), {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: getPropertyValue(oResourceModel, "Custom_GR_Success")
					});
				this.doDisplayTable();
				this.clear();
                                
			} else {
				sap.m.MessageBox.show(
					getPropertyValue(oResourceModel, "Custom_GR_DeleteFail"), {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: getPropertyValue(oResourceModel, "Custom_GR_Error")
					});
			}
		}
	},
	clear: function () {
		mat_type = this.getView().byId("material_type").setSelectedKey();
		stype = this.getView().byId("storage_type").setValue();
		sbin = this.getView().byId("storage_bin").setValue();
		selectedLine = this.getView().byId("Line").setSelectedKey();
	},

	goBack: function () {

		window.top.close();

	}
});