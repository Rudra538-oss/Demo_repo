var clientFromURL;
var oBCPStatusModel;
var userLanguage, oResourceModel;
var plantFromURL, orderFromURL, nodeFromURL;
var headerFromURL, pDateFromURL;
var oDisplayTable, day1, resFromURL;
var oTableDisplayModel;
var oStatusTableModel;
var bcpElement;
var POrder;
var oDisplayTable;
var phaseNumber, storageType, storageBin;
var initialSType, initialSBin;
var groupFlag = 1;
var day1;
var MaterialSpecificStockModel;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.TransferOrderDashboard", {

    onInit: function() {

        jQuery.sap.require("sap.ui.commons.MessageBox");
        oControllerThis = this;
        var DateNw = new Date();
        bcpElement = this.getView().byId("bcpStatus");
        oBCPStats = getBCPStatus(bcpElement, "", "");
        var oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
        var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,TO_MSG3,TO_DashboardTitleHdr,CustomGI_GI_23,CustomGI_PO_2,TODashboard_Confirmed,TODashboard_NotConfirmed,TODashboard_Cancelled,TODashboard_ThresholdQuantity,GI_Stage_AvlQuant,CustomGI_CL_6,TransferDisplay_colHeader_putaway,TODashboard_UserInfo,GI_Stage_History_ReqBy,GI_Stage_History_ReqOn,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,TODashboard_NotCreated,TODashboard_Remaining,LOGOFF_ERROR,TODashboard_CountTONumber,TODashboard_Status,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
        oResourceModel = new sap.ui.model.xml.XMLModel();
        oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        var page = this.getView().byId("pageID");
        var identifier = "TODashboard1>NPDashboard_Back,TODashboard1>NPDashboard_Line,CompList9>TODashboard_ThresholdQuantity,GIPO4>CustomGI_PO_2,CompList9>TransferDisplay_colHeader_putaway,TODashboard4>CustomGI_PO_Days,TODashboard12>TODashboard_UserInfo,TODashboard11>TODashboard_TOConfQuantity,TODashboard17>TODashboard_Requested,TODashboard18>TODashboard_Transferred,TODashboard13>CustomGI_CL_6,TODashboard9>TODashboard_TOStatus,TODashboard16>TODashboard_CountTONumber,TODashboard6>NPM_COMMON_QUANTITY,TODashboard6>TODashboard_ECCTRNumber,TODashboard6>TODashboard_CountTONumber,TODashboard2>InBndMatRecpt_title_BCP,CompList9>CustomGI_CL_6,CompList27>GI_Stage_AvlQuant,TODashboard6>GI_Stage_PSA,CompList10>CustomGI_CL_7,TODashboard4>CustomGI_CL_2,TODashboard3>TO_DashboardTitle,TODashboard5>NPM_COMMON_ORD_MATERIAL,TODashboard6>TODashboard_TRNumber,TODashboard7>TODashboard_TRQuantity,CompList13>TODashboard_Export,TODashboard14>TODashboard_PSA,TODashboard8>TODashboard_TRPriority,TODashboard9>TODashboard_TONumber,TODashboard10>TODashboard_TOItem,TODashboard11>TODashboard_TOQuantity,TODashboard12>TODashboard_TOPriority,TODashboard13>GI_Stage_History_ReqOn,TODashboard12>GI_Stage_History_ReqBy";
        localize(page, identifier, userLanguage);
        document.title = getPropertyValue(oResourceModel, "TO_DashboardTitleHdr");

        plantFromURL = getURLParameter("plantFromURL");
        orderFromURL = getURLParameter("orderFromURL");
        nodeFromURL = decodeURIComponent(getURLParameter("nodeFromURL"));
        clientFromURL = getURLParameter("clientFromURL");
        resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
        day1 = getURLParameter("day1");

        var processOrderInput = this.getView().byId("ProcessOrder");
        processOrderInput.setValue(orderFromURL);
        this.getView().byId("resDes").setValue(resFromURL);
        var oLineDropdown = this.getView().byId("resDes");

        sortinglines(plantFromURL, clientFromURL, userLanguage, oLineDropdown, Error, 0);
        oLineDropdown.setSelectedKey(nodeFromURL);
        oLineDropdown.setEditable(false);
       
        if (orderFromURL == "" || orderFromURL == undefined) {
           
            var oOrderModel = new sap.ui.model.xml.XMLModel();
            oOrderModel.setSizeLimit(10000);
            oOrderModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + plantFromURL + "&Param.4=" + userLanguage + "&Param.5=" + day1 + "&Param.7=EPO&d=" + DateNw + "&Content-Type=text/xml"), "", false);

            var oProcessOrderCombo = this.getView().byId("ProcessOrderCombo");
            oProcessOrderCombo.setVisible(true);
            processOrderInput.setVisible(false);
            oProcessOrderCombo.setModel(oOrderModel);
            orderFromURL = oOrderModel.getProperty("/Rowset/Row/0/Order")
            oProcessOrderCombo.setSelectedKey(orderFromURL);
            oLineDropdown.setEditable(true);
            var daysRange = this.getView().byId("range2");
            daysRange.setVisible(true);
            daysRange.setValue(day1);
            var refreshLabel = this.getView().byId("RefreshField");
            refreshLabel.setLabel(getPropertyValue(oResourceModel, "CustomGI_PO_2"));
            var refreshBtn = this.getView().byId("Refresh");
            refreshBtn.setWidth("30%");
        }
        oSTypeList = this.getView().byId("STypeCombo");
        var oPSAListModel = new sap.ui.model.xml.XMLModel();
        oPSAListModel.setSizeLimit(10000);
        oPSAListModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetSupplyAreaTOStaging&Param.1=" + orderFromURL + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
        oSTypeList.setModel(oPSAListModel);
        oSTypeList.setSelectedItem(oSTypeList.getItems()[0]);

        initialSType = oPSAListModel.getProperty("/Rowset/Row/0/STORAGE_TYPE");
        initialSBin = oPSAListModel.getProperty("/Rowset/Row/0/STORAGE_BIN");



        var oTOTable = this.getView().byId("TODashboardTable");
        oTableDisplayModel = new sap.ui.model.xml.XMLModel();
        oTableDisplayModel.setSizeLimit(10000);
        oTableDisplayModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetTOStagingDashboardDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + encodeURIComponent(initialSType) + "&Param.5=" + encodeURIComponent(initialSBin) + "&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        var outputTable = oTableDisplayModel.getProperty("/Rowset/Row/OutputTable");
        oStatusTableModel = new sap.ui.model.xml.XMLModel();
        oStatusTableModel.setData($.parseXML(outputTable));
        oTOTable.setModel(oStatusTableModel);

        var MatPresent = oStatusTableModel.getProperty("/Rowset/Row/0/Material");
        if (MatPresent != "") {
            var oColumn = oTOTable.getColumns()[0];
            oTOTable.setGroupBy(oColumn);
        }

        var OutputChart = oTableDisplayModel.getProperty("/Rowset/Row/OutputChart");
        var ochartModel = new sap.ui.model.xml.XMLModel();
        ochartModel.setData($.parseXML(OutputChart));

        var oVizFrame = this.getView().byId("idVizPieFrame");
        oVizFrame.setModel(ochartModel);
        oVizFrame.setVizProperties({
            plotArea: {
                colorPalette: ['#5cb9e5', '#b5d857', '#f9c264', '#e52929'],
                dataPointStyle: {
                    rules: [{
                            displayName: getPropertyValue(oResourceModel, "TODashboard_NotCreated"),
                            dataContext: {
                                TOStatus: 'Not Created'
                            },
                            properties: {
                                color: '#5cb9e5'
                            }
                        },
                        {
                            displayName: getPropertyValue(oResourceModel, "TODashboard_Confirmed"),
                            dataContext: {
                                TOStatus: 'Confirmed'
                            },
                            properties: {
                                color: '#b5d857'
                            }
                        },
                        {
                            displayName: getPropertyValue(oResourceModel, "TODashboard_NotConfirmed"),
                            dataContext: {
                                TOStatus: 'Not Confirmed'
                            },
                            properties: {
                                color: '#f9c264'
                            }
                        },
                        {
                            displayName: getPropertyValue(oResourceModel, "TODashboard_Cancelled"),
                            dataContext: {
                                TOStatus: 'Cancelled'
                            },
                            properties: {
                                color: '#e52929'
                            }
                        }
                    ]
                }

            }

        });

        var oPopOver = this.getView().byId("idPopOver");
        oPopOver.connect(oVizFrame.getVizUid());

        var oVizBarFrame = this.getView().byId("idVizBarFrame");
        oVizBarFrame.setModel(ochartModel);
        oVizBarFrame.setVizProperties({
            plotArea: {
                colorPalette: ['#ff8500', '#b5d857', '#EACF5E']
            }
        });
        var oPopOverBar = this.getView().byId("idPopOverBar");
        oPopOverBar.connect(oVizBarFrame.getVizUid());

        var MaterialSpecificStock = oTableDisplayModel.getProperty("/Rowset/Row/OutputMaterialStock");
        MaterialSpecificStockModel = new sap.ui.model.xml.XMLModel();
        MaterialSpecificStockModel.setData($.parseXML(MaterialSpecificStock));
       

        var materialSelect = this.getView().byId("MaterialSelection");
        materialSelect.setModel(MaterialSpecificStockModel);
        var MaterialItems = materialSelect.getItems();
        materialSelect.setSelectedItems(MaterialItems);

        var ThresholdQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/ThresholdStock"));
        var ReqdQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/RequiredStock"));
        var AvlQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/AvailableStock"));
        var PutawayQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/PutawayStock"));

        this.getView().byId("ThresholdQuantID").setValue(ThresholdQuant);
        this.getView().byId("ReqdQuantID").setValue(ReqdQuant);
        this.getView().byId("AvlQuantID").setValue(AvlQuant);
        this.getView().byId("PutawayQuantID").setValue(PutawayQuant);

	
    },



    onAfterRendering: function() {
        var DateNw = new Date();
        var oTOTable = this.getView().byId("TODashboardTable");
	var ErrorMsg = oTableDisplayModel.getProperty("/Rowset/Row/OutputErrorMsg");
	
		if(ErrorMsg!=""){
		 sap.m.MessageBox.warning(ErrorMsg, {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
		}


        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
        var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
        var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
        setIdleTime(sessionExpMsg, sessionExpTitle);

        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
        setInterval(function() {
            oBCPStats = getBCPStatus(bcpElement, "", "");
        }, 30000);
        var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
        this.getView().byId("shell3").getUser().setUsername(username);

	
    },

    onPSASelection: function() {

        var DateNw = new Date();
        oSTypeList = this.getView().byId("STypeCombo");
        var oSearch = this.getView().byId("SearchField");
        oSearch.setValue("");
        var STypeListTitle = oSTypeList.getSelectedItem().getTitle();
        var part = STypeListTitle.split(" - ");
        var storageType = part[0];
        var storageBin = part[1];

        var oTOTable = this.getView().byId("TODashboardTable");
        oTableDisplayModel = new sap.ui.model.xml.XMLModel();
        oTableDisplayModel.setSizeLimit(10000);

        oTableDisplayModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetTOStagingDashboardDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + encodeURIComponent(storageType) + "&Param.5=" + encodeURIComponent(storageBin) + "&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
	
        var outputTable = oTableDisplayModel.getProperty("/Rowset/Row/OutputTable");
        oStatusTableModel = new sap.ui.model.xml.XMLModel();
        oStatusTableModel.setData($.parseXML(outputTable));

        var MatPresent = oStatusTableModel.getProperty("/Rowset/Row/0/Material");
        var oGroupResetBtn = this.getView().byId("ResetID");
        var oColumn = oTOTable.getColumns()[0];
        if (MatPresent != "") {

            oColumn.setGrouped(true);
            oTOTable.setGroupBy(oColumn);
            oTOTable.setEnableGrouping(true);
            oGroupResetBtn.setIcon("sap-icon://filter");
        } else {
            oColumn.setGrouped(false);
            oTOTable.setEnableGrouping(false);
        }
        oTOTable.setModel(oStatusTableModel);
        var OutputChart = oTableDisplayModel.getProperty("/Rowset/Row/OutputChart");
        var ochartModel = new sap.ui.model.xml.XMLModel();
        ochartModel.setData($.parseXML(OutputChart));

        var oVizBarFrame = this.getView().byId("idVizBarFrame");
        oVizBarFrame.setModel(ochartModel);

        var oVizFrame = this.getView().byId("idVizPieFrame");
        oVizFrame.setModel(ochartModel);

        var ThresholdQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/ThresholdStock"));
        var ReqdQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/RequiredStock"));
        var AvlQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/AvailableStock"));
        var PutawayQuant = Number(oTableDisplayModel.getProperty("/Rowset/Row/PutawayStock"));

        this.getView().byId("ThresholdQuantID").setValue(ThresholdQuant);
        this.getView().byId("ReqdQuantID").setValue(ReqdQuant);
        this.getView().byId("AvlQuantID").setValue(AvlQuant);
        this.getView().byId("PutawayQuantID").setValue(PutawayQuant);

        var MaterialSpecificStock = oTableDisplayModel.getProperty("/Rowset/Row/OutputMaterialStock");
        MaterialSpecificStockModel = new sap.ui.model.xml.XMLModel();
        MaterialSpecificStockModel.setData($.parseXML(MaterialSpecificStock));
        var materialSelect = this.getView().byId("MaterialSelection");
        materialSelect.setModel(MaterialSpecificStockModel);
        var MaterialItems = materialSelect.getItems();
        materialSelect.setSelectedItems(MaterialItems);
	var ErrorMsg = oTableDisplayModel.getProperty("/Rowset/Row/OutputErrorMsg");
	if(ErrorMsg!=""){
		 sap.m.MessageBox.warning(ErrorMsg, {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
		}
    },
    doRefresh: function() {
        var DateNw = new Date();
        var oProcessOrderInput = this.getView().byId("ProcessOrder");
        var oProcessOrderCombo = this.getView().byId("ProcessOrderCombo");
        var POInputVisibility = oProcessOrderInput.getVisible();

        if (POInputVisibility == true) {
            orderFromURL = oProcessOrderInput.getValue();
        } else {
            orderFromURL = oProcessOrderCombo.getSelectedKey();
        }
       
        if (orderFromURL != "") {
            oSTypeList = this.getView().byId("STypeCombo");
            var oPSAListModel = new sap.ui.model.xml.XMLModel();
            oPSAListModel.setSizeLimit(10000);
            oPSAListModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetSupplyAreaTOStaging&Param.1=" + orderFromURL + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
            oSTypeList.setModel(oPSAListModel);
            oSTypeList.setSelectedItem(oSTypeList.getItems()[0]);
            this.onPSASelection();
        }
    },

    onSearch: function(oEvent) {
        var sQuery = oEvent.getSource().getValue();
        var oTOTable = this.getView().byId("TODashboardTable");
        var currentGrouping = oTOTable.getEnableGrouping();

        if (groupFlag == 1 && currentGrouping == true) {
            this.doResetSearch();
        }

        var oFilter1 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter2 = new sap.ui.model.Filter("MIITRNumber", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter3 = new sap.ui.model.Filter("ECCTRNumber", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter4 = new sap.ui.model.Filter("TRQuantity", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter5 = new sap.ui.model.Filter("TRPriority", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter6 = new sap.ui.model.Filter("TONumber", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter7 = new sap.ui.model.Filter("TOStatus", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter8 = new sap.ui.model.Filter("TOItem", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter9 = new sap.ui.model.Filter("TOQuantity", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter10 = new sap.ui.model.Filter("TOPriority", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter11 = new sap.ui.model.Filter("RequiredQuantity", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter12 = new sap.ui.model.Filter("RequestedOn", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter13 = new sap.ui.model.Filter("RequestedBy", sap.ui.model.FilterOperator.Contains, sQuery);
        var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13], false);

        oTOTable.getBinding("rows").filter(allFilter);

        if (groupFlag == 1 && sQuery == "") {
            this.doResetSearch();
        }

    },

    doReset: function() {

        var oTOTable = this.getView().byId("TODashboardTable");
        var oColumn = oTOTable.getColumns()[0];
        oColumn.setGrouped(true);

        var oGroupResetBtn = this.getView().byId("ResetID");

        if (oGroupResetBtn.getIcon() == "sap-icon://group-2") {
            oGroupResetBtn.setIcon("sap-icon://filter");
            oTOTable.setEnableGrouping(true);
            oColumn.setGrouped(true);
            oTOTable.setGroupBy(oColumn);
            groupFlag = 1;
        } else {
            oGroupResetBtn.setIcon("sap-icon://group-2");
            oTOTable.setEnableGrouping(false);
            oColumn.setGrouped(false);
            groupFlag = 0;
        }


    },
    doResetSearch: function() {

        var oTOTable = this.getView().byId("TODashboardTable");
        var oColumn = oTOTable.getColumns()[0];
        oColumn.setGrouped(true);

        var oGroupResetBtn = this.getView().byId("ResetID");

        if (oGroupResetBtn.getIcon() == "sap-icon://group-2") {
            oGroupResetBtn.setIcon("sap-icon://filter");
            oTOTable.setEnableGrouping(true);
            oColumn.setGrouped(true);
            oTOTable.setGroupBy(oColumn);

        } else {
            oGroupResetBtn.setIcon("sap-icon://group-2");
            oTOTable.setEnableGrouping(false);
            oColumn.setGrouped(false);

        }


    },

    GetUserInfo: function(oEvent) {
        var oIcon = oEvent.getSource();
        var obj = oEvent.getSource().getBindingContext().getPath();

        var RequestedOn = oStatusTableModel.getProperty(obj + "/RequestedOn");
        var RequestedUser = oStatusTableModel.getProperty(obj + "/RequestedBy");

        var dRequestOn = new sap.m.Input({
            editable: false,
            value: RequestedOn
        });
        var dRequestBy = new sap.m.Input({
            editable: false,
            value: RequestedUser
        });

        var oUserLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
            labelSpanL: 5,
            labelSpanM: 5,
            labelSpanS: 5,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 2,
            columnsM: 2,

        });

        var oUserList = new sap.ui.layout.form.Form({
            layout: oUserLayoutLabels,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_History_ReqBy"),
                            fields: [dRequestBy]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_History_ReqOn"),
                            fields: [dRequestOn]
                        })
                    ]
                })
            ]
        });
        var oPopover = new sap.m.Popover({
            title: getPropertyValue(oResourceModel, "TODashboard_UserInfo"),
            placement: "Vertical",
            contentWidth: "20%",
            content: [oUserList]

        });
        oPopover.openBy(oIcon);
    },

    onGetMaterialDetails: function(oEvent) {
        var oTile = oEvent.getSource();
       
        oMaterialList = new sap.m.Table({
            headerText: "",
            headerDesign: sap.m.ListHeaderDesign.Standard
        });
        var storageUnit = new sap.m.Column({
            hAlign: "Center",
        });
        oMaterialList.addColumn(storageUnit);
        var Material = new sap.m.Column({
            hAlign: "Center"
        });
        oMaterialList.addColumn(Material);

        var oPalletTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Center",
                    alignContent: "Center",
                    height: "100px",
                    items: [
                        new sap.m.Text({
                            text: "{Material}",
                            textAlign: "Center"
                        })
                    ]
                }),
                new sap.m.FlexBox({

                    items: [
                        new sap.suite.ui.microchart.ComparisonMicroChart({
                            data: [new sap.suite.ui.microchart.ComparisonMicroChartData({
                                    title: getPropertyValue(oResourceModel, "TODashboard_ThresholdQuantity"),
                                    value: "{=Number(${ThresholdQuant})}",
                                    color: "Critical"
                                }),
                                new sap.suite.ui.microchart.ComparisonMicroChartData({
                                    title: getPropertyValue(oResourceModel, "GI_Stage_AvlQuant"),
                                    value: "{=Number(${AvailableQuant})}",
                                    color: "Good"
                                }),
                                new sap.suite.ui.microchart.ComparisonMicroChartData({
                                    title: getPropertyValue(oResourceModel, "CustomGI_CL_6"),
                                    value: "{=Number(${RequiredQuant})}",
                                    color: "Error"
                                }),
                                new sap.suite.ui.microchart.ComparisonMicroChartData({
                                    title: getPropertyValue(oResourceModel, "TransferDisplay_colHeader_putaway"),
                                    value: "{=Number(${PutawayQuant})}",

                                })
                            ]
                        })

                    ]
                })
            ]
        });
        oMaterialList.bindItems("/Rowset/Row", oPalletTemplate);
        oMaterialList.setModel(MaterialSpecificStockModel);




        var oPopoverTile = new sap.m.Popover({
            title: "",
            placement: "Vertical",
            contentWidth: "25%",
            content: [oMaterialList]

        });
        oPopoverTile.openBy(oTile);
    },
    handleLineSelectionChange: function() {
        var DateNw = new Date();
        nodeID = this.getView().byId("resDes").getSelectedKey();
        range2 = this.getView().byId("range2").getValue();
        var oOrderModel = new sap.ui.model.xml.XMLModel();
        oOrderModel.setSizeLimit(10000);
        oOrderModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1=" + clientFromURL + "&Param.2=" + nodeID + "&Param.3=" + plantFromURL + "&Param.4=" + userLanguage + "&Param.5=" + range2 + "&Param.7=EPO&d=" + DateNw + "&Content-Type=text/xml"), "", false);

        var oProcessOrderCombo = this.getView().byId("ProcessOrderCombo");

        oProcessOrderCombo.setModel(oOrderModel);
        orderFromURL = oOrderModel.getProperty("/Rowset/Row/0/Order")
       
        oProcessOrderCombo.setSelectedKey(orderFromURL);
    },
    onMaterialChange: function() {
        var commaSeparatedMaterial;
        var matStatusTableModel;
        var oTOTable = this.getView().byId("TODashboardTable");
        var materialSelected = this.getView().byId("MaterialSelection").getSelectedKeys();
      
        materialSelected.forEach(function(input) {
            commaSeparatedMaterial = (commaSeparatedMaterial == "" || commaSeparatedMaterial == undefined) ? input : commaSeparatedMaterial + "," + input;
        });
        materialSelected = commaSeparatedMaterial;
  
        var matInputXML = oStatusTableModel.getXML();
      

        var jqxhr = $.post("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetSelectedMaterial_StagingTODetails&d=" + new Date() + "&Content-Type=text/xml", {
                "Param.1": materialSelected,
                "Param.2": matInputXML
            }, "xml")
            .done(
                function(resp) {

                    var response = $(resp).find('OutputXML').text();

                    var matStatusTableModel = new sap.ui.model.xml.XMLModel();
                    matStatusTableModel.setData($.parseXML(response));
                    oTOTable.setModel(matStatusTableModel);

                });
    },
	doExport: function() {
		var inpXML;
		var oRowCount = 0;
		var refresh = new Date();
		var oTODashboardTable = this.getView().byId("TODashboardTable");


		try {
			inpXML = oTODashboardTable.getModel().getXML();

			oRowCount = $(inpXML).find('Row').size();
		} catch (e) {

		}

		if (oRowCount > 0) {
			sap.ui.core.BusyIndicator.show(1);
			var Url = "/XMII/Runner?Transaction=MaterialHandling/CustomGI/Transaction/BLS_ExportTOStagingReport";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", Url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.responseType = "blob";
			xhr.onload = function(eventInfo) {
				if (this.status == 200) {
					var blob = this.response;
					saveAs(blob, "MaterialReplinishmentReport.xls");
				}
			};
			xhr.send("I_InputXML=" + encodeURIComponent(inpXML) + "&cache=" + refresh + "&OutputParameter=O_OutputXML");
			xhr.onloadend = function() {
				sap.ui.core.BusyIndicator.hide();
			};
		}
	},
	onSearchSType: function(oEvent) {
        var sQuery = oEvent.getSource().getValue();
        var oPSA = this.getView().byId("STypeCombo");
        
        var oFilter1 = new sap.ui.model.Filter("STORAGE_TYPE", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter2 = new sap.ui.model.Filter("STORAGE_BIN", sap.ui.model.FilterOperator.Contains, sQuery);     
        var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2], false);

        oPSA.getBinding("items").filter(allFilter);

    },
    goHome: function() {},

    getDateDisplayFormat: function(date) {

        if (date === "0000-00-00") {
            return date;
        } else {
            return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", "YES");
        }
    }

});