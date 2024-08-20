const button = document.getElementsByClassName('btn-play')[0];
const input = document.getElementsByClassName('url-input')[0];
const wrapper = document.getElementsByClassName('player__wrapper')[0];

const play = (url) => {
  if (Hls.isSupported()) {
    const hlsVideo = document.getElementById("hls");
    const hls = new Hls();
    hls.attachMedia(hlsVideo);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        wrapper.classList.remove('no-video');
      });
    });
  }
}

window.addEventListener('load', () => {
  const url = window.location.search.split('=').slice(1).join('=');
  input.value = url;
  play(url);
})

button.addEventListener('click', () => {
  var url = input.value;
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
})
