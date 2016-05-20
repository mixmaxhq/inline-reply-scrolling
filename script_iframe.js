$(function() {
  var setScrollOffset = function(offset){
    $('.js-editor-body').scrollTop(offset);
  };

  var setEditorWidth = function(width){
    $('.js-editor-body').width(width);

    // Get new height of editor.
    // Send height to parent of this iframe so this iframe can be resized.
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
