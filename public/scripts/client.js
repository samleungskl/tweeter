/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    // clear previous infos, otherwise it would duplicate
    $('#tweets-container').html('');

    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $(' tweetContent').text();
    }
  };


  const createTweetElement = function(tweetData) {
    //const test = ;
    let $tweet = $(`
<article>
  <header>
    <div class="profileAndName">
    <img src="${tweetData.user.avatars}">
    <div>${tweetData.user.name}</div>
  </div>
    <div class="userHandle">${tweetData.user.handle}</div>
  </header>
  <p class="tweetContent">${escape(tweetData.content.text)}</p>
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

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: `/tweets`,
    })
      .then((response) => {
        console.log('response = ', response);
        renderTweets(response);
      })
      .catch((error) => {
        console.log('error = ', error);
      })
  }
  loadTweets()

  $("#tweetButton").submit(function(event) {
    // prevent the submit button from submitting
    event.preventDefault();
    // get the length of string inside textarea
    let textAreaLength = Number($('textarea#tweet-text').val().length)
    // check if textArea is empty
    if (textAreaLength === 0) {
      console.log('Path 1')
      $(".message").html('Message cannot be empty.');
      $('.alert').slideDown()
      // check if character count is under 140
    } else if (textAreaLength > 140) {
      console.log('Path 2')
      $(".message").html('Message cannot contain more than 140 characters.');
      $('.alert').slideDown()
    } else {
      //if everything passed, post to server
      $(".message").html('');
      $('.alert').slideUp()
      console.log('Path 3')
      console.log('this = ', $(this).serialize())
      const data = $(this).serialize();
      $.ajax({
        type: "POST",
        url: `/tweets`,
        data: data,
      })
        .then((response) => {
          console.log('response = ', response)
          loadTweets()
        })
        .catch((error) => {
          console.log('error = ', error)
        })
      //clear textarea
      $("#tweet-text").val('');
      //reset counter
      $("#counter").val('140');
    }
  });


  $(".newTweetButton").click(function() {
    $('.new-tweet').slideToggle()
  });


});
