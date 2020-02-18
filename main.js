"use strict"

var timer = document.getElementById("timer");
var counter = 0;
var timeleft = 4;
var interval = setInterval(timeIt, 1000);

// *.html?hours=2&minutes=37&seconds=59
if (window.location.search) {
    timeleft = 0;
    var urlParams = new URLSearchParams(window.location.search);
    // if (urlParams.get("h")) {
    //     var h = parseInt(urlParams.get("h"));
    //     timeleft += h * 60 * 60;
    // }
    // if (urlParams.get("m")) {
    //     var m = parseInt(urlParams.get("m"));
    //     timeleft += m * 60;
    // }
    // if (urlParams.get("s")) {
    //     var s = parseInt(urlParams.get("s"));
    //     timeleft += s;
    // }
    if (parameterURL("h")){
        timeleft += parameterURL("h") * 3600;
    }
    if (parameterURL("m")){
        timeleft += parameterURL("m") * 60;
    }
    if (parameterURL("s")){
        timeleft += parameterURL("s");
    }
}

var audioDing = new Audio("ding-sound-effect_2.mp3");

function parameterURL(timeUnit) {
    var timeUnitValue = urlParams.get(timeUnit);
    return (timeUnitValue) ? parseInt(timeUnitValue) : 0;
}

function timeFormat(timeQuatity) {
    // if (timeQuatity < 10) {
    //     return "0" + timeQuatity;
    // } else {
    //     return timeQuatity
    // }

    return (timeQuatity < 10) ? ("0" + timeQuatity) : timeQuatity;
}

function convertSeconds(s) {
    var h = Math.trunc(s / 3600);
    s -= h * 3600
    var m = Math.trunc(s / 60);
    s -= m * 60;
    return timeFormat(h) + "h : " +
        timeFormat(m) + "m : " +
        timeFormat(s) + "s";
}

function timeIt() {
    timer.textContent = convertSeconds(timeleft - counter);
    counter++;
    if (timeleft == counter - 1) {
        clearInterval(interval);
        timer.textContent += " - Time's up!";
        counter = 0;
        audioDing.play();
    }
}