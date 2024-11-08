var bcpXML;
var xmlresource;
var data;
var xmlstatus;
var xmlorder;
var plant;
var resourceGR;
var resource;
var siteFromURL;
var plantFromURL;
var nodeID, material1, su, type;
var language, qty;
var sloc, matData, batchXML;
var wh, client, L_values, hu_resp;
var SU_Flag, ord, language, toggle_btn;
var headMat, headerMat;

document.onkeydown = fkey;

function fkey(e) {
    console.log(e);
    if (e.keyCode == 113) {
        doClear();
    }

    if (e.keyCode == 114) {
        doBack();
    }

    if (e.keyCode == 115 || ($('#nxtBttn').is(":visible") == true && e.keyCode == 13)) {
        doNext();
    }
    if (e.keyCode == 117 || ($('#btn_nonsu').is(":visible") == true && e.keyCode == 13)) {
        doNonSU();
    }

}

function loadStatus() {

    callTimeOut();
    SU_Flag = "SU";
    toggle_btn = 1;
    client = getURLParameter("client");;
    plantFromURL = getURLParameter("plant");
    siteFromURL = getURLParameter("site");
    resource = decodeURIComponent(getURLParameter("resource"));
    nodeID = getURLParameter("nodeID");
    sloc = getURLParameter("sloc");
    wh = getURLParameter("wh");
    type = getURLParameter("type");
    var timestamp = new Date();
    document.getElementById("labelHdr").innerText = "Site: " + "PLANT-" + plantFromURL;

    // langData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&Content-Type=text/xml");
    language = getLanguage();

    var DateNw = new Date();
    var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,ALERT_CONS,ALERT_SSCC_QTY,ALERT_OR_ERR,ALERT_ST_ERR,ALERT_MAT_ERR,ALERT_SSCC,ALERT_ERR_OR,ALERT_ERR_ST,RF_GIORDMAT_LBL,RF_GIORDMAT_BK,RF_GIORDMAT_NXT,RF_GIORDMAT_nSU,RF_GIORDMAT_RESR,RF_GIORDMAT_BCP,RF_GIORDMAT_SELSTAT,RF_GIORDMAT_SELOR,RF_GIORDMAT_SELMAT,RF_GIORDMAT_SSCC,RF_GIORDMAT_SITE,RF_GIORDMAT_SU,RF_GIORDMAT_NONSU,CustomGI_alert_10,CustomGI_alert_11,CustomGI_alert_12,CustomGR_alert_26,GI_EWM_Msg";

    L_values = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml");
    console.log("hi" + L_values);

    var valSSScanNo = getProperty(L_values, 'RF_SS_SCAN_No');

    //var valHome = getProperty(L_values,'RF_GIORDMAT_NXT');
    var valNxt = getProperty(L_values, 'RF_GIORDMAT_NXT');
    var valNonSU = getProperty(L_values, 'RF_GIORDMAT_nSU');
    var valResr = getProperty(L_values, 'RF_GIORDMAT_RESR');
    var valStatus = getProperty(L_values, 'RF_GIORDMAT_SELSTAT');
    var valBCP = getProperty(L_values, 'RF_GIORDMAT_BCP');
    var valOrder = getProperty(L_values, 'RF_GIORDMAT_SELOR');
    var valBk = getProperty(L_values, 'RF_GIORDMAT_BK');
    var valMat = getProperty(L_values, 'RF_GIORDMAT_SELMAT');
    var valLblSSCC = getProperty(L_values, 'RF_GIORDMAT_SSCC');
    var valTitle = document.title;
    valTitle = getProperty(L_values, 'RF_GIORDMAT_LBL');
    document.getElementById("title").innerHTML = valTitle;
    document.getElementById("labelHdr").innerHTML = valTitle;
    document.getElementById("BtnBk").innerHTML = valBk;
    document.getElementById("nxtBttn").innerHTML = valNxt;
    document.getElementById("btn_nonsu").innerHTML = valNonSU;
    document.getElementById("idBCP").innerHTML = valBCP;
    document.getElementById("idOrder").innerHTML = valOrder;
    document.getElementById("materialL").innerHTML = valMat;
    document.getElementById("ssccL").innerHTML = valLblSSCC;



    // alert("Lang"+language);

    bcpStatus("BCPArea", L_values);
    setInterval(function() {
        bcpStatus("BCPArea", L_values);
    }, 30000);

    document.getElementById("nxtBttn").disabled = true;
    populateDropdownData("linedrp", "DESCRIPTION", "NODE_ID", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetLines&Param.1=" + plantFromURL + "&Param.2=" + language + "&Content-Type=text/xml");

}

function doLineDrp() {
    var order = document.getElementById("order");
    var nodeID = document.getElementById("linedrp").value;
    var day1 = document.getElementById("inputDayId").value;
    var DateNw = new Date();

    populateDropdownData("order", "Order", "Order", "/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1=" + client + "&Param.2=" + nodeID + "&Param.3=" + plantFromURL + "&Param.4=" + language + "&Param.5=" + day1 + "&Param.6=&d=" + DateNw + "&Content-Type=text/xml");
}

function doOrder() {
    var DateNw = new Date();
    nodeID = document.getElementById("linedrp").value;
    var material = document.getElementById("material");
    var order = document.getElementById("order").value;

    ord = order;
    var ordLength = order.length;

    for (var p = 0; p < (12 - ordLength); p++) {
        ord = "0" + ord;
    }

    headMat = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/SQLQ_HeaderMat_GI&Param.1=" + ord + "&d=" + DateNw + "&Content-Type=text/xml");
    headerMat = $(headMat).find("MATNR").text();

    hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + headerMat + "&Param.2=" + plantFromURL + "&Param.3=" + client + "&Param.4=" + ord + "&d=" + DateNw + "&Content-Type=text/xml");
    wh = $(hu_resp).find("WHNumber").text();
    if (wh == "" || wh == "---") {

        hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=GI&d=" + DateNw + "&Content-Type=text/xml");
        wh = $(hu_resp).find("Value").text();
    }
    var refresh = new Date();
    populateDropdownData("material", "Value", "Key", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterials_GI&Param.1=" + order + "&Param.2=" + language + "&cache=" + refresh + "&Content-Type=text/xml");
}

function doMat() {

    su = document.getElementById("material").value;

}

function OnManualScanOfPO() {
    var DateNw = new Date();
    POManual = document.getElementById("POManualScan").value;

    if (POManual != "") {

        var GetNodeID = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1=" + client + "&Param.3=" + plantFromURL + "&Param.6=" + POManual + "&d=" + DateNw + "&Content-Type=text/xml");
        nodeID = $(GetNodeID).find("NodeID").text();
        var material = document.getElementById("material");
        var refresh = new Date();
        populateDropdownData("material", "Value", "Key", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterials_GI&Param.1=" + POManual + "&Param.2=" + language + "&cache=" + refresh + "&Content-Type=text/xml");
    }
}

function POManualNotBlank() {
    POManual = document.getElementById("POManualScan").value;
    if (POManual != "") {
        document.getElementById("linedrp").disabled = true;
        document.getElementById("order").disabled = true;
        document.getElementById("inputDayId").disabled = true;
    } else {
        document.getElementById("linedrp").disabled = false;
        document.getElementById("order").disabled = false;
        document.getElementById("inputDayId").disabled = false;
    }
}

function selectLine() {
    document.getElementById("POManualScan").disabled = true;
    var lineDropdown = document.getElementById("linedrp").value;
    if (lineDropdown == "") {
        document.getElementById("POManualScan").disabled = false;
    }
}

function handleDayChange() {
    nodeID = document.getElementById("linedrp").value;
    if (nodeID == "") {} else {
        doLineDrp();
    }
}

function MaterialNotBlank() {
    document.getElementById("nxtBttn").disabled = false;
    var materialSelection = document.getElementById("material").value;
    if (materialSelection == "" && SU_Flag == "NONSU") {
        document.getElementById("nxtBttn").disabled = true;
    }
}

function SSCCNotBlank() {
    document.getElementById("nxtBttn").disabled = false;
    var SSCCInput = document.getElementById("ssccArea").value;
    if (SSCCInput == "" && SU_Flag == "SU") {
        document.getElementById("nxtBttn").disabled = true;
    }
}

function doNext() {
    var sLoc_whNo_source = "";
    var refresh = new Date();
    var ssccVal = document.getElementById("ssccArea").value;
    ssccVal = scanssccno(ssccVal);

    var orderVal = document.getElementById("order").value;
    var materialVal = document.getElementById("material").value;

    if (orderVal == "" || orderVal == null || orderVal == undefined) {
        orderVal = POManual;
    }

    ord = orderVal;
    var ordLength = orderVal.length;

    for (var p = 0; p < (12 - ordLength); p++) {
        ord = "0" + ord;
    }

    headMat = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/SQLQ_HeaderMat_GI&Param.1=" + ord + "&d=" + refresh + "&Content-Type=text/xml");
    headerMat = $(headMat).find("MATNR").text();

    hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + headerMat + "&Param.2=" + plantFromURL + "&Param.3=" + client + "&Param.4=" + ord + "&d=" + refresh + "&Content-Type=text/xml");
    wh = $(hu_resp).find("WHNumber").text();

    if (wh == "" || wh == "---") {

        hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=GI&d=" + refresh + "&Content-Type=text/xml");
        wh = $(hu_resp).find("Value").text();
    }
    if (orderVal.length > 0) {
        var ogetSlocAndWh = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1=" + ord + "&Param.2=" + client + "&Param.3=" + plantFromURL + "&d=" + refresh + "&Content-Type=text/xml");
        var storageLoc = $(ogetSlocAndWh).find("LGORT").text();
        var ogetSource = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1=" + storageLoc + "&d=" + refresh + "&Content-Type=text/xml");
        sLoc_whNo_source = $(ogetSource).find("source").text();

    }

    if (orderVal == "" || orderVal == null || orderVal == undefined) {
        var valAlertNoOrder = getProperty(L_values, 'ALERT_OR_ERR');
        alert(valAlertNoOrder);
    } else if (sLoc_whNo_source == "EWM") {
        alert(getProperty(L_values, 'GI_EWM_Msg'));
    } else if ((ssccVal == "" || ssccVal == null || ssccVal == undefined) && SU_Flag == "SU") {
        var valAlertSSCC = getProperty(L_values, 'ALERT_SSCC');
        alert(valAlertSSCC);
    } else if ((materialVal == "" || materialVal == null || materialVal == undefined) && SU_Flag == "NONSU") {
        var valAlertMaterialMissing = getProperty(L_values, 'ALERT_MAT_ERR');
        alert(valAlertMaterialMissing);
    } else {
        var order = document.getElementById("order").value;
        var material1 = document.getElementById("material");
        var material = material1.options[material1.selectedIndex].text;
        var timestamp = new Date();
        var vRSPOS = materialVal.split(" ")[4];
        vRSPOS = vRSPOS == undefined ? "" : vRSPOS;

        if (order == "") {
            order = POManual;
        }
        ord = order;
        var ordLength = order.length;
        for (var p = 0; p < (12 - ordLength); p++) {
            ord = "0" + ord;
        }


        if (SU_Flag == "SU") {
            if (sscc == "") {
                var valAlertSSCC = getProperty(L_values, 'ALERT_SSCC');
                alert(valAlertSSCC);
            } else {
                var sscc = document.getElementById("ssccArea").value;

                sscc = scanssccno(sscc);

                var ssccLen = sscc.length;
                var mat = "";
                if (type == "CON") {
                    var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>" + sscc + "</huNumber><orderNumber>" + ord + "</orderNumber><materialNumber>" + mat + "</materialNumber><warehouseNumber>" + wh + "</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>" + plantFromURL + "</plant><client>" + client + "</client><language>" + language + "</language><RSPOS>" + vRSPOS + "</RSPOS></PackageDetailsInput>"
                    //alert(InputXMLInStringFormat);
                    matData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1=" + InputXMLInStringFormat + "&d=" + refresh + "&Content-Type=text/xml");
                    success = $(matData).find("status").text();
                    quant = $(matData).find("stock").text();
                    //alert(quant);
                    sscc = $(matData).find("huNumber").text();
                    vRSPOS = $(matData).find("RSPOS").text();

                    if (success == "S") {
                        if (quant > 0) {
                            window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue_SU.irpt?order=" + order + "&plant=" + plantFromURL + "&nodeID=" + nodeID + "&sscc=" + sscc + "&whNo=" + wh + "&client=" + client + "&type=" + type + "&vRSPOS=" + vRSPOS), "_self");
                        } else {
                            alert(getProperty(L_values, 'ALERT_SSCC_QTY'));
                        }
                    } else {
                        alert($(matData).find("message").text());
                    }
                } else {

                    var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>" + sscc + "</huNumber><orderNumber>" + ord + "</orderNumber><materialNumber></materialNumber><warehouseNumber>" + wh + "</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>" + plantFromURL + "</plant><client>" + client + "</client><language>" + language + "</language><RSPOS>" + vRSPOS + "</RSPOS></PackageDetailsInput>"
                    // alert(InputXMLInStringFormat);
                    matData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1=" + InputXMLInStringFormat + "&d=" + refresh + "&Content-Type=text/xml");
                    batch = $(matData).find("batchNumber").text();
                    hu = $(matData).find("huNumber").text();
                    mat = $(matData).find("materialNumber").text();
                    vRSPOS = $(matData).find("RSPOS").text();
                    batchXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + client + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + mat + "&Param.6=" + batch + "&Param.7=" + hu + "&Param.8=" + vRSPOS + "&d=" + refresh + "&Content-Type=text/xml");
                    qty = $(batchXML).find("QTY_IN_REPORT_UOM").text();

                    //alert(qty);
                    if (qty == 0) {

                        alert(qty);
                        var ErrAlertNoConsumptionDone = getProperty(L_values, 'CustomGI_alert_10');
                        //val ErrAlertNoConsumptionDone = getProperty(L_values,'CustomGI_alert_10') ;
                        alert(ErrAlertNoConsumptionDone);
                    } else {
                        window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue_SU.irpt?order=" + order + "&plant=" + plantFromURL + "&nodeID=" + nodeID + "&sscc=" + hu + "&whNo=" + wh + "&client=" + client + "&type=" + type + "&vRSPOS=" + vRSPOS), "_self");
                    }
                }
            }
        } else {

            if (material == "") {
                var valAlertMatOr = getProperty(L_values, 'ALERT_MAT_ERR');
                alert(valAlertMatOr);
            } else {

                var matTrim = material.split(" ");
                var matr = matTrim[0];

                if (type == "CON") {

                    var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><MaterialDetailsInput><materialNumber>" + matr + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + client + "</client><warehouseNumber>" + wh + "</warehouseNumber><orderNumber>" + ord + "</orderNumber><isReversal/><storageBin/><storageType/><storageLocation>" + sloc + "</storageLocation><RSPOS>" + vRSPOS + "</RSPOS><productionSupplyArea/></MaterialDetailsInput>"

                    batchXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_ToGetBatchList&Param.1=" + InputXMLInStringFormat + "&d=" + timestamp + "&Content-Type=text/xml");
                    success = $(batchXML).find("status").text();

                    if (success == "E") {

                        var batchDetail = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + client + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + matr + "&Param.6=&Param.7=&Param.8=" + vRSPOS + "&d=" + refresh + "&Content-Type=text/xml");
                        var quant = $(batchDetail).find("QTY_IN_REPORT_UOM").text();
                        if (Number(quant) > 0) {
                            var valNoBatchForCons = getProperty(L_values, 'CustomGI_alert_11');
                            alert(valNoBatchForCons);
                        } else {
                            var valNoBatchForConsRev = getProperty(L_values, 'CustomGI_alert_12');
                            alert(valNoBatchForConsRev);
                        }
                    } else {

                        window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue_NonSU.irpt?order=" + order + "&material=" + material + "&plant=" + plantFromURL + "&nodeID=" + nodeID + "&su=" + su + "&type=" + type + "&wh=" + wh + "&client=" + client + "&vRSPOS=" + vRSPOS), "_self");
                    }
                } else {

                    var batchXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/MDOQ_GetBtchesForGIReverse&Param.1=" + client + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + matr + "&Param.6=261&Param.7=" + vRSPOS + "&d=" + refresh + "&Content-Type=text/xml");
                    var nodes = $(batchXML).find("Row").size();
                    if (nodes == 0) {
                        var valAlertCons = getProperty(L_values, 'ALERT_CONS');
                        alert(valAlertCons);
                    } else {

                        window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue_NonSU.irpt?order=" + order + "&material=" + material + "&plant=" + plantFromURL + "&nodeID=" + nodeID + "&su=" + su + "&type=" + type + "&wh=" + wh + "&client=" + client + "&vRSPOS=" + vRSPOS), "_self");
                    }
                }
            }
        }
    }
}

function doNonSU() {

    if (toggle_btn == 1) {
        $('#ssccL').hide();
        $('#ssccArea').hide();
        $('#materialL').show();
        $('#material').show();
        SU_Flag = "NONSU";
        var valSU = getProperty(L_values, 'RF_GIORDMAT_SU');
        document.getElementById("btn_nonsu").innerHTML = valSU;
        toggle_btn = 0;
    } else if (toggle_btn == 0) {
        $('#ssccL').show();
        $('#ssccArea').show();
        $('#materialL').hide();
        $('#material').hide();
        SU_Flag = "SU";
        var valNonSU = getProperty(L_values, 'RF_GIORDMAT_NONSU');
        document.getElementById("btn_nonsu").innerHTML = valNonSU;
        toggle_btn = 1;
    }

}

function doBack() {
    window.history.back();
}

function changeStyle(elementID) {
    try {
        document.getElementById(elementID).options[0].style.fontSize = "60px";
    } catch (err) {}
}