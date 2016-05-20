$(function() {
  var setScrollOffset = function(e){
    var offset = e.data;

    $('.js-editor-body').scrollTop(offset);
  };

  window.addEventListener("message", setScrollOffset, false);
});
