var test = require('tape'),
	Parser = require('../lib/parser');

test('Parser', function (t) {
	var p1 = new Parser({
			prefix: '{{',
			suffix: '}}',
			open: '(',
			close: ')'
		}),
		p2 = new Parser({
			prefix: '@@',
			suffix: '',
			open: 'begin',
			close: 'end'
		});

	t.plan(11);

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
			bodyIndex: 18,
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
			bodyIndex: 20,
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
			body: ' body1 ',
			bodyIndex: 90
		}
	]);

	t.deepEqual(p2.process(' content1 @@var_1  content2 @@fn_2{arg1, arg2}  content3 @@op_3[arg1, arg2,arg3]  begin body1 end  content4'), [
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
			arg: '{arg1, arg2}'
		},
		{
			type: 'op',
			start: 57,
			end: 97,
			name: 'op_3',
			arg: '[arg1, arg2,arg3]',
			body: ' body1 ',
			bodyIndex: 87
		}
	]);
});
