function saveText(){

  var c = document.getElementsByClassName('CodeMirror-line')
    , l = c.length
    , d = []
    , b = new Blob([w], {type:'text/plain'})
    , f = this.state.activeFile

  function getText(){
    for (var i = 0; i < l; i++){
      d.push(c[i].innerText)
    }
    return d.join('\n')
  }
  saveAs(b, f)
}


var d=[],c=document.getElementsByClassName('CodeMirror-line'),l=c.length
function getText(){for(var i=0;i<l;i++){d.push(c[i].innerText)}return d.join('\n')}

