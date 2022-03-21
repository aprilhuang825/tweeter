$(document).ready(function() {
  
  $('.new-tweet textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    const newCounter = $(this).siblings('.counter'); 
    const remainingLen = 140-tweetLength;
    newCounter.text(remainingLen);
    if(remainingLen < 0) {
      newCounter.addClass('over-limit-color');
    } else {
      newCounter.removeClass('over-limit-color');
    }
  }) 
});
