#meta-templater

##Usage

###Install

```
$ npm i meta-templater
```


###API

####new Templater(options);

#####options.parseVars

Type: `Boolean` Default: `true`

#####options.prefix

Type: `String` Default: `@@`

#####options.suffix

Type: `String` Default: ``

#####options.blockOpen

Type: `String` Default: `{`

#####options.blockClose

Type: `String` Default: `}`


####addHandler(name, handler);

```js
function handler(args, body, data) {
  return 'string';
}
```

If `handler` will return `false` then construction will not be replaced

####removeHandler(name);

####parse(src, data);
