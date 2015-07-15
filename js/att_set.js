var count=0;
var allStretch, linktextsize;

var istefv4_Set = {
	'body': function() {
		ScrollLinks.start();
	},
		
	'#left-area': function(element) {
		linktextsize = new fx.RememberText(element);
		var divs = $S(".slide");
		allStretch = new fx.MultiFadeSize(divs, {duration: 400});
	},
	
	'div.r-box': function(element){
		Element.cleanWhitespace(element);
	},
	
	'div.handle': function(h5) {
		count +=1;
		var div = h5.nextSibling;
		if (count !=1) allStretch.hide(div, 'height');
		h5.onclick = function() {
			if (allStretch) allStretch.showThisHideOpen(div, 0, 'height');
		}
	}
};

Attitude.append(istefv4_Set);
var ScrollLinks = {
	currentHash: false,
	start: function(){
		this.scroll = new fx.Scroll({duration: 800, onComplete: function(){this.end();}.bind(this)});
		this.allinks = $S('a');
		this.allinks.action({
			initialize: function(lnk){
				if ((lnk.href && lnk.href.indexOf('#') != -1) && ( (lnk.pathname == location.pathname) || ('/'+lnk.pathname == location.pathname) ) && (lnk.search == location.search)) {
					lnk.onclick = function(){
						ScrollLinks.scroll.clearTimer();
						this.initialHref = this.href;
						this.initialHash = this.hash;
						this.href = "javascript:void(0)";
						setTimeout(function(){this.href = this.initialHref;}.bind(this), 200);
						ScrollLinks.go(this);
					}
				}
			}
		});
	},

	go: function(link){
		this.currentHash = link.initialHash.slice(1);
		if (this.currentHash) {
			this.allinks.action({
				initialize: function(lnk){
					if (lnk.id == ScrollLinks.currentHash){
						if (!window.opera) ScrollLinks.scroll.scrollTo(lnk);
						else ScrollLinks.scroll.scrollTo(lnk.parentNode);
						return;
					}
				}
			});
		}
	},

	end: function(){
		if (!/Konqueror|Safari|KHTML/.test(navigator.userAgent)) window.location.hash = "#"+this.currentHash;
		this.currentHash = false;
	}
}


function grin(tag) {
	var myField;
	if (document.getElementById('content') && document.getElementById('content').type == 'textarea') {
		myField = document.getElementById('content');
	}
	else if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
		myField = document.getElementById('comment');
	}
	else {
		return false;
	}
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = tag;
		myField.focus();
	}
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var cursorPos = endPos;
		myField.value = myField.value.substring(0, startPos)
					  + tag
					  + myField.value.substring(endPos, myField.value.length);
		cursorPos += tag.length;
		myField.focus();
		myField.selectionStart = cursorPos;
		myField.selectionEnd = cursorPos;
	}
	else {
		myField.value += tag;
		myField.focus();
	}
}


function deliciousThis( _href, _title) {
	var deliLink;
	deliLink = 'http://del.icio.us/post?v=2';
	deliLink += '&amp;url=' + encodeURIComponent(_href);
	deliLink += '&amp;title=' + encodeURIComponent(_title);
	window.location.href = deliLink;
	return false;
}