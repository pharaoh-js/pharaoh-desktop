makeFirePad (subRef, config) {
    let fpRef = new Firebase(BASEREF + subRef);
    let codeMirror = CodeMirror(document.getElementById('pad'), config);
    this.firepad = Firepad.fromCodeMirror(fpRef, codeMirror, // this is the line we're having trouble with
      { defaultText: 'Hello Firepad!!!!' });
  },
