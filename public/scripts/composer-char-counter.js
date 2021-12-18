$(document).ready(function() {
  // get userinput from text area and count how many character is in textarea
  document.getElementById("textAreaUserInput").addEventListener("input", function(event) {
    let charCount = 140 - this.value.length;
    //counter = counter element on the tweet form
    let counter = $(this).parent().parent().find('output');
    //updateing the counter's html to show count in real time
    counter.html(charCount);

    // turn character counter to red when character count is less than 140
    if (charCount < 0) {
      counter.addClass("redFont");
    } else {
      counter.removeClass("redFont");
    }
  });


  // compose Button at the top right
  $("#composeButton").click(function() {
    // makes tweet form slide up and down
    $('.new-tweet').slideToggle(function() {
      // makes textArea autofocus
      $('#textAreaUserInput').focus();
    });
  });


  // scroll to the top of page when ScrollToTopButton is clicked
  $("#ScrollToTopButton").click(function() {
    window.scrollTo(0, 0);
  });


  //followed this jsfiddle https://stackoverflow.com/questions/14249998/jquery-back-to-top
  // if user scrolled more than 100px, show ScrolltoTopButton, else hide button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#ScrollToTopButton").show();
      $("#ScrollToTopButton").css("display", "flex");
      $("#composeButton").hide();
      $(".logo").css("text-shadow", "2px 2px black");
    } else {
      $("#ScrollToTopButton").hide();
      $("#composeButton").show();
      $(".logo").css("text-shadow", "none");
    }
  });

});