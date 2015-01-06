#meta-templater

##Installation

```
$ npm i meta-templater
```

##Usage

###Example

```html
@@if(voice) {
	<div>Hello, @@name</div>
}
```

```js
var MT = require('meta-templater'),
    html = require('fs').readFileSync('index.html', 'utf-8');

var templater = new MT;


temlater.addHandler('if', function (args, body, data) {
	if(args[0]) {
		return templater.parse(body, data);
	}
});


var result = templater.parse(html, {
	voice: true,
	name: 'John'
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

Prefix at the start of function construction or variable

#####options.suffix

Type: `String` Default: ``

Suffix after close of function construction or after variable

#####options.blockOpen

Type: `String` Default: `{`

Open function construction body

#####options.blockClose

Type: `String` Default: `}`

Close function construction body

####addHandler(name, handler);

Add analyzer for function construction

```js
function handler(args, body, data) {
  return 'string';
}
```

If `handler` will return `false` then construction will not be replaced

####removeHandler(name);

Remove analyzer


####use(name, args, body);

Calls analyzer

####parse(src, data);

Parses `src` string passing `data`


##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
