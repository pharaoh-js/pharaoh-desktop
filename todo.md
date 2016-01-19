* right now, these are the options i have available, working with nwjs:
  * notifications
  * context menu
  * tray icon/menu
  * integrated (system) file explorer
  * desktop integration (with mime-type detection, etc)
  * nwjs can use chromium's flags (this is kind of a big deal, possibly)
    * (full reference, kept updated, [here](http://peter.sh/experiments/chromium-command-line-switches/))
    * see chromium-flags.md for a short (actually still pretty long) list of ones we might use

* there are some things i'm not 100% sure about (how were doing them):
  * what is being written to first, in the case of new files?
  * what's the recommended way to get files from/to firebase and (real) fs?
  * streams, but there are better libs out there than just node-fs methods
  * so far i'm keeping the desktop client exactly up-to-date with pharaoh-js/pharaoh@master; design-wise, how much do we want to vary this?
  * dumping to disk: as stream? autosave on x ms? or just a button for this?

and regarding codemirror, i'm kind of thinking that, until we know for sure how (or if) we'll be dynamically loading
modes/themes/addons, it's going to be difficult to work out a step in the build process (using webpack, anyway).
i could throw gulp in the mix and have it taken care of, but it might be easiest to just set a `prestart` in
`npm-scripts` (which would run when you do `npm start`, but finish _before_ it actually runs the `start` script) using
something like `cssmin` or `csso` (and `uglify` or `jsmin` or something similar, since codemirror's all vanilla js and
doesn't need any compilation). this would free up a good bit of time that'd otherwise be lost to webpack tomfoolery.


