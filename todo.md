* Distribution (binaries)
* move away from firebase (_eventually_) -- minimongo? gundb?
* testing
* fs (save/load)
  * `fileReader` for reading in/saving out files
    * `examples.code.firepad.getText()`, etc.
    * `examples.code.firepad.codeMirror_.getValue()`, etc.
    * `firepad.getText()` (and `setText()`, and same with HTML) -- use on event to write to fs
    * codemirror's `doc.getValue()` and `.setValue`??
  * ui for dealing with files:
    * should we set up an autosave (at x ms or whatever)?
    * actual interface design bit -- where are we putting the open and save (filetree?)

    // codemirror config...
    // keyMap, mode, lineNumbers, etc.,
    extraKeys: {
      'Cmd-S'  : function(instance){savingFunction()}
    , 'Ctrl-S' : function(instance){savingFunction()}
    , 'Cmd-O'  : function(instance){openingFunction()}
    , 'Ctrl-O' : function(instance){openingFunction()}
    }

* desktop feature decisions:
  * notifications
  * context menu(s)
  * tray icon/menu
  * exploring fs in-app (rather than using native dialog)?
