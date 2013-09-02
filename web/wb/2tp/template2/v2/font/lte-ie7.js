/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-home' : '&#xe000;',
			'icon-home-2' : '&#xe001;',
			'icon-home-3' : '&#xe002;',
			'icon-redo' : '&#xe003;',
			'icon-undo' : '&#xe004;',
			'icon-forward' : '&#xe005;',
			'icon-reply' : '&#xe006;',
			'icon-users' : '&#xe007;',
			'icon-user' : '&#xe008;',
			'icon-user-2' : '&#xe009;',
			'icon-switch' : '&#xe00a;',
			'icon-enter' : '&#xe00b;',
			'icon-exit' : '&#xe00c;',
			'icon-wrench' : '&#xe00d;',
			'icon-flag' : '&#xe00e;',
			'icon-bookmark' : '&#xe00f;',
			'icon-bookmarks' : '&#xe010;',
			'icon-cog' : '&#xe011;',
			'icon-switch-2' : '&#xe012;',
			'icon-trashcan' : '&#xe013;',
			'icon-forward-2' : '&#xe014;',
			'icon-arrow-right' : '&#xe015;',
			'icon-arrow-left' : '&#xe016;',
			'icon-arrow-up' : '&#xe017;',
			'icon-checkmark' : '&#xe018;',
			'icon-cancel' : '&#xe019;',
			'icon-paperclip' : '&#xe01a;',
			'icon-cog-2' : '&#xe01b;',
			'icon-star' : '&#xe01c;',
			'icon-folder-close-alt' : '&#xf114;',
			'icon-folder-open-alt' : '&#xf115;',
			'icon-expand-alt' : '&#xf116;',
			'icon-collapse-alt' : '&#xf117;',
			'icon-envelope-alt' : '&#xf0e0;',
			'icon-folder-open' : '&#xf07c;',
			'icon-folder-close' : '&#xf07b;',
			'icon-question-sign' : '&#xf059;',
			'icon-cog-3' : '&#xf013;',
			'icon-off' : '&#xf011;',
			'icon-check' : '&#xf046;',
			'icon-signout' : '&#xf08b;',
			'icon-upload-alt' : '&#xf093;',
			'icon-sitemap' : '&#xf0e8;',
			'icon-question' : '&#xf128;',
			'icon-info' : '&#xf129;',
			'icon-exclamation' : '&#xf12a;'
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