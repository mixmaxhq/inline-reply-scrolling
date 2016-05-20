$(function() {
  var setScrollOffset = function(offset){
    $('.js-editor-body').scrollTop(offset);
  };

  var setIframeHeight = function() {
    var headerHeight = $('.js-header').outerHeight();
    var editorHeight = $('.js-editor-body').outerHeight() + 16; // Remove this magic number. It's the padding around the editor.
    var toolbarHeight = $('.js-footer').outerHeight();
    var height = headerHeight + editorHeight + toolbarHeight;

    parent.postMessage({
      message: 'setIframeHeight',
      iframeHeight: height
    }, '*');
  }

  var setEditorWidth = function(width){
    $('.js-editor-body').width(width);
    setIframeHeight();
  };

  var handlePostMessage = function(e) {
    if (e.data.message == 'setScrollOffset') {
      setScrollOffset(e.data.scrollOffset);
    }

    if (e.data.message == 'setEditorWidth') {
      setEditorWidth(e.data.editorWidth);
    }
  }

  setIframeHeight();

  window.addEventListener("message", handlePostMessage, false);
});
