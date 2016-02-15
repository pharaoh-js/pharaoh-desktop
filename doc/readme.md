* `todo.md` is pretty self-explanitory.
* `chromium-flags.md` is a longish list of flags that chromium can take when launching
  * NW.js can take many of these, too--these might be useful for us, specifically
* `examples` directory:
  * non-codemirror version works fine
  * two versions with codemirror _almost_ work just fine
  * saving-jq version is from a demo based on a csv issue or somesuch
  * editor in `examples/editor` works just fine, but is using cm 2 and `node-fs`...
  * `failed` directory is a bunch of little non-working attempts using `app/menu/Menu.jsx`

I now know what the problem has been: CodeMirror and Firepad haven't been accessible from our app.
Our instances of these weren't exposed. I'm still not entirely sure how to get them out,
but I went ahead and actually enabled the React extension to Chromium's developer tools, and...
`$r.firepad.setText()` and `.getText()` WORKS. So these methods are there! We can get to them!
Just need to figure out what the `$r` in the tools is actually doing for us, now. That's _got_ to be
documented somewhere, right?!

Accessing things from Firepad's website:
* `examples.code.firepad.getText()`, etc.
* `examples.code.firepad.codeMirror_.getValue()`, etc.

