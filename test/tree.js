var test = require('tape'),
	Parser = require('../lib/parser'),
	tree = require('../lib/tree');

test('Tree', function (t) {
	var p1 = new Parser({
			prefix: '{{',
			suffix: '}}',
			open: '(',
			close: ')'
		}),
		p2 = new Parser({
			prefix: '@@',
			suffix: '',
			open: '{',
			close: '}'
		});

	t.plan(3);

	t.deepEqual(tree(p1)(' content1 content2 content3 '), [
		{
			type: 'text',
			start: 0,
			end: 28,
			input: ' content1 content2 content3 '
		}
	]);

	var input1 = [
		' content1 {{ var_1 }} content2',
		' {{ fn_2{arg1, arg2} }} content3',
		' {{ op_3[arg1, arg2,arg3]  ( body1 ) }} content4 '
	].join('');

	t.deepEqual(tree(p1)(input1), [
		{
			type: 'text',
			start: 0,
			end: 10,
			input: ' content1 '
		},
		{
			type: 'var',
			start: 10,
			end: 21,
			name: 'var_1',
			input: '{{ var_1 }}'
		},
		{
			type: 'text',
			start: 21,
			end: 31,
			input: ' content2 '
		},
		{
			type: 'fn',
			start: 31,
			end: 53,
			name: 'fn_2',
			arg: '{arg1, arg2}',
			input: '{{ fn_2{arg1, arg2} }}'
		},
		{
			type: 'text',
			start: 53,
			end: 63,
			input: ' content3 '
		},
		{
			type: 'op',
			start: 63,
			end: 101,
			name: 'op_3',
			arg: '[arg1, arg2,arg3]',
			body: ' body1 ',
			bodyIndex: 90,
			children: [
				{
					type: 'text',
					parentIndex: 90,
					start: 0,
					end: 7,
					input: ' body1 '
				}
			],
			input: '{{ op_3[arg1, arg2,arg3]  ( body1 ) }}'
		},
		{
			type: 'text',
			start: 101,
			end: 111,
			input: ' content4 '
		}
	]);

	var input2 = [
		'@@var_1  content2',
		' @@fn_2{arg1, arg2}  content3',
		' @@op_3[arg1, arg2,arg3]  { @@body1 }'
	].join('');

	t.deepEqual(tree(p2)(input2), [
		{
			type: 'var',
			start: 0,
			end: 7,
			name: 'var_1',
			input: '@@var_1'
		},
		{
			type: 'text',
			start: 7,
			end: 18,
			input: '  content2 '
		},
		{
			type: 'fn',
			start: 18,
			end: 36,
			name: 'fn_2',
			arg: '{arg1, arg2}',
			input: '@@fn_2{arg1, arg2}'
		},
		{
			type: 'text',
			start: 36,
			end: 47,
			input: '  content3 '
		},
		{
			type: 'op',
			start: 47,
			end: 83,
			name: 'op_3',
			arg: '[arg1, arg2,arg3]',
			body: ' @@body1 ',
			bodyIndex: 73,
			children: [
				{
					type: 'text',
					parentIndex: 73,
					start: 0,
					end: 1,
					input: ' '
				},
				{
					type: 'var',
					parentIndex: 73,
					start: 1,
					end: 8,
					name: 'body1',
					input: '@@body1'
				},
				{
					type: 'text',
					parentIndex: 73,
					start: 8,
					end: 9,
					input: ' '
				}
			],
			input: '@@op_3[arg1, arg2,arg3]  { @@body1 }'
		}
	]);
});
