/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  return $(`
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
    <div>${tweetData.created_at}</div>
    <div class="socials">
      <a class="fas fa-flag"></a>
      <a class="fas fa-retweet"></a>
      <a class="fas fa-heart"></a>
    </div>
  </footer>
</article>
`);
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

$(document).ready(function() {
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});