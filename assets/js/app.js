const button = document.getElementsByClassName('btn-play')[0];
const input = document.getElementsByClassName('url-input')[0];
const wrapper = document.getElementsByClassName('player__wrapper')[0];

var controls = `
  <button type="button" class="plyr__control plyr-live">
    <span>
      LIVE
    </span>
  </button>
  <div class="plyr__controls">
    <button type="button" class="plyr__control plyr-pause-play" aria-label="Play, {title}" data-plyr="play">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
    </button>
    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
    </button>
    <div class="plyr__volume">
        <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
    </div>
    <button type="button" class="plyr__control" data-plyr="fullscreen">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
    </button>
  </div>
`;

const play = (url) => {
  if (Hls.isSupported()) {
    const hlsVideo = document.getElementById("hls");
    const hls = new Hls();
    hls.attachMedia(hlsVideo);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        wrapper.classList.remove('no-video');
        new Plyr("#hls", { controls });
        document.querySelector(".plyr-live").addEventListener("click", function () {
          var url = input.value;
          startPlaying(url);
        });
      });
    });
  }
}

window.addEventListener('load', () => {
  const url = window.location.search.split('=').slice(1).join('=');
  input.value = url;
  play(url);
})

const startPlaying = (url) => {
  if (url === '') {
    button.innerHTML = "Neplatná&nbsp;URL";
    button.setAttribute('disabled', true);
    setTimeout(() => {
      button.innerHTML = "Přehrát";
      button.removeAttribute('disabled');
    }, 3000)
    return;
  }
  var state = {
    url: "?url=" + url,
    title: "DCreative | HLS Player",
    nextState: "a",
  }
  window.history.pushState(state.nextState, state.title, state.url);
  window.history.replaceState(state.nextState, state.title, state.url);
  play(url);
}

button.addEventListener('click', () => {
  var url = input.value;
  startPlaying(url);
})

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    startPlaying(input.value);
  }
})
