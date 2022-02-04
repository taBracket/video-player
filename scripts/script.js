var video = document.querySelector(".video1");
var playBtn = document.querySelector(".play-btn");
var skiping = document.querySelectorAll("[data-skip]");
var ranges = document.querySelectorAll(".range");
var progress = document.querySelector(".progress");
var progressBar = document.querySelector(".progress-filled");
var fullscreen = document.querySelector(".fullscreen-btn");
var playercont = document.querySelector(".videos-container");
var mutebtn = document.querySelector(".mute-btn");
var volumerange = document.getElementById("sound-control");
var playbackRange = document.getElementById("playbackRate");
// ! functions
function volume() {
	video.volume = volumerange.value;
}
function mutebutton() {
	if (volumerange.value == 0) {
		volumerange.value = 60;
		video.volume = 0.6;
	} else {
		volumerange.value = 0;
		video.volume = 0;
	}
}
function toggleFullscreen() {
	if (!document.fullscreenElement) {
		playercont.requestFullscreen().catch();
	} else {
		document.exitFullscreen();
	}
}
function videoPlayToggle() {
	if (video.paused) {
		video.play();
		playBtn.textContent = "played";
	} else {
		video.pause();
		playBtn.textContent = "paused";
	}
}
function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
	video[this.name] = this.value;
}
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
	if (video.currentTime == video.duration) {
		video.currentTime = 0;
		video.play();
	}
}
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;

	console.log(progressBar);
}
function videospeed() {
	console.log("x");
	video.playbackRate = playbackRange.value;
	videospeed.innerHTML = playbackRange.value;
}
// ? hook up the event listeners
// todo play and pause video
playBtn.addEventListener("click", videoPlayToggle);
video.addEventListener("click", videoPlayToggle);
// todo skip forward and backward
skiping.forEach((element) => {
	element.addEventListener("click", skip);
});
// todo handle ranges
ranges.forEach((range) => {
	range.addEventListener("click", handleRangeUpdate);
});
ranges.forEach((range) => {
	range.addEventListener("mousemove", handleRangeUpdate);
});
// todo handle progress
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
// todo fullscreen
fullscreen.addEventListener("click", toggleFullscreen);
//todo set volume
volumerange.addEventListener("input", volume);
//todo mute the video
mutebtn.addEventListener("click", mutebutton);
//todo video speed
playbackRange.addEventListener("input", videospeed);
// ? shortcuts
window.addEventListener("keydown", (event) => {
	if (event.key === "m") {
		mutebutton();
	}
});
window.addEventListener("keydown", (event) => {
	if (event.key === "f") {
		toggleFullscreen();
	}
});
window.addEventListener("keydown", (event) => {
	if (event.key === "space") {
		videoPlayToggle();
	}
});
