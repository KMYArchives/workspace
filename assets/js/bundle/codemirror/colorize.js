!function(mod){"object"==typeof exports&&"object"==typeof module?mod(require("codemirror"),require("runmode")):"function"==typeof define&&define.amd?define(["codemirror","runmode"],mod):mod(CodeMirror)}((function(CodeMirror){"use strict";var isBlock=/^(p|li|div|h\\d|pre|blockquote|td)$/;function textContent(node,out){if(3==node.nodeType)return out.push(node.nodeValue);for(var ch=node.firstChild;ch;ch=ch.nextSibling)textContent(ch,out),isBlock.test(node.nodeType)&&out.push("\n")}CodeMirror.colorize=function(collection,defaultMode){collection||(collection=document.body.getElementsByTagName("pre"));for(var i=0;i<collection.length;++i){var node=collection[i],mode=node.getAttribute("data-lang")||defaultMode;if(mode){var text=[];textContent(node,text),node.innerHTML="",CodeMirror.runMode(text.join(""),mode,node),node.className+=" cm-s-default"}}}}));