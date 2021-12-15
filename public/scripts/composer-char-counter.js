$(document).ready(function() {
  // --- our code goes here ---
  document.getElementById("tweet-text").addEventListener("input", function(event) {
    //console.log('input = ', event);
    //console.log(this);
    //console.log(this.value.length);
    let charCount = 140 - this.value.length;
    //console.log(charCount);
    // if (charCount < 0) {
    //   document.getElementById("counter").classList.add("redFont");
    // } else {
    //   document.getElementById("counter").classList.remove("redFont");
    // }
    // document.getElementById("counter").innerHTML = charCount;
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
