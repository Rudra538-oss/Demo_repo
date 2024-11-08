

/*

 * This is used to Create Table with Binding

 */
function createTable(tableID, title, colList, queryPath){
	
	var RefreshDate = new Date();

	var oTable;	
	var oModel = new sap.ui.model.xml.XMLModel();
	
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml","",false);

	oModel.setSizeLimit(50000);
	
	if(sap.ui.getCore().byId(tableID) == null) {
		oTable = new sap.ui.table.Table({
			id: tableID,
			//title : title,
			width : "100%",
			visibleRowCount : 5,
			selectionMode : sap.ui.table.SelectionMode.Single,
		
			columns: colList
		});
		oTable.bindRows("/Rowset/Row/");
	} else {
		oTable =  sap.ui.getCore().byId(tableID) ;
	}
	oTable.setModel(oModel);

	oTable.invalidate();
	return oTable;
}

/*
 * This is used to Create Column with Binding
 */
function createColumn(colID, labelText, valueElement) {

	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.TextView().bindProperty("text", valueElement),
		
	});
	return oColumn;
}



function createDescColumn(colID, labelText, valueElement) {
	
	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.TextArea({cols:120,rows:2,wrapping:sap.ui.core.Wrapping.Hard}).bindProperty("value", valueElement),
	});
	return oColumn;
}

function createDateColumn(colID, labelText, valueElement) {

	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.TextView().bindProperty("text", valueElement,function(cellValue){
	if (cellValue == null || cellValue == "TimeUnavailable")
	{
	cellValue = "NA";
	return cellValue;
	}
	else
	{
	var date = new Date(cellValue);
	var Day = date.getDate();
	if (Day < 10) {
	Day = "0"+Day;
	}
	var Month = date.getMonth()+1;
	if (Month < 10) {
	Month = "0"+Month;
	}
	var Year = date.getFullYear();
	if (Year==1900)
	{
	cellValue = "";
	}
	else
	{
	var cellValue = Month + "/" +  Day +"/"+ Year;
	}
	return cellValue;
	}})
	});
	return oColumn;
	
}



/*
 * This is used to Create Drop-Down Box with Binding
 */	
function createdropDownBox(dropDownID, valueElement, keyElement, queryPath) {
	var RefreshDate = new Date();
	var oDropDownBox;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml");
	
	oModel.setSizeLimit(50000);
	
	if(sap.ui.getCore().byId(dropDownID) == null) {
            	 oDropDownBox = new sap.ui.commons.DropdownBox(dropDownID);

		var oListItem = new sap.ui.core.ListItem();
		oListItem.bindProperty("text", valueElement);
		oListItem.bindProperty("key", keyElement);
		oDropDownBox.bindItems("/Rowset/Row", oListItem);
	} else {
		oDropDownBox =  sap.ui.getCore().byId(dropDownID) ;
	}

    	oDropDownBox.setModel(oModel);
	oDropDownBox.invalidate();
	return oDropDownBox;
}

/*
 * This is used to Create Drop-Down Box along with Default Item with Binding
 */
function createdropDownBoxDefault(dropDownID, valueElement, keyElement, queryPath, defaultValue) {

	var RefreshDate = new Date();

	var oDropDownBox;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

	oModel.setSizeLimit(50000);
	
	if(sap.ui.getCore().byId(dropDownID) == null) {
            	 oDropDownBox = new sap.ui.commons.DropdownBox(dropDownID);

		var oListItem = new sap.ui.core.ListItem();
		oListItem.bindProperty("text", valueElement);
		oListItem.bindProperty("key", keyElement);
		oDropDownBox.bindItems("/Rowset/Row", oListItem);
	} else {
		oDropDownBox =  sap.ui.getCore().byId(dropDownID) ;
	}

    	oDropDownBox.setModel(oModel);

	oItem= new sap.ui.core.ListItem();
	oItem.setText(defaultValue);
	oItem.setKey("0");
	oDropDownBox.insertItem(oItem,0);

	oDropDownBox.invalidate();
	return oDropDownBox;
}
/*
 * This is used to Create TextField with Binding
 */	
function createTextField(textFieldID, valueElement, queryPath) {

	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml");

            var oTextField = new sap.ui.commons.TextField(textFieldID);
	oTextField.bindValue("/Rowset/Row/"+valueElement);	
    	oTextField.setModel(oModel);
	return oTextField;
}


/*
 * This is used to Create TextView with Binding
 */	
function createTextView(textViewID, valueElement, queryPath) {

	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml"));

            var oTextView = new sap.ui.commons.TextView(textViewID);
	oTextView.bindText("/Rowset/Row/"+valueElement);	
    	oTextView.setModel(oModel);
	return oTextView;
}

/*
 * This is used to Create Line Chart with Binding
 */ 	
function createLineChart(chartID, chartTitle, xAxisTitle, yAxisTitle, queryPath)
{
	var cChart;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml");
	var dataset = new sap.viz.core.FlattenedDataset({dimensions : dimensionList,
		measures : measureList,
		data : {path : "/Rowset/Row"}});

	if(sap.ui.getCore().byId(chartID) == null)	{
		cChart = new sap.viz.Line ({id: chartID, width : "100%",height : "100%" ,line : {}, title : {visible : true, text : chartTitle} , yaxis: {title : {visible : true,text : yAxisTitle}}, xaxis: {title : {visible : true,text : xAxisTitle}}, dataset : dataset});
	} else {
		cChart = sap.ui.getCore().byId(dropDownID) ;
	}
	cChart.setModel(oModel);
	cChart.invalidate();
	return cChart;
}

/*
 * This is used to Create List Box with Binding
 */
function createListBox(listBoxID, valueElement, keyElement, queryPath, width) {
	
	var RefreshDate = new Date();
	var oListBox;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml");

	oModel.setSizeLimit(50000);

	if(sap.ui.getCore().byId(listBoxID) == null) {
		oListBox = new sap.ui.commons.ListBox(listBoxID);
		var oListItem = new sap.ui.core.ListItem();
		oListItem.bindProperty("text", valueElement);
		if(keyElement != "")
			//oListItem.bindProperty("additionalText", keyElement);
			oListItem.bindProperty("key", keyElement);
		oListBox.bindAggregation("items", "/Rowset/Row/", oListItem);

	}else {
		oListBox = sap.ui.getCore().byId(listBoxID);
	}
    	oListBox.setModel(oModel);
	if(width != null){
		oListBox.setWidth(width);
	}
	oListBox.invalidate();
	return oListBox;
}

/*
 * This is used to Refresh control data with Binding
 */
function refreshControl(controlID, queryPath) {
	
	var RefreshDate = new Date();

	oControl = sap.ui.getCore().byId(controlID) ;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

	oModel.setSizeLimit(50000);

    	oControl.setModel(oModel);
	return oControl;
}



/*------------------------------------------------------------------------------------------------------------*/
/**************************************************************************************/
/***************************NEW UTILITY FUNCTIONS******************************/
/**************************************************************************************/  
/*------------------------------------------------------------------------------------------------------------*/

/*
 * This is used to get Data Count of a given model
 */
function getDataCount(queryPath, nodeName) {

         var dataModel = new sap.ui.model.xml.XMLModel();
         dataModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml", "", false);
         sap.ui.getCore().setModel(dataModel);
    
         var xmlData = dataModel.getData();
         var totalDataCount = $(xmlData).find(nodeName).size() ;
         return totalDataCount;
}

/*
 * This is used to get Data Model in a custom way
 * @Note: By default data loading is always in Asynchronous manner if third parameter in loadData method not given
 */
function getDataModel(queryPath, isAsync) {

         var dataModel = new sap.ui.model.xml.XMLModel();

         dataModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml", "", isAsync);
         if (!isAsync) {
                 sap.ui.getCore().setModel(dataModel);
         }

         return dataModel;
}

/*
 * This is used to Create Custom Column with Binding
 */
function createCustomColumn(labelText, customLabel, customTemplate, valueElement, isSortRequired, isFilterRequired) {

	if (customLabel == "") {
		customLabel = new sap.ui.commons.Label({text: labelText});
            }
	if (customTemplate == "") {
		customTemplate = new sap.ui.commons.TextView().bindProperty("text", valueElement);
            }

	var oCustomColumn = new sap.ui.table.Column({
				label: customLabel,
				template: customTemplate,
				width: "100%"
	});

	if (isSortRequired) {
		oCustomColumn.setSortProperty(valueElement);
            }
	if (isFilterRequired) {
		oCustomColumn.setFilterProperty(valueElement);
            }

	return oCustomColumn;
}

/*
 * This is used to Create Custom Table with Binding
 */
function createCustomTable(tableID, titleID, colList, queryPath, selMode, vRowCount, isEditable){

	var oTable;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+ queryPath +"&Content-Type=text/xml");

	oModel.setSizeLimit(50000);

	if(sap.ui.getCore().byId(tableID) == null) {
		oTable = new sap.ui.table.Table({
				id : tableID,
				title : titleID,
				width : "100%",
				visibleRowCount : vRowCount,
				selectionMode : selMode,
				editable : isEditable,
				columns: colList
		});
		oTable.bindRows("/Rowset/Row/");
	} else {
		oTable =  sap.ui.getCore().byId(tableID);
	}
	oTable.setModel(oModel);
	oTable.invalidate();

	return oTable;
}

/*
 * This is used to retrieve the currently logged user name
 * @Note: Here a XML query is required for Illuminator service
 */
function getLoginName() {

	var userModel = new sap.ui.model.xml.XMLModel();
	userModel.loadData("/XMII/Illuminator?QueryTemplate=KPI Dashboard/QueryTemplates/XML_GetIllumLoginName&Content-Type=text/xml", "", false);
	sap.ui.getCore().setModel(userModel);

	var logUserName = userModel.getProperty("/Rowset/Row/Value");
	return logUserName;
}

/*
 * This is used to retrieve the property value of the host
 * @ http://www.test.com:8082/index.php#tab2
 * Property       Result
 * --------------------------------------------------------------------------
 * host              www.test.com:8082
 * hostname   www.test.com
 * port               8082
 * protocol        http
 * pathname    index.php
 * href                http://www.test.com:8082/index.php#tab2
 * hash              #tab2
 */
function getHostPropertyValue(propName) {

	var hostPropValue = $(window.location).attr(propName);
	return hostPropValue;
}

/*
 * This is used to get the querystring parameters
 */
function getURLParams() {

	// If the URL contains a querystring with multiple parameters the following code -
	// - will parse each parameter and store the array as a variable.
    	var vars = [], hash;
    	var q = document.URL.split('?')[1];
    	if(q != undefined) {
        		q = q.split('&');
        		for(var i = 0; i < q.length; i++) {
            		hash = q[i].split('=');
            		vars.push(hash[1]);
            		vars[hash[0]] = hash[1];
        		}
    	}
	// If the URL contains the querystring "?a=3&b=2&c=1", we can access the value for "a" using:
	// alert(vars['a']);

	return vars;
}

/*
 * This is used to wait process according given millisecond
 */
function processWait(ms) {
	var tDate = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-tDate < ms);
}


/**************************************************************************************/
/***************************Refresh Core control data with Binding*****************/
/**************************************************************************************/  	
function refreshCoreControl(controlID, queryPath, oParameters, bAsync, reqType, bCache, mHeaders) {

	if (oParameters == undefined) {  oParameters = "";  }
	if (bAsync == undefined) {  bAsync = true;  }
	if (reqType == undefined) {  reqType = 'GET'; }
	if (bCache == undefined) {  bCache = false;  }
	if (mHeaders == undefined) {  mHeaders = "";  }

	var oControl = sap.ui.getCore().byId(controlID);

	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml", oParameters, bAsync, reqType, bCache, mHeaders);

	oModel.setSizeLimit(50000);

	oModel.attachRequestCompleted(this,
			function(oEvent) { 
				oControl.setModel(oModel);
				oControl.invalidate();
			}
	);

	return oControl;
}

/**************************************************************************************/
/***************************Refresh Synchronous control data with Binding********/
/**************************************************************************************/  	
function refreshSyncControl(controlID, queryPath) {

	var oControl = sap.ui.getCore().byId(controlID) ;

	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData("/XMII/Illuminator?QueryTemplate="+queryPath+"&Content-Type=text/xml", "", false);	

	oModel.setSizeLimit(50000);

    	oControl.setModel(oModel);
	oControl.invalidate();	
	return oControl;
}

/****************************************************************************************/
/*******************Create Colun with href model element*********************/
/***************************************************************************************/ 

function createHyperlinkColumn(colID, labelText, valueElement, linkelement, targetValue)
{	
	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.Link().bindProperty("text", valueElement).bindProperty("href", linkelement).bindProperty("target", "_blank"),
	sortProperty: valueElement,
	filterProperty: valueElement,
	width: "100%"
	});
	return oColumn;
}

/****************************************************************************************/
/***************************Create HTML Column with Binding*********************/
/***************************************************************************************/  	
function createHTMLColumn(colID, labelText, valueElement)
{

	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.core.HTML().bindProperty("content", valueElement),
	width: "100%"
	});
	return oColumn;
}

/****************************************************************************************/
/***************************Create Image Column with Binding*********************/
/***************************************************************************************/  	
function createImageColumn(colID, labelText, valueElement)
{

	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.Image().bindProperty("src", valueElement)
	});
	return oColumn;
}

/****************************************************************************************/
/***************************Create Button Column with Binding**********************/
/***************************************************************************************/  	
function createButtonColumn(colID, labelText, valueElement, buttonText)
{

	var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.Button({ text : buttonText})
	});
	return oColumn;
}


/******************************************************************************************/
/********* This is used to Refresh control data with Binding (set Value to Default)****/
/******************************************************************************************/

function refreshDropDwnControlDefault(controlID, queryPath, defaultValue) {
	
	var RefreshDate = new Date();

	oControl = sap.ui.getCore().byId(controlID) ;
	var oModel = new sap.ui.model.xml.XMLModel();
	oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate="+queryPath+"&d="+RefreshDate+"&Content-Type=text/xml"),"",false);

	oModel.setSizeLimit(50000);

    	oControl.setModel(oModel);
	
	oItem= new sap.ui.core.ListItem();
	oItem.setText(defaultValue);
	oItem.setKey("0");
	oControl.insertItem(oItem,0);
	return oControl;
}

/******************************************************************************************/
/********* This is used to Round the decimal values of column***********************/
/******************************************************************************************/
function createColumnFormat(colID, labelText, valueElement,FormatValue) {

	var FloatType = new sap.ui.model.type.Float({maxFractionDigits : FormatValue});
var oColumn = new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: labelText}),
	template: new sap.ui.commons.TextField().bindProperty("value", valueElement,FloatType),
  
	});
	return oColumn;
}

/******************************************************************************************/
/********* This is used to get the date in required format***********************/
/******************************************************************************************/


function changeDateFormat(dateValue,toFormat)
{
jQuery.sap.require("sap.ui.core.format.DateFormat");
var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : toFormat }); 
var date=  dateFormat.format(new Date(dateValue));
return date;
}


/////////////////////////////////////////////////////////////////////   Get Parameters values from URL /////////////////////////////////////////////////////

function getURLParameter(paramName){

	var paramValue;
	var urlDecoded = decodeURI(window.location.search);	
	var url = urlDecoded.substring(1);
		if(url!= null || url!= "" || url != " "){
			var param = url.split("&");
				for(var i =0 ; i < param.length; i++){

					var splitter = param[i].split("=");

					if(splitter[0] == paramName.trim()){
						paramValue = splitter[1];
						
					}				
					
				}
			
		}
return  paramValue;

}