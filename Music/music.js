let currentMusic = 0;

const music = document.querySelector("#audio");
const seekbar = document.querySelector(".card__timeline progress");
const songName = document.querySelector(".card__title");
const artistName = document.querySelector(".card__subtitle");
const disk = document.querySelector(".card__img");
const currentTime = document.querySelector(".card__time-passed");
const songDuration = document.querySelector(".card__time-left");
const playBtn = document.querySelector(".card__btn-play");
const forwardBtn = document.querySelector(".card__btn_f");
const backwardBtn = document.querySelector(".card__btn_b");

playBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playBtn.innerHTML = `<svg fill="none" height="22" viewBox="0 0 18 22" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H6V22H0zM12 0H18V22H12z" fill="#000"></path></svg>`;
    } else {
        music.pause();
        playBtn.innerHTML = `<svg fill="none" height="22" viewBox="0 0 18 22" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m0 0v22l18-11z" fill="#000"></path></svg>`;
    }
});

const setMusic = (i) => {
    seekbar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage=`url('${song.cover}')`;
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekbar.max = music.duration;
        songDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

seekbar.addEventListener('change', () => {
    music.currentTime = seekbar.value;
});
setInterval(() => {
    seekbar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 100);

forwardBtn.addEventListener("click",()=>{
    if(currentMusic>=songs.length-1){
        currentMusic=0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

backwardBtn.addEventListener("click",()=>{
    if(currentMusic<=0){
        currentMusic=songs.length-1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});