#meta-templater

##Usage

###Install

```
$ npm i meta-templater
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

####parse(src, data);

Parses `src` string passing `data`


##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
