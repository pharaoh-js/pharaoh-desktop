// html5 filesystem api stuff

// assume there's some html here somewheres
// <ul id="fileList"></ul>, for example
// also something like <script>
// window.requestFileSystem = window.requestFileSystem ||
// window.webkitRequestFileSystem </script>

// error handling
function errorHandler(error){
  var message = ''
  switch(error.code){
    case FileError.SECURITY_ERR:
      message = 'Security Error'
      break
    case FileError.NOT_FOUND_ERR:
      message = 'Not Found Error'
      break
    case FileError.QUOTA_EXCEEDED_ERR:
      message = 'Quota Exceeded Error'
      break
    case FileError.INVALID_MODIFICATION_ERR:
      message = 'Invalid Modification Error'
      break
    case FileError.INVALID_STATE_ERR:
      message = 'Invalid State Error'
      break
    default:
      message = 'Unknown Error'
      break
  }
  console.log(message)
}

// storage quota
// navigator.webkitTemporaryStorage || navigator.webkitPersistentStorage
navigator.webkitPersistentStorage.requestQuota(
  1024 * 1024 * 10,
  function(grantedSize){
    // request filesystem with new size
    window.requestFileSystem(window.PERSISTENT, grantedSize, function(filesystem){
      // do stuff with new (larger) filesystem
    }, errorHandler)
  }, function (error) {
    console.log('error', error)
  }
)

// desktop files
// <input type="file" id="filePicker" multiple>
// listen for change event (fired when user finished selecting files from desktop)
document.getElementById('filePicker').addEventListener('change', function(e){
// get selected files
  var files = this.files
// request filesystem
  window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
// copy files to filesystem
    for(var i = 0; i < files.length; i++){
      var file = files[i]
// create new file in app filesystem
      filesystem.root.getFile(file.name, {create: true, exclusive: true},
        function(fileEntry){
// create file writer
          fileEntry.createWriter(function(fileWriter){
// write contents of selected file to file in app filesystem
            fileWriter.write(file)
          }, errorHandler)
        }, errorHandler)
    }
  }, errorHandler)
})

// list files
// <ul id="fileList"></ul>
function toArray(list){
  return Array.prototype.slice.call(list || [], 0)
}
function listEntries(entries){
  var list = document.getElementById('fileList')
  entries.forEach(function(entry, i){
    var li = document.createElement('li')
    li.innerHTML = entry.name
    list.appendChild(li)
  })
}
function onInitFileSystem(filesystem){
  var dirReader = filesystem.root.createReader()
    , entries = []
    , readEntries = function(){
    dirReader.readEntries(function(results){
      if(!results.length){
        listEntries(entries.sort().reverse())
      } else {
        entries = entries.concat(toArray(results))
        readEntries()
      }
    }, errorHandler)
  }
  readEntries()
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

// create directory
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  filesystem.root.getDirectory('newDir', {create: true}, function(dirEntry){
// do stuff with new dir
  }, errorHandler)
}, errorHandler)

// create file
function onInitFileSystem(filesystem){
  filesystem.root.getFile('file.ext', {create: true, exclusive: true},
    function(fileEntry){
// do stuff with the new file
    }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

// read file
function onInitFileSystem(filesystem){
  filesystem.root.getFile('file.ext', {}, function(fileEntry){
    fileEntry.file(function (file){
      var reader = new FileReader()
      reader.onload = function(e){
        var viewerElement = document.createElement('pre')
        viewerElement.innerHTML = this.result
        document.body.appendChild(viewerElement)
      }
      reader.readAsText(file)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

// write file
function onInitFileSystem(filesystem){
  filesystem.root.getFile('file.ext', {create: true}, function(fileEntry){
    fileEntry.createWriter(function(fileWriter){
      fileWriter.onwriteend = function(e){
        console.log('wrote it')
      }
      fileWriter.onerror = function(e){
        console.log('error: ' + e.toString())
      }
      var contentBlob = new Blob(['foo'], {type: 'text/plain'})
      fileWriter.write(contentBlob)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

// copy directory
function copy(workingDirectory, source, destination){
  workingDirectory.getDirectory(source, {}, function(workingDirEntry){
    workingDirectory.getDirectory(destination, {}, function(dirEntry){
      workingDirEntry.copyTo(dirEntry)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  copy(filesystem.root, '/dir1', 'dir2/')
}, errorHandler)

// copy file
function copy(workingDirectory, source, destination){
  workingDirectory.getFile(source, {}, function(fileEntry){
    workingDirectory.getDirectory(destination, {}, function(dirEntry){
      fileEntry.copyTo(dirEntry)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  copy(filesystem.root, '/directory/file.ext', 'directory2/')
}, errorHandler)

//rename dir
function rename(workingDirectory, source, newName){
  workingDirectory.getDirectory(source, {}, function(dirEntry){
    dirEntry.moveTo(workingDirectory, newName)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  rename(filesystem.root, '/oldname', 'newname')
}, errorHandler)

//rename file
function rename(workingDirectory, source, newName){
  workingDirectory.getFile(source, {}, function(fileEntry){
    fileEntry.moveTo(workingDirectory, newName)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  rename(filesystem.root, 'oldname.ext', 'newname.ext')
}, errorHandler)

// move dir
function move(workingDirectory, source, destination){
  workingDirectory.getDirectory(source, {}, function(sourceDirEntry){
    workingDirectory.getDirectory(destination, {}, function(destDirEntry){
      sourceDirEntry.moveTo(destDirEntry)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  move(filesystem.root, '/one', '/two')
}, errorHandler)

// move file
function move(workingDirectory, source, directoryName){
  workingDirectory.getFile(source, {}, function(fileEntry){
    workingDirectory.getDirectory(directoryName, {}, function(dirEntry){
      fileEntry.moveTo(dirEntry)
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem){
  move(filesystem.root, '/file.ext', 'directory/')
}, errorHandler)

// remove directory
function onInitFileSystem(filesystem){
  filesystem.root.getDirectory('dirToDelete', {}, function(dirEntry){
    // remove dir
    dirEntry.removeRecursively(function(e){
      console.log('dir removed')
    }, errorHandler)
  }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

// remove file
function onInitFileSystem(filesystem){
  filesystem.root.getFile('file.ext', {create: false},
    function(fileEntry){
      fileEntry.remove(function(e){
        console.log('file removed')
      }, errorHandler)
    }, errorHandler)
}
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler)

