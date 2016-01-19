right now, these are the options i have available, working with nwjs:
* notifications
* context menu
* tray icon/menu
* integrated (system) file explorer
* desktop integration (with mime-type detection, etc)

also, things i'm not 100% sure on how we're doing, but there are options about:
* what is being written to first, in the case of new files?
* what's the recommended way to get files from/to firebase and (real) fs?
* streams, but there are better libs out there than just node-fs methods
* so far i'm keeping the desktop client exactly up-to-date with pharaoh-js/pharaoh@master; design-wise, how much do we want to vary this?
* dumping to disk: as stream? autosave on x ms? or just a button for this?

check this: http://peter.sh/experiments/chromium-command-line-switches/

