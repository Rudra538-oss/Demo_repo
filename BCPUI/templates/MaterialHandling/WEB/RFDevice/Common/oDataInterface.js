var oDataInterface = function(){
	
this.getOData = function(requestParam, inputData) {
			var protocol = location.protocol;
			var host = location.host;
			var servletName =protocol+"//"+host+"/OEEDashboard/DataAccessServlet/";
			if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest();
			}else{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlHttp.open("GET", servletName + "?xsrfid=Fetch", false);
			xmlHttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
			xmlHttp.setRequestHeader("Accept", "application/json");
			xmlHttp.send();
			if (xmlHttp.status === 200) {
					var xsrfid = xmlHttp.getResponseHeader("xsrfid");
			} 
			var inputJSON = JSON.stringify(inputData);
			xmlHttp.open("POST", servletName +requestParam + "?xsrfid=" + xsrfid, false);
			xmlHttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
			xmlHttp.setRequestHeader("Accept", "application/json");
			xmlHttp.send(inputJSON);
			if (xmlHttp.readyState == 4) {
				var respOData = JSON.parse(xmlHttp.responseText);
			}

			return respOData["d"];
			
	};

	this.interfacesGetLogonUserInformation = function() {
		try {
			var requestOData = {
				inputEntitySet : "GetCurrentUserDetailsInput"
			};
			var respOData = this.getOData("DefaultInput", requestOData);
		} catch (e) {
			console.error(e);
		}
		return respOData;
	};

	this.interfacesGetPHNodesForUserInput = function(sClient, sPlant) {
		var oGetPHNodesForUserInput = undefined;
		if (sClient == "" || sPlant == "") {
			console.error("No Client and Plant");
		}

		try {
			var requestOData = {
				client : sClient,
				plant : sPlant

			};
			var respOData = this.getOData("GetPHNodesForUserInput",
					requestOData);
		} catch (e) {
			console.error(e);
		}

		return respOData;
	};

	this.interfacesGetProductionOrdersFOrTimePeriodAsync = function(
				sClient, sPlant, workCenterId,nodeid, scheduledDateSelectionTimestamp, sOrderPattern) {
			var xmlHttpRequest = new XMLHttpRequest();
			if (sPlant == "" || sClient == "") {
				console.error("No Plant and Client exists");
				return;
			} else if (workCenterId == "") {
				console.error("work center does not exists");
				return;
			}

			var productionOrderInput;

			if (sOrderPattern == null) {
				if (scheduledDateSelectionTimestamp != undefined) {
					productionOrderInput = {
						client : sClient,
						plant : sPlant,
						workCenterIdList : [{value : workCenterId}],
						scheduledDateSelectionTimestamp : scheduledDateSelectionTimestamp,
						nodeId : nodeid
					};
				} else {
					productionOrderInput = {
						client : sClient,
						plant : sPlant,
						workCenterIdList : [{value : workCenterId}]
					};
				}
			}else{
				productionOrderInput = {
						client : sClient,
						plant : sPlant,
						patternOfOrder  : sOrderPattern
					};
			}
			
			var respOData = this.getOData("GetOrderDetailsInput",productionOrderInput);

			return respOData;
		};

	this.interfacesGetComponentListForOrder = function(oData) {
		if (oData.client == "" || oData.plant == "") {
			console.error("No Plant and Client exists");
				return;
		} else if (oData.orderNumber == "") {
			console.error("Provide Order Number");
			return;
		}

		var respOData;
		try {
			respOData = this.getOData("GetComponentListOfOrderInput",oData);
		} catch (e) {
			console.error(e);
		}
		return respOData;
	};

	this.getPackageIDOrBatchDetails = function(requestOData){
		var respOData;
		try{
			respOData = this.getOData("GetPackageIDOrBatchDetails",requestOData);
			return respOData;
		}catch(e){
			console.error(e);
		}
	};

	this.interfacesGetSystemDetailsForClientAndPlant = function(sClient, sPlant) {
			try {
				var requestOData = {
					client : sClient,
					plant : sPlant
				};
				var respOData = this.getOData("GetSystemDetailsForClientAndPlantInput", requestOData);
			} catch (e) {
				console.error(e);
			}
			return respOData;
		};

	this.interfacesGetActivityDetails = function(sClient, sPlant,activityId){
		try {
				var requestOData = {
					client : sClient,
					plant : sPlant,
					activityId:activityId
				};
				var respOData = this.getOData("GetActivityDetails", requestOData);
			} catch (e) {
				console.error(e);
			}
			return respOData;

	}

	this.reportGoodsMovement = function(requestOData){
		var respOData;
		try{
			respOData = this.getOData("ReportGoodsMovementInput",requestOData);
			return respOData;
		}catch(e){
			console.error(e);
		}
	}
	

	//GR
	this.interfacesGetProductionOrdersWithGRQuantityAsync = function(
				sClient, sPlant, workCenterId, nodeid,scheduledDateSelectionTimestamp, sOrderPattern) {
			var xmlHttpRequest = new XMLHttpRequest();
			if (sPlant == "" || sClient == "") {
				console.error("No Plant and Client exists");  
				
				return;
			} else if (workCenterId == "") {
				console.error("work center does not exists");
				return;
			}

			var productionOrderInput;

			if (sOrderPattern == null) {
				if (scheduledDateSelectionTimestamp != undefined) {
					productionOrderInput = {
						client : sClient,
						plant : sPlant,
						workCenterIdList : [{value : workCenterId}],
						scheduledDateSelectionTimestamp : scheduledDateSelectionTimestamp,
						nodeId : nodeid
					};
				} else {
					productionOrderInput = {
						client : sClient,
						plant : sPlant,
						workCenterIdList : [{value : workCenterId}]
					};
				}
			}else{
				productionOrderInput = {
						client : sClient,
						plant : sPlant,
						patternOfOrder  : sOrderPattern
					};
			}
			
			var respOData = this.getOData(
					"GetOrderDetailsInputWithGRQuantityAsync",
					productionOrderInput);

			return respOData;
		};

	//UOM
	
	this.interfacesGetAllAlternateUOMs = function(client,material,isAsync) {
		var respOData;
		try {
			var requestOData = {
				client : client ,
				matnr : material
			};
			if (isAsync != true) {
				respOData = this
						.getOData("GetAlternateUoMInput",
								requestOData);

				return respOData.uomList;
			} else {
				this.getOData(
						"GetAlternateUoMInput",
						requestOData, isAsync, callback, controller);
			}
		} catch (e) {
			console.error("e");
		}
	};
	
	//
	this.getAllPackageIDSForOrder = function(requestOData,isAsync){
		var respOData;
		try{
			if (isAsync != true) {
				respOData = this.getOData("SSCReversalInput",requestOData);

				return respOData;
			} else {
				this.getOData("SSCReversalInput",requestOData, isAsync, callback, controller);
			}
		}catch(e){
			console.error("e");
		}
	};
	

		

}