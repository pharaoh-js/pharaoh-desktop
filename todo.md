zip -r ../${PWD##*/}.nw *
This makes a .nw (zip) for distribution

OR

when deployment is ready, let's work with that, because otherwise we'd need webpack and stuff running, which is
annoying, yes? then, just:
nwbuild -p win64,osx64,linux64 -v 0.12.3 -f .
then, to turn this into an executable, just:
cat `which nw` app.nw > app && chmod +x app

* right now, these are the options i have available, working with nwjs:
  * notifications
  * context menu
  * tray icon/menu
  * integrated (system) file explorer
  * desktop integration (with mime-type detection, etc)

* there are some things i'm not 100% sure about (how were doing them):
  * what's the recommended way to get files from/to firebase and (real) fs?
    * streams, but there are better libs out there than just node-fs methods
  * dumping to disk: as stream? autosave on x ms? or just a button for this?

