var appMode = false;
var timeCounter = 0;
var lapCounter = 0;
var action;
var numOfLaps = 0;
var timemMinutes, timeSecond, timeCentiseconds, lapmMinutes, lapSecond, lapCentiseconds;

$(function () {
    hideAndShow("#start", "#lap");
})

//! CLICKS
$("#start").click(function () {
    hideAndShow("#stop", "#lap");
    appMode = true;
    startAction();
});
$("#lap").click(function () {
    if (appMode) {
        clearInterval(action);
        lapCounter = 0;
        addLap();
        startAction();
    }
});
$("#stop").click(function () {
    hideAndShow("#resume", "#reset");
    clearInterval(action);
});
$("#resume").click(function () {
    hideAndShow("#stop", "#lap");
    startAction();
});
$("#reset").click(function () {
    location.reload();
});

//! ACTIONS
function hideAndShow(firstElement, secondElement) {
    //? show only this two elements
    $(".control").hide();
    $(firstElement).css("display", 'flex');
    $(secondElement).css("display", 'flex');
}
function startAction() {
    action = setInterval(function () {
        timeCounter++;
        lapCounter++;
        updateTime();
    }, 10)
}
function updateTime() {
    timemMinutes = Math.floor(timeCounter / 6000);
    timeSecond = Math.floor(((timeCounter % 6000) / 100));
    timeCentiseconds = (timeCounter % 6000) % 100;
    $(".time-minute").text(format(timemMinutes));
    $(".time-second").text(format(timeSecond));
    $(".time-centisecond").text(format(timeCentiseconds));

    lapmMinutes = Math.floor(lapCounter / 6000);
    lapSecond = Math.floor((lapCounter % 6000) / 100);
    lapCentiseconds = (lapCounter % 6000) % 100;
    $(".lap-minute").text(format(lapmMinutes));
    $(".lap-second").text(format(lapSecond));
    $(".lap-centisecond").text(format(lapCentiseconds));
}
function format(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}
function addLap() {
    numOfLaps++;
    var myLapDetails =
        `<div class="loop">
            <span class="lap-time-title">
                Lap ${numOfLaps}
            </span>
            <div class="lap-time">
                <span>${format(lapmMinutes)}</span>
                :<span>${format(lapSecond)}</span>
                :<span>${format(lapCentiseconds)}</span>
            </div>
        </div>`;
    $(".loop-container").append(myLapDetails);
}