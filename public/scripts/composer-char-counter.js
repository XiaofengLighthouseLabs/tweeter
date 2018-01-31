$(document).ready(function(){
  console.log("ready to go");
// keyup event handler
  $(".new-tweet textarea").on("keyup", function(){
    // console.log(this);
    let chart = $(this).val().length;
    let leftCharacters = 140 - chart;
    if (leftCharacters < 0){
      ($(".counter").addClass("red"));
      $(this).siblings(".counter").text(leftCharacters);
    } else {$(".counter").removeClass("red");
      $(this).siblings(".counter").text(leftCharacters);
    }
  });
});

