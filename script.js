$(function() {
    var $mixmaxReply = $('.js-mixmax-reply-box');
    var $oldReply = $('.js-old-reply-parent');
    var $mixmaxEditorIframe = $('.js-mixmax-editor-iframe');

    var oldReplyBoxBounds = $oldReply[0].getBoundingClientRect();

    var marginBottomOffset = 10; // When pinned at the bottom, the desired space between bottom of iFrame and bottom of window.
    var marginTopOffset = 10; // When pinned at the top, the desired space between top of iFrame and top of window.
    var naturalIframeHeight = 700; // The natural iframe height which would show all content of the editor without scrolling.

    var updatePosition = function() {
      var oldReplyBoxBounds = $oldReply[0].getBoundingClientRect();
      var topOffset = Math.max(oldReplyBoxBounds.top, marginTopOffset);
      var leftOffset = oldReplyBoxBounds.left;
      var docHeight = document.documentElement.clientHeight;

      var viewPortHeight = docHeight - marginBottomOffset - marginTopOffset;
      var newHeight = Math.min(Math.min(docHeight - oldReplyBoxBounds.top - marginBottomOffset , naturalIframeHeight), viewPortHeight);

      if (oldReplyBoxBounds.top < 10) {
        var scrollOffset = Math.abs(oldReplyBoxBounds.top - marginTopOffset);
        $mixmaxEditorIframe[0].contentWindow.postMessage(scrollOffset, '*');
      } else if(oldReplyBoxBounds.top > 9) {
        $mixmaxEditorIframe[0].contentWindow.postMessage(0, '*');
      }

      $mixmaxReply
        .css({
          'transform': 'translateY(' + topOffset + 'px) translateX(' + leftOffset + 'px) translateZ(0)',
          'width': $oldReply.outerWidth() + 'px',
          'height': newHeight + 'px'
        });
    };

    updatePosition();

    $('.threadlist').scroll(function(){
      updatePosition();
    });

    $(window).on('resize', function(){
      updatePosition();
    });

    $(document).on('wheel', function(){
      $mixmaxReply.addClass('no-pointer');
    });
});
