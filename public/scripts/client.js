$(document).ready(function() {
  // escape function to prevent Cross-Site Scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // loop through all tweets in data base
  const renderTweets = function(tweets) {
    // clear previous infos, otherwise info would duplicate
    $('#allTweetsContainer').html('');

    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#allTweetsContainer').prepend($tweet);
    }
  };


  //format data as html and return
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
  <p class="tweetMessage">${escape(tweetData.content.text)}</p>
  <footer>
    <div>${timeago.format(tweetData.created_at)}</div>
    <div class="socials">
      <a class="fas fa-flag turnOrangeWhenHover"></a>
      <a class="fas fa-retweet turnOrangeWhenHover"></a>
      <a class="fas fa-heart turnOrangeWhenHover"></a>
    </div>
  </footer>
</article>
`);
    return $tweet;
  };


  // load all tweets from database
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
      });
  };
  loadTweets();


  //when user click the tweet button, submit form
  $("#newTweetForm").submit(function(event) {
    // prevent the submit button from submitting
    event.preventDefault();

    // get the length of string inside textarea, trim to remove space
    let textAreaLength = Number($('textarea#textAreaUserInput').val().trim().length);
    // check if textArea is empty
    if (textAreaLength === 0) {
      $("#alertMessage").html('Message cannot be empty.');
      $('.alert').slideDown();
      // check if character count is under 140
    } else if (textAreaLength > 140) {
      $("#alertMessage").html('Message cannot contain more than 140 characters.');
      $('.alert').slideDown();
    } else {
      //if everything passed, post to server
      $("#alertMessage").html('');
      $('.alert').slideUp();

      //establish a POST requwst
      const data = $(this).serialize();
      $.ajax({
        type: "POST",
        url: `/tweets`,
        data: data,
      })
        .then((response) => {
          // load tweets again after submitting to instantly display newest tweet
          loadTweets();
        })
        .catch((error) => {
        });

      //clear textarea
      $("#textAreaUserInput").val('');
      //reset counter
      $("#counter").val('140');
    }
  });
});
