chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else if (request.method == "replaceSelection")
      sendResponse({data: window.replaceSelection(request.selectedText, request.processedText)});
    else if (request.method == "decryptSelection")
      sendResponse({data: window.decryptSelection(request.selectedText, request.processedText)});
    else
      sendResponse({}); // snub them.
});

jQuery.fn.textWalk = function( fn ) {
    this.contents().each( jwalk );

    function jwalk() {
        var nn = this.nodeName.toLowerCase();
        if( nn === '#text') {
            fn.call( this );
        } else if( this.nodeType === 1 && this.childNodes && this.childNodes[0] && nn !== 'script' && nn !== 'textarea' ) {
            jQuery(this).contents().each( jwalk );
        }
    }
    return this;
};

function getSelectedNode() {
    if (document.selection)
    	return document.selection.createRange().parentElement();
    else {
    	var selection = window.getSelection();
      var node;
    	if (selection.rangeCount > 0) {
        node = selection.getRangeAt(0).startContainer.childNodes[0];
        if (node && jQuery(node).is('input')) {
          return node;
        } else {
          node = selection.getRangeAt(0).startContainer.parentNode;

          if (node && jQuery(node).is('input')) {
            return node;
          } else {
            return node;
          }
        }
      }
    }
}

function replaceSelection(selectedText, processedText) {
  var node = window.getSelectedNode();
  var $node = jQuery(node);

  $node.textWalk(function() {
      this.data = this.data.replace(selectedText, processedText);
  });

  $node.val(processedText);
}

function decryptSelection(selectedText, processedText) {
  var node = window.getSelectedNode();
  var $node = jQuery(node);

  $node.textWalk(function() {
      this.data = this.data.replace(selectedText, processedText);
  });

  $node.val(processedText);
}
