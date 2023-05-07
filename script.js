'use strict'

const myaudio = document.querySelector('audio');
const play = document.querySelector('#play');
const songName = document.querySelector('.songName');
const singer = document.querySelector('.singer');
const myImage = document.querySelector('img');
const forward = document.querySelector('#forward');
const backward = document.querySelector('#backward');
const currenttime = document.querySelector('#currenttime');
const totaltime = document.querySelector('#totaltime');
const progressbar = document.querySelector('.progressbar');

let isPlaying = false;
let songIndex = 0;

const data = [
    {
        singerName : 'Sophie Divine',
        songName : 'Into the sky',
        info : 'image1'
    },
    {
        singerName : 'Arijit',
        songName : 'Into the Desert',
        info : 'image2'
    },
    {
        singerName : 'Kishor',
        songName : 'Toxic love',
        info : 'image3'
    }
];

const playAudio = ()=>{
    isPlaying = true;
    myaudio.play();
    play.classList.replace('fa-play','fa-pause');
}

const pauseAudio = ()=>{
    isPlaying = false;
    myaudio.pause();
    play.classList.replace('fa-pause','fa-play');
}

play.addEventListener('click',()=>{
    if(!isPlaying)
    {
        playAudio();
    }
    else{
        pauseAudio();
    }
})

const loadSong = (song)=>
{
    singer.innerText = song?.singerName;
    songName.innerText = song?.songName;
    myImage.src = `./images/${song?.info}.jpg`;
    myaudio.src = `./audio/${song?.info}.mp3`;
}

loadSong(data[songIndex]);

forward.addEventListener('click',()=>{
    songIndex++;
    if(songIndex > data.length - 1)
    {
        songIndex = 0;
    }
    loadSong(data[songIndex]);
    playAudio();
});

backward.addEventListener('click',()=>{
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = data.length - 1;
    }
    loadSong(data[songIndex]);
    playAudio();
});

myaudio.addEventListener('timeupdate',(e)=>
{
    if(isPlaying)
    {
        myImage.classList.add('imganimation');
    }
    else{
        myImage.classList.remove('imganimation');
    }
    let currentTime = e.srcElement.currentTime;
    let TotalDuration = e.srcElement.duration?e.srcElement.duration:'0:00';

    let currentTimeInMinutes = Math.floor(currentTime/60);
    let currentTimeInSeconds = Math.floor(currentTime%60);

    if(currentTimeInSeconds < 10)
    {
        currentTimeInSeconds = `0${currentTimeInSeconds}`;
    }
    let currentTimeString = `${currentTimeInMinutes}:${currentTimeInSeconds}`;

    currenttime.innerText = currentTimeString;

    let DurationTimeInMinutes = Math.floor(TotalDuration/60)?Math.floor(TotalDuration/60):'0';
    let DurationTimeInSeconds = Math.floor(TotalDuration%60)?Math.floor(TotalDuration%60):'0';

    if(DurationTimeInSeconds < 10)
    {
        DurationTimeInSeconds = `0${DurationTimeInSeconds}`;
    }
    let TotalDurationString = `${DurationTimeInMinutes}:${DurationTimeInSeconds}`;

    totaltime.innerText = TotalDurationString;

    let audioPercentage = (currentTime/TotalDuration)*100;
    progressbar.style.width = `${audioPercentage}%`;
});