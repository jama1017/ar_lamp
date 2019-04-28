let select = function(s) {
  return document.querySelector(s);
};

let selectAll = function(s) {
  return document.querySelectorAll(s);
};

$( document ).ready(function() {
    console.log("loading");
    $('#clock-svg').load("./svg/clock.svg", main);
});

// main('lol');
function main() {
    console.log("loaded");
    let face = $('#clock_face'),
        hr_hand = $('#hour_hand'),
        min_hand = $('#min_hand');
        sec_hand = $('#sec_hand');

    let datetime = new Date(),
        h = datetime.getHours(),
        m = datetime.getMinutes(),
        s = datetime.getSeconds();

    let aSecond = 60;
    let aMinute = aSecond * 60;
    let anHour = aMinute * 60;

    console.log(datetime);

    let currHrAngle = getCurrHourAngle(h, m, s),
        currMinAngle = getCurrMinuteAngle(m, s),
        currSecAngle = getCurrSecAngle(s)

    let initTL = new TimelineMax();
    initTL.set(hr_hand, {
        rotation: currHrAngle,
        transformOrigin:"bottom center"
    })
    .set(min_hand, {
        rotation: currMinAngle,
        transformOrigin:"bottom center"
    })
    .set(sec_hand, {
        rotation: currSecAngle,
        transformOrigin:"bottom center"
    });

    TweenMax.to(hr_hand, anHour, {
          rotation: currHrAngle + 360,
          ease:Linear.easeNone,
          repeat: -1
      });

    TweenMax.to(min_hand, aMinute, {
          rotation: currMinAngle + 360,
          ease:Linear.easeNone,
          repeat: -1
      });

    TweenMax.to(sec_hand, aSecond, {
          rotation: currSecAngle + 360,
          ease:SteppedEase.config(60),
          repeat: -1
      });

}

function getCurrHourAngle(currHour, currMinute, currSec) {
    if (currHour > 12) {
        currHour -= 12;
    } else if (currHour === 12) {
       currHour = 0;
    }
    return (currHour + currMinute/60 +currSec/3600) * 30;
}

function getCurrMinuteAngle(currMinute, currSec) {
    return (currMinute + currSec/60) * 6;
}

function getCurrSecAngle(currSec) {
    return currSec * 6;
}
