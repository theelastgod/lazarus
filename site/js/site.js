(function () {
  var audio = document.getElementById("theme");
  var button = document.getElementById("play");
  var bar = document.getElementById("bar");
  var now = document.getElementById("now");
  var dur = document.getElementById("dur");
  if (!audio || !button || !bar) return;

  function fmt(t) {
    if (!isFinite(t)) return "0:00";
    var m = Math.floor(t / 60);
    var s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function paint() {
    button.textContent = audio.paused ? "Play the song" : "Pause the song";
    now.textContent = fmt(audio.currentTime);
    if (isFinite(audio.duration) && audio.duration > 0) {
      dur.textContent = fmt(audio.duration);
      if (!bar.matches(":active")) bar.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    }
  }

  button.addEventListener("click", function () {
    if (audio.paused) audio.play();
    else audio.pause();
  });
  bar.addEventListener("input", function () {
    if (!isFinite(audio.duration)) return;
    audio.currentTime = (Number(bar.value) / 1000) * audio.duration;
    paint();
  });
  audio.addEventListener("timeupdate", paint);
  audio.addEventListener("loadedmetadata", paint);
  audio.addEventListener("play", paint);
  audio.addEventListener("pause", paint);

  var films = document.querySelectorAll(".reel-row video");
  if ("IntersectionObserver" in window) {
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.play().catch(function () {});
        else entry.target.pause();
      });
    }, { threshold: 0.6 });
    films.forEach(function (video) { watch.observe(video); });
  }

  var kick = audio.play();
  if (kick && kick.catch) kick.catch(function () {});
  paint();
})();
