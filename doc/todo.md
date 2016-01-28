* absolutely must:
  * get fs integration (open/save) working
    * but with node-fs or as a browser?
  * figure out bundling
    * don't use nwjs to manage nw.js, turns out that was a source of many problems
    * webpack +  codemirror minified + use strict = nw.js problems?
      * especially with opening devtools, at all?
    * get executables
      * `zip -r ../${PWD##*/}.nw *`
        * This makes a .nw (zip) for distribution
      * `nwbuild -p win64,osx64,linux64 -v 0.12.3 -f .`
        * `cat `which nw` app.nw > app && chmod +x app`
        * this would work with deployed/already bundled app, and turn into executable binary
* maybe actually mentioning licenses + those of dependencies, somewhere, would be a good idea.

* decisions to make:
  * saving to disk:
    * autosave at x ms
    * just a save option (as in traditional desktop editor)
    * constant streaming

* possible future options:
  * notifications
  * context menu
  * tray icon/menu
  * integrated fs explorer
  * desktop integration (using system mime-type detection, etc.)

