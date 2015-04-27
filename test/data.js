var test = require('tape'),
	MT = require('..');

test('Parsing with data', function (t) {
	var p = new MT;

	t.equal(
		p.build(' content  //=  var_name  content'),
		' content  //=  var_name  content'
	);

	t.equal(
		p.build(' content  //=  var_name  content', {
			var_name: 'value'
		}),
		' content  value  content'
	);

	t.equal(
		p.build(' content  //= include["examples/hdr.html", {hdr: "Header 1"}]  content'),
		' content  <h1>Header 1</h1>  content'
	);

	t.equal(
		p.build(' content  //= include["examples/hdr.html", {hdr: header}]  content'),
		' content  //= include["examples/hdr.html", {hdr: header}]  content'
	);

	t.equal(
		p.build(' content  //= include["examples/hdr.html"]  content', {
			hdr: "Header 1"
		}),
		' content  <h1>Header 1</h1>  content'
	);

	t.equal(
		p.build(' content  //= include["examples/hdr.html", { hdr: "Header 2" }]  content', {
			hdr: "Header 1"
		}),
		' content  <h1>Header 2</h1>  content'
	);

	t.equal(
		p.build(' content  //= print ( //= include["examples/hdr.html", { hdr: "Header 2" }] ) content', {
			hdr: "Header 1"
		}),
		' content   //= include["examples/hdr.html", { hdr: "Header 2" }]  content'
	);

	t.end();
});
