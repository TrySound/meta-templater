#meta-templater

##Install

```
$ npm i meta-templater
```


##API

###new Templater(options);

####options.parseVars

Type: `Boolean` Default: `true`

####options.prefix

Type: `String` Default: `@@`

####options.suffix

Type: `String` Default: ``

####options.blockOpen

Type: `String` Default: `{`

####options.blockClose

Type: `String` Default: `}`


###Methods

###addHandler(name, handler);

```js
function handler(args, body, data) {
  return 'string';
}
```

###removeHandler(name);

###parse(src, data);
