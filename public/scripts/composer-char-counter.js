$(document).ready(function() {
  // --- our code goes here ---
  document.getElementById("tweet-text").addEventListener("input", function(event) {
    let charCount = 140 - this.value.length;
    console.log($(this).parent().parent())
    let counter = $(this).parent().parent().find('output');
    counter.html(charCount);
    if (charCount < 0){
      counter.addClass("redFont");
    } else{
      counter.removeClass("redFont");
    }
  });
});
