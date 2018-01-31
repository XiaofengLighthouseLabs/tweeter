/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// for Header
function createTweetHeader(user){
  let $header = $("<header>");
  let $header_img = $("<img>").addClass("user-avatar");
  let $header_user = $("<p>").addClass("user-name");
  let $header_fields = $("<p>").addClass("user-fields");

  $header_img.attr("src", user.avatars.small );
  $header_user.text(user.name);
  $header_fields.text(user.handle);

  return $header.append($header_img, $header_user,$header_fields);
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

  $footer_time.text(curTime());
  $footer_icon.append(creatTweetFooterIcon('fa-flag'),creatTweetFooterIcon('fa-retweet'),creatTweetFooterIcon('fa-heart'),);
  $footer.append($footer_time, $footer_icon);
  return $footer;
}
// for time
function curTime(){
  let time =  Date(data.created_at);
  return time;
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
  tweets.forEach((tweet) => {
    let tweetElement = createTweetElement(tweet);
    $("#tweet-container").append(tweetElement);
  });
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

}

renderTweets(data);
