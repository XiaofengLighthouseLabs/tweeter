/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// for Header
function createTweetHeader(user){
  let $header = $("<header>");
  let $header_img = $("<img>").addClass("user-avatar");
  let $header_user = $("<p>").addClass("user-name");
  let $header_fields = $("<p>").addClass("user-fields");

  $header_img.attr("src", user.avatars.small );
  $header_user.text(user.name);
  $header_fields.text(user.handle);

  return $header.append($header_img, $header_user, $header_fields);
};

// for message
function createTweetMessage(message){
  let $message = $("<p>").addClass("user-message");
  $message.text(message);
  return $message.append($message);
}

// for icon
function creatTweetFooterIcon(iconName){
  let icon = '<i class="fa ' + iconName + '" aria-hidden="true"></i>';
  return icon;
}

// for footer
function createTweetFooter(created_at){
  let $footer = $("<footer>");
  let $footer_time = $("<p>").addClass("time");
  let $footer_icon = $("<p>").addClass("icon");

  $footer_time .text(dateFromToday(created_at));
  $footer_icon.append(creatTweetFooterIcon('fa-heart'),creatTweetFooterIcon('fa-retweet'),creatTweetFooterIcon('fa-flag'),);
  $footer.append($footer_time, $footer_icon);
  return $footer;
}

// TweetElement from Header, Message and Footer
function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let $header = createTweetHeader(tweet.user);
  let $message = createTweetMessage(tweet.content.text);
  let $footer = createTweetFooter(tweet.created_at);

  $tweet.append($header, $message, $footer);
  return $tweet;
}

function renderTweets(tweets){
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((tweet) => {
    let tweetElement = createTweetElement(tweet);
    $("#tweet-container").prepend(tweetElement);
  });
}
// renderTweets(data);

// use ajax to render tweets
function loadTweets(){
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success:function($data){
      renderTweets($data);
    }
  });
}
loadTweets();

// function prependNewTweet(tweet){
//   let newTweet = createTweetElement(tweet)
//   $("#tweet-container").prepend(tweet)
//  };

// for form data

$(".new-tweet form").on('submit', function(event){
  event.preventDefault();
  let newText = $(this).serialize();
  let chart = $(".new-tweet textarea").val().length;
  let leftCharacters = 140 - chart;
  if (leftCharacters < 140 && leftCharacters > 0){
     $.ajax({
      url: '/tweets',
      method: 'POST',
      data: newText,
      success: function(){
        $("#tweet-container").empty();
        loadTweets();
       // prependNewTweet(newText);
        $(".new-tweet textarea").val("");
        $(".counter").text("140");
      }
    });

  } else if (leftCharacters < 0) {
    alert("140 character maximum!")
  } else {
     alert("The text area is empty now!");
  }
});

// for toggle
$(document).ready(function(){
  $("button").click(function(){
    $(".new-tweet").toggle();
    $("textarea").focus();
  });
});

// for time
function dateFromToday(tweet){
  var now = new Date();
  var tweetDate = new Date(tweet);
  var msPerDay = 24 * 60 * 60 * 1000;
  var msPerHour = 60 * 60 * 1000;
  let dayAgo = Math.round ((now.getTime() - tweetDate.getTime()) / msPerDay);
  if(dayAgo >= 1){
    return dayAgo + "days ago";
  } else {
    let hourAgo = Math.round ((now.getTime() - tweetDate.getTime()) / msPerHour);
    return hourAgo + "hours ago";
  }
};



