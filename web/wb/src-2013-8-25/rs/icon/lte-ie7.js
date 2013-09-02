/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-rss' : '&#xf17b;',
			'icon-chat' : '&#xe000;',
			'icon-bookmark' : '&#xe001;',
			'icon-book' : '&#xe002;',
			'icon-cog' : '&#xe003;',
			'icon-monitor' : '&#xe004;',
			'icon-star' : '&#xe005;',
			'icon-heart' : '&#xe006;',
			'icon-th-large' : '&#xf009;',
			'icon-comment' : '&#xf075;',
			'icon-comments' : '&#xf086;',
			'icon-thumbs-up' : '&#xf087;',
			'icon-thumbs-down' : '&#xf088;',
			'icon-cogs' : '&#xf085;',
			'icon-edit' : '&#xf044;',
			'icon-desktop' : '&#xf108;',
			'icon-power' : '&#xe007;',
			'icon-users' : '&#xe00d;',
			'icon-wrench' : '&#xe008;',
			'icon-truck' : '&#xe009;',
			'icon-bookmark-2' : '&#xe00a;',
			'icon-bookmarks' : '&#xe00b;',
			'icon-tree' : '&#xe00c;',
			'icon-wrench-2' : '&#xe00e;',
			'icon-stats' : '&#xe00f;',
			'icon-database' : '&#xe010;',
			'icon-cog-2' : '&#xe011;',
			'icon-wrench-3' : '&#xe012;',
			'icon-chart' : '&#xe013;',
			'icon-umbrella' : '&#xe014;',
			'icon-star-2' : '&#xe015;',
			'icon-address-book' : '&#xe016;',
			'icon-calendar' : '&#xe017;',
			'icon-enter' : '&#xe018;',
			'icon-exit' : '&#xe019;',
			'icon-stats-2' : '&#xe01a;',
			'icon-bars' : '&#xe01b;',
			'icon-alarm' : '&#xe01c;',
			'icon-table' : '&#xf0ce;',
			'icon-screen' : '&#xe01d;',
			'icon-list' : '&#xe01e;',
			'icon-dollar' : '&#xe021;',
			'icon-coins' : '&#xe022;',
			'icon-profile' : '&#xe023;',
			'icon-justice' : '&#xe024;',
			'icon-stats-3' : '&#xe025;',
			'icon-stats-4' : '&#xe026;',
			'icon-abacus' : '&#xe027;',
			'icon-tools' : '&#xe028;',
			'icon-chart-2' : '&#xe029;',
			'icon-suitcase' : '&#xe02a;',
			'icon-suitcase-2' : '&#xe02b;',
			'icon-stocks' : '&#xf250;',
			'icon-barcode' : '&#xf276;',
			'icon-cash' : '&#xf27b;',
			'icon-paintbrush' : '&#xf1e8;',
			'icon-resellerhosting' : '&#xf03a;',
			'icon-user' : '&#xe02c;',
			'icon-star-empty' : '&#xe02d;',
			'icon-star-3' : '&#xe02e;',
			'icon-folder-close-alt' : '&#xf114;',
			'icon-folder-open-alt' : '&#xf115;',
			'icon-star-empty-2' : '&#xf006;',
			'icon-star-4' : '&#xf005;',
			'icon-switch' : '&#xe038;',
			'icon-wrench-4' : '&#xf05b;',
			'icon-angle-left' : '&#xf104;',
			'icon-angle-right' : '&#xf105;',
			'icon-angle-up' : '&#xf106;',
			'icon-angle-down' : '&#xf107;',
			'icon-home' : '&#xe02f;',
			'icon-home-2' : '&#xe030;',
			'icon-home-3' : '&#xe031;',
			'icon-cloud' : '&#xe036;',
			'icon-apple' : '&#xe037;',
			'icon-forward' : '&#xe039;',
			'icon-paperclip' : '&#xe032;',
			'icon-trash' : '&#xf014;',
			'icon-ok' : '&#xf00c;',
			'icon-remove' : '&#xf00d;',
			'icon-checkmark' : '&#xe01f;',
			'icon-checkmark-2' : '&#xe020;',
			'icon-cancel' : '&#xe033;',
			'icon-caret-down' : '&#xf0d7;',
			'icon-caret-up' : '&#xf0d8;',
			'icon-caret-left' : '&#xf0d9;',
			'icon-caret-right' : '&#xf0da;',
			'icon-info' : '&#xf129;',
			'icon-exclamation' : '&#xf12a;',
			'icon-question' : '&#xf128;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};