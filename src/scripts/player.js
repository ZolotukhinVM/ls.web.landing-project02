let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $('.player__start').click(e => {
    e.preventDefault();

    if (playerContainer.hasClass('paused')) {
      playerContainer.removeClass('paused');
      player.pauseVideo();
    } else {
      playerContainer.addClass('paused');
      player.playVideo();
    }
  })

  $('.player__sound').click(e => {
    e.preventDefault();
    player.isMuted() ? player.unMute() : player.mute();
    player.isMuted() ? $('.player__sound').text('ON') : $('.player__sound').text('OFF');
  });
}

const onPlayerReady = () => {
  const durationSec = player.getDuration();

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPer = (completedSec / durationSec) * 100;
    // console.log('time = ', completedPer);
    $('.player__playback-button').css({
      left: `${completedPer}%`
    });

  });
}

$('.player__playback').click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPositionPer = (clickedPosition / bar.width()) * 100;
  const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPer;
  $('.player__playback-button').css({
    left: `${newButtonPositionPer}%`
  });

  player.seekTo(newPlaybackPositionSec);

});

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    videoId: 'XBzyrBeb-dw',
    events: {
      'onReady': onPlayerReady
      // 'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();