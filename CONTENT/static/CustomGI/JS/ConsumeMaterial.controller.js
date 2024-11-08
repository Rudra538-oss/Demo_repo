var oResourceModel, oBCPStatusModel, oGIFlag, isValidUOM;
var userLanguage, oControllerThis;
var huFromURL, nodeFromURL;
var orderFromURL, matFromURL, desFromUR, GISledMsgEnableL;
var ord, plantFromURL, mvtType, mvt_type_reverse;
var oSelectedContext, oDisplayTable;
var fname, lname, uom;
var dateNow, client;
var res, resFromURL, huFromURL;
var clientFromURL, target, produced;
var selectedKey, oDialog1;
var su, wh, sLoc, postDate, whNo;
var mat, matDes;
var batchList, batch;
var stock, sCat, sled, formattedStock;
var stockFromURL, shelfFromURL;
var consumedQuant, requiredQuant;
var datenow, mvt_type, headerFromURL;
var uomFromURL, batchFromURL, conFromURL, percentQuant, reqFromURL;
var reqUOMFromURL, conUOMFromURL, CRUom;
var a, b, pDateFromURL;
var diffDays, day1, batchNo;
var sCatFromURL, flag, slocFromURL, GIToastMsgEnable;
var sTypeFromURL, sBinFromURL, whFromURL;
var sled1, oDialog1;
var consumeRequestFlag = 0;
var timeOut;
var outputStatus = 0;
var isOpenCnf = false;
var bcpElement, headerMat;
var postMonth, postYear, currentMonth, currentYear;
var RSPOSFromURL, qt;
var qty, Qty1, AltUom, stockFromURL1;
var prodDate, prodDate1, ProdDateFromURL, GITitle;
var NonBatchManagedFlag, SLEDFormattedDate;
var EPOrder, POrder = 0;
var AssignedPO;

jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.controller("JS.ConsumeMaterial", {

    /////////////////////////////////////////////////////////////////////////// Timeout Supporting Functions //////////////////////////////////////////////////////////////////////

    reset: function() {
        window.clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            sap.ui.controller("JS.ConsumeMaterial").showTimeoutMsg()
        }, 600000);
    },

    showTimeoutMsg: function() {

        if (isOpenCnf == false) {
            isOpenCnf = true;

            sap.m.MessageBox.show(
                getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG"), {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE"),
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function(oAction) {
                        if (oAction === sap.m.MessageBox.Action.NO) {
                            window.location.reload();
                        } else {
                            isOpenCnf = false;
                            sap.ui.controller("JS.ConsumeMaterial").reset();
                        }
                    }
                });
        }
    },
    /////////////////////////////////////////////////////////////////////////// End of  Timeout Supporting Function///////////////////////////////////////////////////////////

    onInit: function() {

        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////

        window.onload = setTimeout(function() {
            sap.ui.controller("JS.Reversal").showTimeoutMsg()
        }, 600000);

        window.onmousemove = function() {
            sap.ui.controller("JS.ConsumeMaterial").reset();
        };
        window.onkeypress = function() {
            sap.ui.controller("JS.ConsumeMaterial").reset();
        };
        window.onclick = function() {
            sap.ui.controller("JS.ConsumeMaterial").reset();
        };

        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

        // client="103";
        var batch_sled;
        mvt_type = "261";
        oControllerThis = this;
        jQuery.sap.require("sap.ui.commons.MessageBox");
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        var DateNw = new Date();

        sFlag = "0";
        bcpElement = this.getView().byId("bcpStatus");
        oBCPStats = getBCPStatus(bcpElement, "", "");

        var oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var refresh = new Date();
        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
        var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,EPO_AlreadyAssigned,NPM_COMMON_Message,GI_Stage_Success,EPO_UI_ERROR_MSG,CustomGI_SLEDMsg,CustomGI_GI_23,BCP_COMMON_MSG_QUANTITY,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Goods_Issue,CustomGI_alert_13,CustomGI_GIR_13,CustomGI_alert_11,CustomGI_alert_12,TransferDisplay_Message,CustomGR_alert_21,CustomGR_alert_1,CustomGR_alert_4,CustomGI_alert_1,CustomGI_alert_2,CustomGI_alert_7,CustomGI_alert_8,CustomGR_alert_3,NPDashboard_Ok,NPDashboard_Cancel,CustomGI_alert_3,NPDashboard_Error,NPDashboard_Success,NPDashboard_Warning,CustomGI_alert_10,CustomGI_alert_14,CustomGR_alert_26,CustomGR_alert_27,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close,NPM_COMMON_UOM4, CustomGR_alert_5";
        oResourceModel = new sap.ui.model.xml.XMLModel();
        oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        /* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties?cache="+refresh});
        this.getView().byId("PanelTitle").setModel(oResourceModel, "panel");
        this.getView().byId("Form1").setModel(oResourceModel, "label");
        this.getView().byId("Form2").setModel(oResourceModel, "label");
        this.getView().byId("ConsumeID").setModel(oResourceModel, "button");
        this.getView().byId("ReverseID").setModel(oResourceModel, "button"); */
        //document.title=getPropertyValue(oResourceModel, "NPDashboard_Goods_Issue");
        var page = this.getView().byId("pageID");
        var identifier = "GI1>NPDashboard_Back,GI2>InBndMatRecpt_title_BCP,GI18>Custom_GI_FinalIssue,ConsGIList24>NPDashboard_Line,GI20>GI_Stage_ConsumReq,ConsList24>NPDashboard_Line,GI3>CustomGI_CM_1,GI4>CustomGR_GRR_2,GI5>CustomGI_CM_3,GI6>CustomGI_CM_4,GI7>CustomGI_CM_5,GI8>CustomGI_CM_6,GI9>CustomGI_CM_7,GI10>CustomGI_CM_14,GI11>CustomGI_CM_15,GI12>CustomGI_CM_8,GI13>CustomGI_CM_9,GI14>CustomGI_CM_10,GI15>CustomGI_CM_11,GI16>CustomGI_CM_12,GI17>CustomGR_GR_17,CompList13>CustomGI_CL_12,GMReport21>GMReport_ECCGoodsMvmt";
        localize(page, identifier, userLanguage);
        var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "yyyy-MM-dd"
        });
        datenow = dateFormat.format(new Date(DateNw));
        clientFromURL = getURLParameter("clientFromURL");
        plantFromURL = getURLParameter("plantFromURL");
        var batchCons = getURLParameter("batchFromURL");

        resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
        GITitle = getPropertyValue(oResourceModel, "CustomGI_GI_23");
        document.title = GITitle + "-" + resFromURL;
        orderFromURL = getURLParameter("orderFromURL");
        matFromURL = getURLParameter("matFromURL");
        desFromURL = decodeURIComponent(getURLParameter("desFromURL"));
        nodeFromURL = decodeURIComponent(getURLParameter("nodeFromURL"));
        huFromURL = decodeURIComponent(getURLParameter("huFromURL"));
        whFromURL = getURLParameter("whFromURL");
        conFromURL = getURLParameter("conFromURL");
        reqFromURL = getURLParameter("reqFromURL");
        reqUOMFromURL = getURLParameter("reqUOMFromURL");
        conUOMFromURL = getURLParameter("conUOMFromURL");
        RSPOSFromURL = getURLParameter("RSPOSFromURL");
        stockFromURL = getURLParameter("stockFromURL");
        headerFromURL = decodeURIComponent(getURLParameter("headerFromURL"));
        uomFromURL = getURLParameter("uomFromURL");
        ProdDateFromURL = getURLParameter("ProdDateFromURL");
        pDateFromURL = getURLParameter("pDateFromURL");
        sTypeFromURL = getURLParameter("sTypeFromURL");
        sBinFromURL = getURLParameter("sBinFromURL");
        slocFromURL = getURLParameter("slocFromURL");
       
        day1 = getURLParameter("day1");
        fname = document.getElementById("firstname").value;
        lname = document.getElementById("lastname").value;
        loginID = document.getElementById("login").value;
        workstation = document.getElementById("machine").value;
        this.getView().byId("PostDate").setDateValue(DateNw);
        this.getView().byId("ProcessOrder").setValue(orderFromURL);
        this.getView().byId("Material").setValue(matFromURL);
        this.getView().byId("MatDes").setValue(desFromURL);

        this.getView().byId("resDes").setValue(resFromURL);
        consumedQuant = formatQuantity(getURLParameter("conFromURL"), "FORMAT");

        var consumedUOM = getURLParameter("conUOMFromURL");
        var consumedQuantUOM = consumedQuant + " " + consumedUOM;
        this.getView().byId("conQuant").setValue(consumedQuantUOM);
        requiredQuant = formatQuantity(getURLParameter("reqFromURL"), "FORMAT");
        var requiredUOM = getURLParameter("reqUOMFromURL");
        var requiredQuantUOM = requiredQuant + " " + requiredUOM;
        this.getView().byId("reqQuant").setValue(requiredQuantUOM);

        percentQuant = (conFromURL / reqFromURL) * 100;
        this.getView().byId("pInd").setPercentValue(percentQuant);
        this.getView().byId("pInd").setDisplayValue(consumedQuant + " of " + requiredQuant + " " + consumedUOM);

        if (percentQuant > 100) {
            this.getView().byId("pInd").setPercentValue(100);
            this.getView().byId("pInd").setState("Error");

        }


        ord = orderFromURL;
        var processOrder = getPO(ord);
        ord = processOrder[0];

        POrder = processOrder[1];

        nonBatchManagedModel = new sap.ui.model.xml.XMLModel();
        nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        NonBatchManagedFlag = nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');

        var prodUomModel = new sap.ui.model.xml.XMLModel();
        prodUomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + userLanguage + "&Param.4=GI&Param.5=" + RSPOSFromURL + "&Param.6=" + ord + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var prodUom = this.getView().byId("uom");
        var prodUomitemline = new sap.ui.core.ListItem();
        prodUomitemline.bindProperty("text", "UOMDESC");
        prodUomitemline.bindProperty("key", "UOM");
        prodUom.bindItems("/Rowset/Row", prodUomitemline);
        prodUom.setModel(prodUomModel);

        CRUom = prodUomModel.getProperty("/Rowset/Row/0/UOM");console.log(CRUom);
        prodUom.setSelectedKey(CRUom);
        var DateNw = new Date();
        var clearNow = new Date();
        oGIFlag = new sap.ui.model.xml.XMLModel();
        oGIFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 1 + "&d=" + DateNw + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
        GISledMsgEnable = oGIFlag.getProperty("/Rowset/Row/GI_Sled_Msg");

/*****************************************************************************************************************
        //////////////////////////Consume and Request Button To use in FUTURE///////////////////////////////////////
        var oGIStageNodeModel = new sap.ui.model.xml.XMLModel();

        oGIStageNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIStageEnable = oGIStageNodeModel.getProperty('/Rowset/Row/Output');
      
        if ((GIStageEnable == "Plant") || GIStageEnable.indexOf(nodeFromURL) != "-1") {
            this.getView().byId("ConsumeStageID").setVisible(true);

        } else {
            this.getView().byId("ConsumeStageID").setVisible(false);

        }

        ////////////////////////////////////////////////////////////////////////////////
********************************************************************************************************************/

        if (huFromURL != "") {
            this.getView().byId("batchNo").setVisible(true);
            this.getView().byId("sscc").setVisible(true);
            this.getView().byId("ssccLabel").setVisible(true);
            stockFromURL = getURLParameter("stockFromURL");
            //stockFromURL= formatQuantity(stockFromURL, "PARSE");
            shelfFromURL = getURLParameter("shelfFromURL");
            uomFromURL = getURLParameter("uomFromURL");
            prodDate = ProdDateFromURL;
            batchFromURL = getURLParameter("batchFromURL");
            var consumedDetail = new sap.ui.model.xml.XMLModel();
            consumedDetail.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeFromURL + "&Param.4=" + POrder + "&Param.5=" + matFromURL + "&Param.6=" + batchFromURL + "&Param.7=" + huFromURL + "&Param.8=" + RSPOSFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            conFromURL = consumedDetail.getProperty("/Rowset/Row/QTY_IN_REPORT_UOM");
            conFromURL = (Math.round(conFromURL * 1000) / 1000).toFixed(3);

            //conFromURL=Math.round(conFromURL*1000)/1000;

            //this.getView().byId("conQuant").setValue((formatQuantity(conFromURL, "FORMAT"))+" "+getURLParameter("conUOMFromURL"));
            //var formattedconQuant = formatQuantity(conFromURL, "FORMAT");
            //this.getView().byId("conQuant").setValue(formattedconQuant +" "+conUOMFromURL);

            consumedQuant = formatQuantity(conFromURL, "FORMAT");


            this.getView().byId("conQuant").setValue(consumedQuant + " " + getURLParameter("conUOMFromURL"));


            percentQuant = (conFromURL / reqFromURL) * 100;
            this.getView().byId("pInd").setPercentValue(percentQuant);
            this.getView().byId("pInd").setDisplayValue(consumedQuant + " of " + requiredQuant + " " + consumedUOM);
            if (percentQuant > 100) {
                this.getView().byId("pInd").setPercentValue(100);
                this.getView().byId("pInd").setState("Error");
            } else {
                this.getView().byId("pInd").setState("Success");
            }

            var formattedStock = formatQuantity(stockFromURL, "FORMAT");
            this.getView().byId("stock").setValue(formattedStock);


            sCatFromURL = getURLParameter("sCatFromURL");
            batch = getURLParameter("batchFromURL");
            //batch_sled=batch+" "+oControllerThis.getDateDisplayFormat(shelfFromURL);
            if (batch == "" || batch == undefined || batch == "---" || batch == "null") {
                batch_sled = "";
            } else {
                batch_sled = batch + " " + oControllerThis.getDateDisplayFormat(shelfFromURL);
            }
            this.getView().byId("batchNo").setValue(batch_sled);

            this.getView().byId("shelfID").setValue(shelfFromURL);
            this.getView().byId("sscc").setValue(decodeURIComponent(getURLParameter("huFromURL")));
            var date1 = new Date(shelfFromURL);
            var date2 = new Date(datenow);


            var date3 = date1.toString();

            var showSled = date3.split(" ")[1] + " " + date3.split(" ")[2] + "," + date3.split(" ")[3];

            var timeDiff = (date1.getTime() - date2.getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            /*********************************************VSTS 87516******************************************************/
            if (NonBatchManagedFlag == "X") {

                if (diffDays < 0) {

                    this.getView().byId("shelfDays").setValue(getPropertyValue(oResourceModel, "CustomGI_alert_13"));
                } else {
                    this.getView().byId("shelfDays").setValue(diffDays + " " + getPropertyValue(oResourceModel, "CustomGI_GIR_13"));
                }
            } else {

                this.getView().byId("shelfDays").setValue("");
                this.getView().byId("shelfID").setValue("");
            }
            /*********************************************END*****************************************************/


            sled = shelfFromURL;
            var uom1 = this.getView().byId("uom");
            //uom1.setSelectedKey(uomFromURL);

        } else {
            this.getView().byId("batchCombo").setVisible(true);

            var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><MaterialDetailsInput><materialNumber>" + matFromURL + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><warehouseNumber>" + whFromURL + "</warehouseNumber><orderNumber>" + ord + "</orderNumber><EPorder>" + POrder + "</EPorder><isReversal/><storageBin/><storageType/><storageLocation>" + slocFromURL + "</storageLocation><RSPOS>" + RSPOSFromURL + "</RSPOS><productionSupplyArea/></MaterialDetailsInput>"

            batchList = new sap.ui.model.xml.XMLModel();
            batchList.setSizeLimit(10000);
            batchList.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_ToGetBatchList&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var batchlistXML = batchList.getXML();

            success = batchList.getProperty('/Rowset/Row/status');
            sled = batchList.getProperty('/Rowset/Row/shelfLifeDate');
            uomFromURL = batchList.getProperty('/Rowset/Row/BaseUOM');
            prodDate = batchList.getProperty('/Rowset/Row/ProductionDate');
            SLEDFormattedDate = batchList.getProperty('/Rowset/Row/SLEDFormattedDate');
            Qty1 = batchList.getProperty('/Rowset/Row/Quantity');
            var PreDefinedBatchFlag = batchList.getProperty('/Rowset/Row/PreDefinedBatchFalg');



            if (success == "E") {
                var message = batchList.getProperty('/Rowset/Row/message');

                var batchDetail = new sap.ui.model.xml.XMLModel();
                batchDetail.setSizeLimit(10000);
                batchDetail.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeFromURL + "&Param.4=" + POrder + "&Param.5=" + matFromURL + "&Param.6=&Param.7=&Param.8=" + RSPOSFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                // sled = batchDetail.getProperty("/Rowset/Row/SLED");
                var qt = batchDetail.getProperty("/Rowset/Row/QTY_IN_REPORT_UOM");



                if (Number(qt) > 0 && (oResourceModel.getProperty("TO_MSG3") != message)) {
                    alert(getPropertyValue(oResourceModel, "CustomGI_alert_11"));
                    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ReverseMaterial.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&matFromURL=" + matFromURL + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&huFromURL=" + encodeURIComponent(huFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL) + "&reqFromURL=" + reqFromURL + "&reqUOMFromURL=" + reqUOMFromURL + "&conFromURL=" + conFromURL + "&conUOMFromURL=" + conUOMFromURL + "&whFromURL=" + whFromURL + "&clientFromURL=" + clientFromURL + "&sTypeFromURL=" + sTypeFromURL + "&sBinFromURL=" + sBinFromURL + "&slocFromURL=" + slocFromURL + "&plantFromURL=" + plantFromURL + "&RSPOSFromURL=" + RSPOSFromURL), "_self");
                } else {
                    alert(message);

                    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&pDateFromURL=" + pDateFromURL + "&plantFromURL=" + plantFromURL + "&matFromURL=" + matFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
                }
            } else {

                var selectBatch = this.getView().byId("batchCombo");
                selectBatch.setModel(batchList);

                //For Predefined Batch
                if (PreDefinedBatchFlag == "PreDefinedBatchExist") {

                    batch = batchList.getProperty("/Rowset/Row/batchNumber");
                    selectBatch.setSelectedKey(batch);
                    selectBatch.setEnabled(false);
                    this.getView().byId("shelfID").setValue(sled);


                    stockFromURL = batchList.getProperty("/Rowset/Row/Quantity");


                    //stockFromURL=formatQuantity(stockFromURL, "PARSE");
                    sCat = batchList.getProperty("/Rowset/Row/StockCategory");
                    var date1 = new Date(sled);
                    var date2 = new Date(datenow);
                    var date3 = date1.toString();

                    var showSled = date3.split(" ")[1] + " " + date3.split(" ")[2] + "," + date3.split(" ")[3];

                    var timeDiff = (date1.getTime() - date2.getTime());

                    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (diffDays < 0) {

                        this.getView().byId("shelfDays").setValue(getPropertyValue(oResourceModel, "CustomGI_alert_13"));
                    } else {
                        this.getView().byId("shelfDays").setValue(diffDays + " " + getPropertyValue(oResourceModel, "CustomGI_GIR_13"));
                    }
                    var formattedStock = formatQuantity(stockFromURL, "FORMAT");
                    this.getView().byId("stock").setValue(formattedStock);


                }

            }

            var uomModel = new sap.ui.model.xml.XMLModel();
            uomModel.setSizeLimit(10000);
            uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetMaterialDetailsByOrderMat&Param.1=" + ord + "&Param.2=" + matFromURL + "&Param.3=" + RSPOSFromURL + "&cache=" + DateNw + "&Content-Type=text/xml"), "", false);
            var uom = this.getView().byId("uom");
            var uom1 = uomModel.getProperty('/Rowset/Row/MEINS');
            uom.setSelectedKey(uom1);

            if (NonBatchManagedFlag != "X") {
                this.getBatch();
            }

        }
        /////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
        var oModelDF = new sap.ui.model.xml.XMLModel();
        oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml", "", false);
        var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");

        this.getView().byId("shelfID").setDisplayFormat(oDisplayFormat);
        this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);


    },


    combineBatchSled: function(batchNumber, shelfLifeDate) {
        var combined_batch = batchNumber + " " + oControllerThis.getDateDisplayFormat(shelfLifeDate);
        return combined_batch;
    },

    getBatch: function() {
        var DateNw = new Date();
        var batchID = this.getView().byId("batchCombo");



        if (NonBatchManagedFlag == "X") {

            batchID.getSelectedKey();
            batch = batchID.getSelectedKey();
            var con = batchID.indexOfItem(batchID.getSelectedItem());
            sled = batchList.getProperty("/Rowset/Row/" + con + "/shelfLifeDate");

            this.getView().byId("shelfID").setValue(sled);
            stockFromURL = batchList.getProperty("/Rowset/Row/" + con + "/Quantity");
            sCat = batchList.getProperty("/Rowset/Row/StockCategory");
            var date1 = new Date(sled);
            var date2 = new Date(datenow);
            var date3 = date1.toString();

            var showSled = date3.split(" ")[1] + " " + date3.split(" ")[2] + "," + date3.split(" ")[3];

            var timeDiff = (date1.getTime() - date2.getTime());

            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            /********************************************************VSTS 87516************************************************************/
            if (diffDays < 0) {

                this.getView().byId("shelfDays").setValue(getPropertyValue(oResourceModel, "CustomGI_alert_13"));
            } else {
                this.getView().byId("shelfDays").setValue(diffDays + " " + getPropertyValue(oResourceModel, "CustomGI_GIR_13"));
            }

            if (GISledMsgEnable == 1) {
                var Shortest_Sled = batchList.getProperty("/Rowset/Row/0/shelfLifeDate");
                var Selected_Sled = this.getView().byId("shelfID").getValue();

                if (Selected_Sled != Shortest_Sled) {
                    sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGI_SLEDMsg"), {
                        title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                    });

                }
            }

        } else {
            batchID.setEnabled(false);
            batch = batchList.getProperty("/Rowset/Row/batchNumber");
            sled = batchList.getProperty("/Rowset/Row/shelfLifeDate");

            //this.getView().byId("shelfID").setValue(sled);
            stockFromURL = batchList.getProperty("/Rowset/Row/Quantity");
            sCat = batchList.getProperty("/Rowset/Row/StockCategory");
            this.getView().byId("shelfDays").setValue("");
            this.getView().byId("shelfID").setValue("");
        }

        /*******************************************************END****************************************************************/

        var formattedStock = formatQuantity(stockFromURL, "FORMAT");
        this.getView().byId("stock").setValue(formattedStock);
        var Qty3 = this.getView().byId("stock").getValue();

        stockFromURL = Qty3;

        AltUom = this.getView().byId("uom").getSelectedKey();
        this.getUom();


    },
    onAfterRendering: function() {
        setInterval(function() {
            oBCPStats = getBCPStatus(bcpElement, "", "");
        }, 30000);


        var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
        this.getView().byId("shell3").getUser().setUsername(username);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stockFromURL1 = formatQuantity(stockFromURL, "PARSE");

        if (huFromURL != "" && stockFromURL1 != "" && uomFromURL != "") {
            var StockQty1 = new sap.ui.model.xml.XMLModel();
            StockQty1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + stockFromURL + "&Param.4=" + userLanguage + "&Param.5=" + uomFromURL + "&Param.6=" + CRUom + "&Content-Type=text/xml"), "", false);
            var ConvertedQty1 = StockQty1.getProperty("/Rowset/Row/O_ConvertedQuantity");
            var oErrorMessage1 = StockQty1.getProperty("/Rowset/Row/O_ErrorMessage");
            var oType1 = StockQty1.getProperty("/Rowset/Row/O_Type");

            ConvertedQty1 = formatQuantity(ConvertedQty1, "FORMAT");

            if (oType1 == "E") {
                jQuery.sap.require("sap.m.MessageBox");

                sap.m.MessageBox.error(oErrorMessage1, {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
                this.getView().byId("stock").setValue("");
                //sap.ui.commons.MessageBox.alert(+oErrorMessage1,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
            } else {

                this.getView().byId("stock").setValue(ConvertedQty1);

            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    doGI: function() {

        var DateNw = new Date();
        if (POrder.indexOf("E_") == "0") {

            var EPOrdModel = new sap.ui.model.xml.XMLModel();
            EPOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/MDO_GetSourcePO&Param.1=" + POrder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            AssignedPO = EPOrdModel.getProperty('/Rowset/Row/AssignedPO');

        }

        if ((AssignedPO != "---") && POrder.indexOf("E") != "-1") {
            sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "EPO_AlreadyAssigned"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
            });
            //sap.m.MessageBox.show(getPropertyValue(oResourceModel,"EPO_AlreadyAssigned"),sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else {
            currentMonth = DateNw.getMonth();
            currentYear = DateNw.getFullYear();
            var switch1 = this.getView().byId("switch").getState();
            if (switch1 == false) {
                flag = "OFF";
            } else {
                flag = "ON";
            }
            var tomorrow = new Date(DateNw.getTime() + (1000 * 60 * 60 * 24));

            var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            dateNow = dateFormat.format(new Date(DateNw));
            var refresh = dateFormat.format(new Date(DateNw));
            dateNow = dateNow + "T00:00:00Z";
            var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "'T'HH:mm:ss'Z'"
            });
            var timeNow = timeFormat.format(new Date(DateNw));

            var uom = this.getView().byId("uom").getSelectedKey();
	isValidUOM= false;
	if (uom=="" || uom==null || uom==undefined || uom== "undefined" || uom == "null") {
		uom=oControllerThis.getView().byId("uom").getValue();
		if(uom!="") {isValidUOM=true;}
	} else{isValidUOM=true;}
            qty = this.getView().byId("stock").getValue();
            qty = formatQuantity(qty, "PARSE");
            postDate = this.getView().byId("PostDate").getValue();

            var pDate = postDate;
            postMonth = new Date(postDate);
            postYear = new Date(postDate);

            postDate = postDate + timeNow;
            // postDate=postDate+"T00:00:00Z";
            sled1 = sled + "T00:00:00Z";

            postMonth = postMonth.getMonth();
            postYear = postYear.getFullYear();

            nonBatchManagedModel = new sap.ui.model.xml.XMLModel();
            nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            NonBatchManagedFlag = nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');


            if (pDate == "") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_21"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_21"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if (pDate > refresh) {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_1"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_1"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if ((qty == "" || qty <= 0) && flag == "OFF") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if ((qty == "" || qty < 0) && flag == "ON") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if (isNaN(qty) && flag == "OFF") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if (isNaN(qty) && flag == "ON") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_4"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if (!isValidUOM){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_5"), {
			title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
		});
	} else if (huFromURL == "" && (batch == "" || batch == undefined) && NonBatchManagedFlag == "X") {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGI_alert_1"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_1"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            }

            /* else if(postDate<pDateFromURL){
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_3"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } */
            else if (diffDays < 0 && NonBatchManagedFlag == "X") {
                // sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_2"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                var dialog = new sap.m.Dialog({
                    id: 'confirmdialog',
                    title: getPropertyValue(oResourceModel, "CustomGI_alert_8"),
                    icon: 'sap-icon://question-mark',
                    draggable: true,
                    type: 'Message',
                    content: [new sap.m.Text({
                        text: getPropertyValue(oResourceModel, "CustomGI_alert_7")
                    })],
                    beginButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                        press: function() {

                            oControllerThis.closePeriod();
                            dialog.close();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
                        press: function() {
                            dialog.close();

                        }
                    }),
                    afterClose: function() {
                        dialog.destroy();
                    }
                });

                dialog.open();
            } else {

                oControllerThis.closePeriod();


            }
        }
    },

    closePeriod: function() {

        if (((postMonth < currentMonth && postYear == currentYear) || (postMonth > currentMonth && postYear < currentYear)) && oBCPStats != 1) {
            var dialog = new sap.m.Dialog({
                id: 'closeIcon',
                title: getPropertyValue(oResourceModel, "CustomGI_alert_8"),
                draggable: true,
                icon: 'sap-icon://question-mark',
                type: 'Message',
                content: [new sap.m.Text({
                    text: getPropertyValue(oResourceModel, "CustomGI_alert_14")
                })],
                beginButton: new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                    press: function() {
                        alert();
                        oControllerThis.doConsume();
                        dialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
                    press: function() {
                        dialog.close();

                    }
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();
        } else {
            oControllerThis.doConsume();
        }
    },


    doConsume: function() {
        var DateNw = new Date();

        var clearNow = new Date();
        var uom = this.getView().byId("uom").getSelectedKey();
        if (uom=="" || uom==null || uom==undefined || uom== "undefined" || uom == "null") {
	uom=oControllerThis.getView().byId("uom").getValue();
        }
        qty = this.getView().byId("stock").getValue();
        qty = formatQuantity(qty, "PARSE");
        prodDate1 = prodDate + "T00:00:00Z";
        var finalIssue = this.getView().byId("idFinalIssue").getSelected();
        stockFromURL = formatQuantity(stockFromURL, "PARSE");


        var GIToastMsgEnable = oGIFlag.getProperty("/Rowset/Row/GI_Msg");

        var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>" +
            "<client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeFromURL + "</nodeID><orderNumber>" + ord + "</orderNumber><EPorder>" + orderFromURL + "</EPorder><RSPOS>" + RSPOSFromURL + "</RSPOS><warehouseNumber>" + whFromURL + "</warehouseNumber><userId>" + loginID + "</userId>" +
            "<goodsMovementItems><client>" + clientFromURL + "</client><goodsMovementItem><postingDate>" + postDate + "</postingDate><huNumber>" + huFromURL + "</huNumber><materialNumber>" + matFromURL + "</materialNumber>" +
            "<quantityInReportUom>" + qty + "</quantityInReportUom><availableStock>" + stockFromURL + "</availableStock><reportUom>" + uom + "</reportUom><flag>" + flag + "</flag><reservationNumber></reservationNumber><recordType/><psaNumber/>" +
            "<reservationItemNumber></reservationItemNumber><batchNumber>" + batch + "</batchNumber><movementType>" + mvt_type + "</movementType><productionDate>" + prodDate1 + "</productionDate><shelfLifeDate>" + sled1 + "</shelfLifeDate>" +
            "<storageType>" + sTypeFromURL + "</storageType><storageBin>" + sBinFromURL + "</storageBin><finalIssue>" + finalIssue + "</finalIssue><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>" +
            "<goodsMovementPostingMessages><client>" + clientFromURL + "</client><baseuom>" + uomFromURL + "</baseuom><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>" +
            "</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>";


        var GIModel = new sap.ui.model.xml.XMLModel();
        GIModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });
        GIModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1=" + InputXMLInStringFormat + "&Content-Type=text/xml"), true, "POST");
        GIModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var status = GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/status');
            /*var oGIFlag = new sap.ui.model.xml.XMLModel();
            oGIFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 1 + "&d=" + DateNw + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
            */
            GIToastMsgEnable = oGIFlag.getProperty("/Rowset/Row/GI_Msg");

            if (status == "S") {

                var mes = GIModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber');

                if (consumeRequestFlag == 1) {
                    var oGIStageStartModel = new sap.ui.model.xml.XMLModel();


                    var GIStageInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GIStageInput><Plant>" + plantFromURL + "</Plant><Client>" + clientFromURL + "</Client><materialNumber>" + matFromURL + "</materialNumber><Order>" + orderFromURL + "</Order><SLOC>" + slocFromURL + "</SLOC><Warehouse>" + whFromURL + "</Warehouse><Quantity>" + qty + "</Quantity><UOM>" + uom + "</UOM><language>" + userLanguage + "</language><SType>" + sTypeFromURL + "</SType><SBin>" + sBinFromURL + "</SBin></GIStageInput>"
                    oGIStageStartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_MaterialStagingMapping_GI&Param.1=" + GIStageInputXML + "&d=" + DateNw + "&Content-Type=text/xml"), "", false, "POST");


                    outputStatus = oGIStageStartModel.getProperty('/StatusMsg');
                    if (outputStatus == "SUCCESS") {

                        mes = mes + ".\n " + getPropertyValue(oResourceModel, "GI_Stage_Success");
                    } else {
                        mes = mes + ".\n " + outputStatus;
                    }
                }

                if (GIToastMsgEnable == 1) {
                    var GIConsume = "True";
                    var DocuNoFromURL = mes;
                    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&pDateFromURL=" + pDateFromURL + "&plantFromURL=" + plantFromURL + "&matFromURL=" + matFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&DocuNoFromURL=" + DocuNoFromURL + "&GIConsume=" + GIConsume + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");

                } else {
                    oDialog1 = new sap.m.Dialog({
                        id: 'successdialog',
                        title: (outputStatus == "0" || outputStatus == "SUCCESS" ? getPropertyValue(oResourceModel, "NPDashboard_Success") : getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")),
                        icon: (outputStatus == "0" || outputStatus == "SUCCESS" ? 'sap-icon://message-success' : 'sap-icon://message-error'),
                        draggable: true,
                        content: [new sap.m.Text({
                            text: getPropertyValue(oResourceModel, "CustomGI_alert_3") + " " + mes
                        })],
                        buttons: [

                            new sap.m.Button({
                                text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                                press: oControllerThis.okDialogFn
                            })
                        ],

                    });
		
		if(outputStatus == "0" || outputStatus == "SUCCESS"){
		oDialog1.addStyleClass("greenIcon");
		}else{
		oDialog1.addStyleClass("redIcon");
		}
                    oDialog1.setContentWidth("250px");
                    oDialog1.setContentHeight("80px");
                    oDialog1.open();
                    //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_3") + " " + GIModel.getProperty('/goodsMovementItems/goodsMovementItem/documentNumber'), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));

                }
                oControllerThis.getView().byId("batchNo").setValue("");
                oControllerThis.getView().byId("batchCombo").setValue("");
                oControllerThis.getView().byId("stock").setValue("");

                oControllerThis.getView().byId("shelfID").setValue("");
                oControllerThis.getView().byId("PostDate").setDateValue(DateNw);

            } else {
                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Error") + " " + GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'), {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPDashboard_Error") + " " + GIModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            }
        });
    },

    okDialogFn: function(event) {
        window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&pDateFromURL=" + pDateFromURL + "&plantFromURL=" + plantFromURL + "&matFromURL=" + matFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");

    },
    doGIStage: function() {
        consumeRequestFlag = 1;
        this.doGI();
    },
    doReport: function() {

        window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/GIReport.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
    },
    doReverse: function() {
        var uom = this.getView().byId("uom").getSelectedKey();
        qty = this.getView().byId("stock").getValue();
        qty = formatQuantity(qty, "PARSE");

        if (huFromURL == "") {
            window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ReverseMaterial.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&matFromURL=" + matFromURL + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&huFromURL=" + encodeURIComponent(huFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL) + "&reqFromURL=" + reqFromURL + "&reqUOMFromURL=" + reqUOMFromURL + "&conFromURL=" + conFromURL + "&conUOMFromURL=" + conUOMFromURL + "&whFromURL=" + whFromURL + "&clientFromURL=" + clientFromURL + "&sTypeFromURL=" + sTypeFromURL + "&sBinFromURL=" + sBinFromURL + "&slocFromURL=" + slocFromURL + "&plantFromURL=" + plantFromURL + "&RSPOSFromURL=" + RSPOSFromURL), "_self");
        } else {
            batch = batchFromURL;

            if (conFromURL != 0) {
                window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ReverseMaterial.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&matFromURL=" + matFromURL + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(desFromURL) + "&huFromURL=" + encodeURIComponent(huFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL) + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&whFromURL=" + whFromURL + "&reqFromURL=" + reqFromURL + "&reqUOMFromURL=" + reqUOMFromURL + "&conFromURL=" + conFromURL + "&conUOMFromURL=" + conUOMFromURL + "&batchFromURL=" + batch + "&sTypeFromURL=" + sTypeFromURL + "&sBinFromURL=" + sBinFromURL + "&shelfFromURL=" + sled + "&stockFromURL=" + stockFromURL + "&uomFromURL=" + uomFromURL + "&RSPOSFromURL=" + RSPOSFromURL), "_self");
            } else {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGI_alert_10"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_alert_10"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            }
        }

    },
    goHome: function() {
        window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
    },
    getDateDisplayFormat: function(date) {

        if (date === "0000-00-00") {
            return date;
        } else {
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    getUom: function() {

        AltUom = this.getView().byId("uom").getSelectedKey();
        isValidUOM= false;
        if (AltUom=="" || AltUom==null || AltUom==undefined || AltUom== "undefined" || AltUom == "null") {
		AltUom=oControllerThis.getView().byId("uom").getValue();
		if(AltUom!=""){
		  isValidUOM=true;
		}
        } else{isValidUOM=true;}

        stockFromURL1 = formatQuantity(stockFromURL, "PARSE");


        if (!isValidUOM) {
                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_5"), {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
         } else if (stockFromURL1 != "" && uomFromURL != "") {
            var StockQty = new sap.ui.model.xml.XMLModel();
            StockQty.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + stockFromURL1 + "&Param.4=" + userLanguage + "&Param.5=" + uomFromURL + "&Param.6=" + AltUom + "&Content-Type=text/xml"), "", false);
            var ConvertedQty = StockQty.getProperty("/Rowset/Row/O_ConvertedQuantity");
            var oErrorMessage = StockQty.getProperty("/Rowset/Row/O_ErrorMessage");
            var oType = StockQty.getProperty("/Rowset/Row/O_Type");
            ConvertedQty = formatQuantity(ConvertedQty, "FORMAT");

            if (oType == "E") {
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.error(oErrorMessage, {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
                //sap.m.MessageBox.error(oErrorMessage);
                this.getView().byId("stock").setValue("");
            } else {

                this.getView().byId("stock").setValue(ConvertedQty);
            }
        }
    },

    goToECCGM: function() {

        var refresh = new Date();
        var oECCURLModel = new sap.ui.model.xml.XMLModel();
        oECCURLModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });

        oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1=" + orderFromURL + "&Param.2=GI&cache=" + refresh + "&Content-Type=text/xml"), "", true);

        oECCURLModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
            window.open(oURL);
        });
    }


    /*quantInput:function(oEvent){
    		var quantityValue=this.getView().byId("stock").getValue();
                         
    		if(quantityValue != ""){
    			var quantity= formatQuantity(quantityValue, "PARSE");

    			if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
    			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_27"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
    			this.getView().byId("stock").setValue(""); 
    		}
    		this.getView().byId("stock").setEnabled(true); 
    		}
     }*/

});