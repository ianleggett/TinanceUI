
var prefs = { // set default settings
	bins : {
		MAX_COLS : 9,
		MAX_ORD_BIN : 7, // max orders per bin
	},
	table : {
		scrollCollapse : false,
		paging : true,
		refresh : 1,
	},
	vsite : [],
	vsiteall : [],
};

function initFilt() {

	//console.log("site prefs:" + JSON.stringify(prefs));

	prefs.vsiteall.forEach(function(item) {
		setButton($('#site' + item), true);
	});
	prefs.vsite.forEach(function(item) {
		setButton($('#site' + item), true);
	});	
}

function getFilterStr() {
	var vlist = [];
	var str = "site=";	
	if (prefs) {
		
		prefs.vsiteall.forEach(function(item) {
			if ($('#site' + item).attr('checked')) {
				vlist.push(item);
				str += item + ",";
			}
		});

		prefs.vsite = vlist;
		// str += $("#jobsmy").attr('checked') ? "&m" : "";
		// prefs.vfilt.jobsmy = $("#jobsmy").attr('checked') ? true : false;
	}
	
	return str;
}
