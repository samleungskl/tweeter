/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 146124613220
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(document).ready(function() {
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    });
  }
};


const createTweetElement = function(tweetData) {
  let $tweet = $(`
<article>
  <header>
    <div class="profileAndName">
    <img src="${tweetData.user.avatars}">
    <div>${tweetData.user.name}</div>
  </div>
    <div class="userHandle">${tweetData.user.handle}</div>
  </header>
  <p>${tweetData.content.text}</p>
  <footer>
    <div>${timeago.format(tweetData.created_at)}</div>
    <div class="socials">
      <a class="fas fa-flag"></a>
      <a class="fas fa-retweet"></a>
      <a class="fas fa-heart"></a>
    </div>
  </footer>
</article>
`);
  return $tweet;
};


renderTweets(data);