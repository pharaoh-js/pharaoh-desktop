* absolutely must:
  * get fs integration (open/save) working

* running on nw.js:
  * webpack, codemirror, use strict = issues for nw.js
  * turns out the nwjs module is why themes and filetree have been broken
  * `zip -r ../${PWD##*/}.nw *`
    * This makes a .nw (zip) for distribution
  * `nwbuild -p win64,osx64,linux64 -v 0.12.3 -f .`
    * `cat `which nw` app.nw > app && chmod +x app`
      * this would work with deployed/already bundled app, and turn into executable binary

* possible future options:
  * notifications
  * context menu
  * tray icon/menu
  * integrated fs explorer
  * desktop integration (using system mime-type detection, etc.)

* decisions to make:
  * saving to disk:
    * autosave at x ms
    * just a save option (as in traditional desktop editor)
    * constant streaming

* I guess actually mention the licensing of things at some point, somewhere?

