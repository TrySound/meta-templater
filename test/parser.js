var test = require('tape'),
	Parser = require('../lib/parser');

test('Parser', function (t) {
	var p1 = new Parser({
			prefix: '{{',
			suffix: '}}',
			open: '(',
			close: ')',
			arg: 'json'
		}),
		p2 = new Parser({
			prefix: '@@',
			suffix: '',
			open: 'begin',
			close: 'end',
			arg: 'round'
		});

	t.deepEqual(p1.process(' content 1 {{ }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ /va }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va/[] }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va{} / () }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va/() }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va{} () / }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va () / }} content2'), []);

	t.deepEqual(p1.process(' content 1 {{ va () }} content2'), [
		{
			type: 'op',
			name: 'va',
			body: '',
			start: 11,
			end: 22
		}
	]);

	t.deepEqual(p1.process(' content 1 {{ va{} () }} content2'), [
		{
			type: 'op',
			name: 'va',
			arg: '{}',
			body: '',
			start: 11,
			end: 24
		}
	]);

	t.deepEqual(p1.process([
		' content1 {{ var_1 }} content2',
		' {{ fn_2{arg1, arg2} }} content3',
		' {{ op_3[arg1, arg2,arg3]  ( body1 ) }} content4'
	].join('')), [
		{
			type: 'var',
			start: 10,
			end: 21,
			name: 'var_1'
		},
		{
			type: 'fn',
			start: 31,
			end: 53,
			name: 'fn_2',
			arg: '{arg1, arg2}'
		},
		{
			type: 'op',
			start: 63,
			end: 101,
			name: 'op_3',
			arg: '[arg1, arg2,arg3]',
			body: ' body1 '
		}
	]);

	t.deepEqual(p2.process(' content1 @@var_1  content2 @@fn_2(arg1, arg2)  content3 @@op_3(arg1, arg2,arg3)  begin body1 end  content4 @@op_4 begin body2 end  content5'), [
		{
			type: 'var',
			start: 10,
			end: 17,
			name: 'var_1'
		},
		{
			type: 'fn',
			start: 28,
			end: 46,
			name: 'fn_2',
			arg: '(arg1, arg2)'
		},
		{
			type: 'op',
			start: 57,
			end: 97,
			name: 'op_3',
			arg: '(arg1, arg2,arg3)',
			body: ' body1 '
		},
		{
			type: 'op',
			start: 108,
			end: 130,
			name: 'op_4',
			body: ' body2 '
		}
	]);

	t.end();
});
