$(function() {
  var setScrollOffset = function(offset){
    $('.js-editor-body').scrollTop(offset);
  };

  var setEditorWidth = function(width){
    $('.js-editor-body').width(width);

    parent.postMessage({
      message: 'setIframeHeight',
      iframeHeight: 500
    }, '*');
  };

  var handlePostMessage = function(e) {
    if (e.data.message == 'setScrollOffset') {
      setScrollOffset(e.data.scrollOffset);
    }

    if (e.data.message == 'setEditorWidth') {
      console.log(e);
      setEditorWidth(e.data.editorWidth);
    }
  }

  window.addEventListener("message", handlePostMessage, false);
});
