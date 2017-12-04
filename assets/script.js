var getRandomString = function(length) {
  var letter = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  var r = '';
  for(var i=0; i<length; i++){
    r += letter[Math.floor(Math.random()*letter.length)];
  }
  return r;
}

var getRandomImgurUrl = function() {
  var ext = ["jpg", "png"];
  return 'https://i.imgur.com/' + getRandomString(5) + '.' + ext[Math.floor(Math.random()*ext.length)];
}

var getImageUrl = function(callback) {
  var url = getRandomImgurUrl();
  console.log(url);
  $.ajax({
    type: "GET",
    url: url,
    success: function(data, status, xhr) {
      var idx1 = data.indexOf("���I����3h�I") === 122;
      var idx2 = data.indexOf("@媁") === 129;
      var idx3 = data.indexOf("^=:?") === 140;

      if(idx1 || idx2 || idx3) {
        getImageUrl(callback);
      } else {
        callback(url);
      }
    }
  });
}

var getLinkText = function(url) {
  return "https://twitter.com/intent/tweet?text=" + url + " ( ランダム画像びゅーわー " + location.href + " )";
}

$(function main() {
  getImageUrl(function(url) {
    $("#result-img").attr("src", url);
    $("#result-a").attr("href", url).attr("download", "");
    $("#tweet-button").attr("href", getLinkText(url)).removeClass("wait");
    $("#search-now").hide();
  });
})
