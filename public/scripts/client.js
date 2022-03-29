const XSSescape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article class="tweet">
  <header>
      <img src=${XSSescape(tweetData.user.avatars)}>
      <span>${XSSescape(tweetData.user.name)}</span>
      <span>${XSSescape(tweetData.user.handle)}</span>
    </header>
    <p>${XSSescape(tweetData.content.text)}</p>
    <footer>
      <span>${XSSescape(timeago.format(tweetData.created_at))}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

const loadTweets = function() {
  $.ajax({
    type: 'GET',
    url: '/tweets'
  })
  .then(tweets => renderTweets(tweets));
};

$(document).ready(function() {

  // load all tweets when page is loaded
  loadTweets();

  // hide error message
  const errorMsg = $(".new-tweet form").children('div');
  errorMsg.hide();

  // submit new tweet
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const tweetLength = $(this).children('textarea').val().length;
    errorMsg.slideUp(300);

    if (!tweetLength) {
      $('#error-text').text('Tweet is empty');
      errorMsg.slideDown(300);
    } else if (tweetLength > 140) {
      $('#error-text').text('Tweet is over 140 characters');
      errorMsg.slideDown(300);
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      })
    .then(loadTweets());
    // clear form
    $(".new-tweet").find("form").trigger("reset");
    // reset counter
    $(".counter").text(140);
    }
  });



});