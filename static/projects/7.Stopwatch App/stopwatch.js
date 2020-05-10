$(function(){
    var appMode = false;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var numOfLaps = 0 ;
    var timemMinutes,timeSecond,timeCentiseconds,lapmMinutes,lapSecond,lapCentiseconds;
    HideAndShow("#startButton","#lapButton");
    $("#startButton").click(function(){
        HideAndShow("#stopButton","#lapButton");
        appMode = true;
        startAction();
        });
    $("#lapButton").click(function(){
        if(appMode){
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startAction();
        }
    });
    $("#stopButton").click(function(){
        HideAndShow("#resumeButton","#resetButton");
        clearInterval(action);
    });
    $("#resumeButton").click(function(){
        HideAndShow("#stopButton","#lapButton");
        startAction();
    });
    $("#resetButton").click(function(){
        location.reload();
    });
function HideAndShow(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
}
function startAction(){
    action = setInterval(function(){
         timeCounter++;
         lapCounter++;
         updateTime();
    }, 10)
}
function updateTime(){
    timemMinutes = Math.floor(timeCounter/6000);
    timeSecond = Math.floor(((timeCounter%6000)/100));
    timeCentiseconds = (timeCounter%6000)%100;
    $("#timeminute").text(format(timemMinutes));
    $("#timesecond").text(format(timeSecond));
    $("#timecentisecond").text(format(timeCentiseconds));

    lapmMinutes = Math.floor(lapCounter/6000);
    lapSecond = Math.floor((lapCounter%6000)/100);
    lapCentiseconds = (lapCounter%6000)%100;
    $("#lapminute").text(format(lapmMinutes));
    $("#lapsecond").text(format(lapSecond));
    $("#lapcentisecond").text(format(lapCentiseconds));
}
function format(number){
    if(number < 10){
        return '0' + number;
    }else{
        return number;
    }
}
function addLap(){
        numOfLaps++;
        var myLapDetails =
        '<div id = loop>'+
            '<div class="laptimetitle">'+
                'Lap'+ numOfLaps +
            '</div>'+
            '<div class="laptime">'+
                '<span>'+ format(lapmMinutes) +'</span>'+
                ':<span>'+ format(lapSecond) +'</span>'+
                ':<span>'+ format(lapCentiseconds) +'</span>'+
            '</div>'+
        '</div>';
    $(myLapDetails).prependTo(".loop");
}
});