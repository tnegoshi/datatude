console.log("App.js is running");

$('button#searchButton').on('click', function(){

  var baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=57ee3318536b23ee81d6b27e36997cde'
  var trackName = $('input#trackInput').val()
  var artistName = $('input#artistInput').val()
  $('#player').toggle()


  $.ajax({
      method: 'GET',
      url: (baseUrl + '&artist=' + artistName + '&track='+ trackName + '&format=json'),
      success: function(response, status) {
        debugger;

        $('h4#trackName').text(trackName[0].toUpperCase() + trackName.slice(1));
        $('h4#artistName').text(artistName[0].toUpperCase() + artistName.slice(1));

        var trackSummary = response.track.wiki.summary;
        trackSummary = trackSummary.slice(0,(trackSummary.indexOf('<a')))
        $('h4#trackSummary').text(trackSummary);

        var imgSrc = response.track.album.image[3]['#text'];
        $('img#albumImage').attr('src', imgSrc);

        var trackAlbum = response.track.album.title;
        $('h4#trackAlbum').text(trackAlbum);
      }
  });
});


      // Search for a specified string.
      function search() {
        var request = gapi.client.youtube.search.list({
          q: (trackName + ' ' + artistName),
          part: 'snippet'
        });

        request.execute(function(response) {
          var str = JSON.stringify(response.result);
          $('#search-container').html('<pre>' + str + '</pre>');
        });
      }

      debugger;



      // var searchResult = 'dQw4w9WgXcQ'

      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'dQw4w9WgXcQ',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 0);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

