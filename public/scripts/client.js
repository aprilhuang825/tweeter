/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// Fake data taken from initial-tweets.json

const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article class="tweet">
  <header>
      <img src=${tweetData.user.avatars}>
      <span>${tweetData.user.name}</span>
      <span>${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <span>${timeago.format(tweetData.created_at)}</span>
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
    $('#tweets-container').append($tweet);
  }
}

$(document).ready(function() {
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const tweetLength = $(this).children('textarea').val().length;
    if (!tweetLength) {
      alert('Tweet is empty');
    } else if (tweetLength > 140) {
      alert('Tweet is over 140 characters');
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      })
    .then(loadTweets());
    // clear form
    $(".new-tweet").find("form").trigger("reset");
    //reset counter
    $(".counter").text(140);
    }
  });

  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets'
    })
    .then(tweets => renderTweets(tweets));
  };
  loadTweets();
});