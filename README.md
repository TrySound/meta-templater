[![NPM version][npm-url]
[![License][license-url]


#meta-templater

Flexible templates parser inspired by [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include).

##Installation

```
$ npm i meta-templater
```

## Theory

Template has two types of constructions:

###Variable

*Prefix*Name*Suffix*

Where `Suffix` is optional

For example:
- {prefix: `'@@'`, suffix: `'@'`}: `@@name` or `@@name@`
- {prefix: `'<!-- @@'`, suffix: `' -->'`}: `<!-- @@name -->` or `<!-- @@name`

###Function

Has an optional suffix and body

*Prefix*Name()*Suffix*

or

*Prefix*Name() *bodyOpen* *bodyCloseSuffix*

Example with {prefix: `'<!-- @@'`, suffix: `' -->'`}:

```
<!-- @@name(arguments)
<!-- @@name(arguments) -->
<!-- @@name(arguments) { }
<!-- @@name(arguments) { } -->
```

`arguments` parses like js function arguments. When it errors, empty array will be passed to handler.

If `body` doesn't exists, undefined will be passed to handler.


##Usage

###Initialize

compile.js
```js
var MT = require('meta-templater'),
    fs = require('fs');

var templater = new MT;

// Handlers Declaration

var result = templater.parse(fs.readFileSync('src/index.html', 'utf-8'), {
	voice: true,
	name: 'John'
});

fs.writeFileSync('dist/index.html', result, 'utf-8');
```

###Examples

####Condition Handler

index.html
```html
@@if(voice) {
	<div>Hello, @@name</div>
}
```

index.js Handler
```js
temlater.addHandler('if', function (args, body, data) {
	if(args[0]) {
		return templater.parse(body, data);
	}
});
```

####Include Handler

index.html
```html
<html>
	@@include('head.html', {title: 'Page Title'})
	
	<body>
		@@include('header.html')
		@@include('content-main.html')
		@@include('footer.html')
	</body>
</html>
```

head.html
```html
<!-- Empty string for indent correction -->
	<head>
		<meta charset="utf-8">
		<title>@@title</title>
	</head>

```

index.js Handler
```js
temlater.addHandler('include', function (args, body, data) {
	if(typeof args[0] === 'string') {
		// 0: filename, 1: include data
		return templater.parse(fs.readFileSync(args[0], 'utf-8'), args[1]);
	}
});
```


###API

####new Templater(options);

Initialize templater

#####options.parseVars

Type: `Boolean` Default: `true`

`false` will prevent replacing variables

#####options.prefix

Type: `String` Default: `@@`

Prefix at the start of function or variable

#####options.suffix

Type: `String` Default: ``

Suffix after close of function or after variable

#####options.bodyOpen

Type: `String` Default: `{`

Open function body

#####options.bodyClose

Type: `String` Default: `}`

Close function body

####addHandler(name, handler);

Add analyzer for function

```js
function handler(args, body, data) {
  return this.use('include', args[0]) + '\nBEGIN\n' + this.parse(body, data) + '\nEND';
}
```

If `handler` will return `false` then function will not be replaced

####removeHandler(name);

Remove analyzer


####use(name, args, body);

Calls analyzer

####parse(src, data);

Parses `src` string passing `data`


##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin

[npm-url]: https://www.npmjs.com/package/meta-templater
[license-url]: https://github.com/TrySound/meta-templater/blob/master/LICENSE
