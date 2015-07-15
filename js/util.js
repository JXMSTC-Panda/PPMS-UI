/**
*检查两个时间跨度是否正确
@author qiuhx
*/
function  checkSearchDate(firstDate , lastDate, fieldName) {
	var objFirstDate = document.getElementById(firstDate);
	var objLastDate = document.getElementById(lastDate);

	if (objFirstDate.value != '' && objLastDate.value != '') {
		if (objFirstDate.value > objLastDate.value) {
			alert("[" + fieldName + "]开始时间不能大于结束时间!");
			return false;
		} else {
			return true;
		}
	}
	else {
		return true ;
	}
}

/**
* 全部选中/全部不选中复选框 
*/
function selectAll(allCheckboxName, subCheckboxListName) {
	var objAllCheckbox = document.getElementById(allCheckboxName);

	if (objAllCheckbox.checked) {
		
		var i = 0;
		while (document.getElementById(subCheckboxListName + i) != null)
		{
			var objCheckbox = document.getElementById(subCheckboxListName + i)
			objCheckbox.checked = true;

			i++;
		}
	} else {
		var i = 0;
		while (document.getElementById(subCheckboxListName + i) != null)
		{
			var objCheckbox = document.getElementById(subCheckboxListName + i)
			objCheckbox.checked = false;
			
			i++;
		}
	}
}

/**
*判断是否半角数字 
*/
function checkDigit(oSrc, fieldName) {
    var sVal = new String(oSrc);
    if (sVal != "") {
        if ( sVal.match(/^[0-9]+$/) == null ) {
			alert("[" + fieldName + "]必须为半角数字!");
            return false;
        }
    }
    return true;
}

/**
*去除前面空格 
*/
function lTrim(oTarget) {
    var oResult = oTarget.replace( /^ */, "" );
    return oResult;
}

/**
*去除后面空格 
*/
function rTrim(oTarget) {
     var oResult = oTarget.replace( / *$/, "" );
     return oResult;
}

/**
*去除前后面空格 
*/
function trim(oTarget) {
     var oResult;

     oResult = lTrim( oTarget );
     oResult = rTrim( oResult );

     return oResult;
}