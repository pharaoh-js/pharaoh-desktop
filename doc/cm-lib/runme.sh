#!/usr/bin/env bash

# all this does is run the `compress.sh` in this same directory, using all the options,
# modes, flags, etc. that we need.

/compress.sh codemirror comment placeholder fullscreen closebrackets closetag matchbrackets matchtags brace-fold comment-fold foldcode foldgutter indent-fold xml-fold css-hint anyword-hint javascript-hint show-hint xml-hint coffeescript-lint css-lint html-lint javascript-lint json-lint lint.js yaml-lint loadmode scrollpastend search jump-to-line searchcursor match-highlighter matchesonscrollbar active-line mark-selection selection-pointer clojure coffeescript commonlisp css elm gfm go haskell jade javascript lua markdown perl php ruby python sass scheme shell sql stylus swift vue xml yaml htmlembedded htmlmixed jsx --local /usr/local/lib/node_modules/uglifyjs/bin/uglifyjs > cm.min.js

