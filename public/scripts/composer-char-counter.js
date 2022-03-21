$(document).ready(function() {
  
  $('.new-tweet textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    const newCounter = $(this).siblings('.counter'); 
    const tweetLimit = 140;
    newCounter.text(tweetLimit-tweetLength);
  }) 
});
