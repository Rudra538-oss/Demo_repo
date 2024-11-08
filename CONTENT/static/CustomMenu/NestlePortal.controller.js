var oControllerThis;
var userGrpSelect;
var dashboardSelect;
var userId, oDataFlag;
var line_NodeID, sortlines;
var resourceId, nodeID;
var plantId, lineNodeID;
var client;
var oUsrGrpDashbrdTable;
var saveBtton;
var goodsIssue_tile;
var goodsReceipt_tile;
var stockDisplayTrnsfr_tile;
var nestlePrfmnceMngmnt_tile, EPO_tile;
var processOrdValidation_tile;
var reprintLable_tile;
var printQ_tile, processordrpt_tile, materialrpt_tile,todashboard_tile;
var selectedSLocWhnoItem, selectedSourceState;
//var goodsmvt_tile;
var QMS_tile;
var inspectionRsltsRec_tile;
var AMM_tile;
var stock_tile;
var inbndMatRecpt_tile;
var rPrntLabel_tile;
var PrntQ_tile;
var tileDashboardAssignmnt;
var tileStorageFreqDisplay;
var tileReports;
var tileConfigurePrinter;
var oResourceModel;
var NodeModel;
var node_id;
var lineNodeId;
var line;
var planId_Desc;
var oBCPStats;
var tileBCP;
var eProcessOrder_tile;
var tileAppVersion;
var tileLUReports;
var tileMTBSReports;
var tileORReports;
var tileAIReports;
var tileSAReports;
var tileAIRReports;
var tileDPRReports;
var tileECCRRReports;
var tileSRReports;
var tileNSAMConfig;
var switchBCPElement;
var bcpElement;
var tileBCPElement;
var monitorMRF_tile;
var tileSSPATCHER;
var tileBCPUIConfig;
var oNumRangeTable;
var tileLaborManagement;
var LMEnabledStatusFlag;
var tileSupportLbr;
var monitorEMM_tile;
var userLanguage;
var tileLMReports;
var linedesc, selectedPlant;
var rfDevice_tile;
var plantStageSelected, resourceStageSelected, TOStageSelected,PSAStageSelected;
var commaSeparatedLine;
var BKTXTmapping, SGTXTmapping;
var arrayForSTypeSBin = [];
var SbinStypeArray = [];
var intialAssignDashboardButton, userLocale;
var oFlag_OnAfterRendering, plantName;
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.CheckBox");
sap.ui.controller("nav.NestlePortal", {
    onInit: function() {
        

    },
    onAfterRendering: function(oEvent) {
        
    },
    
});