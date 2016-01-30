var reader = new FileReader()
  , cm     = CodeMirror
reader.readAsText(f)
reader.onload = function(){
  cm.setValue(reader.result)
}

