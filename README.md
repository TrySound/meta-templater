# meta-templater

Flexible templates parser inspired by [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include).

## Installation

```
$ npm i meta-templater
```

## Theory

Template has three types of constructions:

### var

`//= var_name`

Where `//=` is prefix and suffix is empty

### fn

`//= include[]`

Where `include` is `fn` name and `[]` is argument js object (array)

### op

`//= print ( content )`

`//= each[] ()`

Where arguments is optinal and `()` is body of `op`


## Initialize

compile.js
```js
var MT = require('meta-templater'),
	fs = require('fs');

var result = new MT().build(fs.readFileSync('src/index.html', 'utf-8'), {
	param1: true,
	param2: 'John'
});

fs.writeFileSync('dist/index.html', result, 'utf-8');
```

## Examples

### Condition Handler

index.html
```html
//= if[data.voice] (
	<div>Hello, //= name</div>
)
```

### Include Handler

index.html
```html
<html>
	//= include['head.html', {title: 'Page Title'}]
	
	<body>
		//= include['header.html']
		//= include['content-main.html']
		//= include['footer.html']
	</body>
</html>
```

head.html
```html
<!-- Empty string for indent correction -->
	<head>
		<meta charset="utf-8">
		<title>//= title</title>
	</head>

```


## API

### new MT(options);

Initialize templater

#### options.prefix

Type: `String` Default: `//=`

#### options.suffix

Type: `String` Default: ``

#### options.open

Type: `String` Default: `(`

#### options.close

Type: `String` Default: `)`

### Methods

#### addFn(name, handler);

#### addOp(name, handler);

### Handler `this` methods

#### build(input || body, data)

#### flatten(input || body)


##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
