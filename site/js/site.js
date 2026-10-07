(function () {
  var audio = document.getElementById("theme");
  var button = document.getElementById("play");
  if (!audio || !button) return;

  function label() {
    button.textContent = audio.paused ? "Play the song" : "Pause the song";
  }

  button.addEventListener("click", function () {
    if (audio.paused) audio.play();
    else audio.pause();
  });
  audio.addEventListener("play", label);
  audio.addEventListener("pause", label);

  var tryPlay = audio.play();
  if (tryPlay && tryPlay.catch) tryPlay.catch(function () {});
  label();
})();
