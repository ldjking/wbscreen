/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-ok' : '&#xf00c;',
			'icon-plus' : '&#xf067;',
			'icon-minus' : '&#xf068;',
			'icon-female' : '&#xf182;',
			'icon-male' : '&#xf183;',
			'icon-windows' : '&#xf17a;',
			'icon-apple' : '&#xf179;',
			'icon-android' : '&#xf17b;',
			'icon-linux' : '&#xf17c;',
			'icon-trashcan' : '&#xe000;',
			'icon-websitebuilder' : '&#xf034;',
			'icon-remove' : '&#xf00d;',
			'icon-trash' : '&#xf0ce;',
			'icon-untitled' : '&#xe001;',
			'icon-untitled-2' : '&#xe002;',
			'icon-untitled-3' : '&#xe003;',
			'icon-untitled-4' : '&#xe004;',
			'icon-untitled-5' : '&#xe005;',
			'icon-untitled-6' : '&#xe006;',
			'icon-untitled-7' : '&#xe007;',
			'icon-untitled-8' : '&#xe008;',
			'icon-untitled-9' : '&#xf009;',
			'icon-untitled-10' : '&#xf075;',
			'icon-untitled-11' : '&#xf086;',
			'icon-untitled-12' : '&#xf085;',
			'icon-untitled-13' : '&#xf044;',
			'icon-untitled-14' : '&#xf108;',
			'icon-untitled-15' : '&#xe009;',
			'icon-untitled-16' : '&#xe00b;',
			'icon-untitled-17' : '&#xe00c;',
			'icon-untitled-18' : '&#xe00e;',
			'icon-untitled-19' : '&#xe011;',
			'icon-untitled-20' : '&#xe012;',
			'icon-untitled-21' : '&#xe014;',
			'icon-untitled-22' : '&#xe015;',
			'icon-untitled-23' : '&#xe016;',
			'icon-untitled-24' : '&#xe017;',
			'icon-untitled-25' : '&#xe018;',
			'icon-untitled-26' : '&#xe019;',
			'icon-untitled-27' : '&#xe01a;',
			'icon-untitled-28' : '&#xe01b;',
			'icon-untitled-29' : '&#xe01c;',
			'icon-untitled-30' : '&#xe00a;',
			'icon-untitled-31' : '&#xe025;',
			'icon-untitled-32' : '&#xe026;',
			'icon-untitled-33' : '&#xe027;',
			'icon-untitled-34' : '&#xe028;',
			'icon-untitled-35' : '&#xe029;',
			'icon-untitled-36' : '&#xe02a;',
			'icon-untitled-37' : '&#xe02b;',
			'icon-untitled-38' : '&#xf250;',
			'icon-untitled-39' : '&#xe02c;',
			'icon-untitled-40' : '&#xf114;',
			'icon-untitled-41' : '&#xf115;',
			'icon-untitled-42' : '&#xf006;',
			'icon-untitled-43' : '&#xf005;',
			'icon-untitled-44' : '&#xe038;',
			'icon-untitled-45' : '&#xf05b;',
			'icon-untitled-46' : '&#xe00d;',
			'icon-untitled-47' : '&#xe00f;',
			'icon-untitled-48' : '&#xe010;',
			'icon-untitled-49' : '&#xe013;',
			'icon-untitled-50' : '&#xe01d;',
			'icon-untitled-51' : '&#xe01e;',
			'icon-untitled-52' : '&#xe020;',
			'icon-untitled-53' : '&#xe023;'
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