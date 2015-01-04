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


##License

The MIT License (MIT)

Copyright (c) 2015 Bogdan Chadkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
