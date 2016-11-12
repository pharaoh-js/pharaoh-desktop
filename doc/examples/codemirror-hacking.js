function saveText(){

  var c = document.getElementsByClassName('CodeMirror-line')
    , l = c.length
    , d = []
    , w = d
    , b = new Blob([w], {type:'text/plain'})
    , f = this.state.activeFile

  for (var i = 0; i < l; i++){
      d.push(c[i].innerText)
    return d
  }

}

