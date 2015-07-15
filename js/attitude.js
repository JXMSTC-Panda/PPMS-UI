//Attitude by Valerio Proietti (http://mad4milk.net) BSD license.
//v 0.5 beta

var Attitude = {
	getSelector: function(selector){
		var args = selector.split(' ');
		var params = [];
		for (var j=0; arg=args[j]; j++) {
			params[j] = param = [];
			if (args[j].indexOf('#') > -1) {
				var bits = arg.split('#');
				param['tag'] = bits[0] || '*';
				param['id'] = bits[1];
			}
			else if (args[j].indexOf('.') > -1) {
				var bits = arg.split('.');
				param['tag'] = bits[0] || '*';
				param['class'] = bits[1];
			}
			else {
				param['tag'] = arg;
			}
		}
		this.filter = [document];
		for (var k=0; param=params[k] ;k++){
			if (k == 0 && param['id']) {
				var id = document.getElementById(param['id']);
				if (param['tag'] == '*' || id.tagName.toLowerCase() == param['tag'])
					this.filter = [id];
				else return [];
				continue;
			}
			this.filter = this._getElementsWithTagName(param['tag']);
			if (param['class']) this.filter = this._getElementsWithClassName(param['class']);
			else if (param['id']) this.filter = this._getElementsWithId(param['id']);
		}
		return this.filter;
	},

	sheets: [],

	append: function(sheet){
		this.sheets.push(sheet);
	},

	start: function(){
		for (var i=0; sheet=this.sheets[i]; i++) this.update(sheet);
	},

	update: function(sheet){ //based on Behaviour by Ben Nolan (http://bennolan.com/behaviour/)
		for (selector in sheet){
			var combs = selector.split(',');
			for (c=0; comb=combs[c]; c++) {
				var elements = Attitude.getSelector(comb.replace(/^\s*|\s*$/g,"")) || null;
				for (var i=0; element=elements[i]; i++) sheet[selector](element);
			}
		}
	},

	_getElementsWithId: function(id){
		var found = [];
		for (var i = 0; el=this.filter[i]; i++) {
			if (el.id == id) found.push(el);
		}
		return found;
	},

	_getElementsWithClassName: function(className){
		var found = [];
		for (var i = 0; el=this.filter[i]; i++) {
			var a = el.className.split(' ');
			for (var h=0; b=a[h]; h++) { if (b == className) found.push(el);}
		}
		return found;
	},

	_getElementsWithTagName: function(tagName){
		var found = [];
		for (var i=0; el=this.filter[i]; i++){
			var tagNames = el.getElementsByTagName(tagName);
			for (var j=0; taag=tagNames[j]; j++) found.push(taag);
		}
		return found;
	}
};

function $S() {
	if (arguments.length == 1){
		if(typeof arguments[0] == 'string') {
			if (arguments[0].charAt(0) == '#' && arguments[0].indexOf(' ') == -1) return document.getElementById(arguments[0].slice(1)) || null;
			return Attitude.getSelector(arguments[0]);
		}
		else return arguments[0];
	}
	var elements = [];
	for (var i=0; sel=arguments[i]; i++){
		if (typeof sel == 'string') {
			var lel = Attitude.getSelector(sel);
			for (h=0;el=lel[h];h++) elements.push(el);
		}
		else elements.push(sel);
	}
	return elements;
}

Array.prototype.action = function(actions){
	for(var i=0;el=this[i];i++){
		if (actions.initialize) actions.initialize(el);
		for(action in actions){
			if (action.slice(0,2) == 'on') el[action] = actions[action];
		}
	}
};