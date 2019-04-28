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
    console.log(getCurrHourAngle(12));

    // setCSSAngles(hr_hand, min_hand, sec_hand);
    //
    let hourTL = new TimelineMax({repeat: -1});
    TweenMax.set(hr_hand, {
        rotation: getCurrHourAngle(h),
        transformOrigin:"bottom center"
    });

    // hourTL.to(hr_hand, 1, {
    //       rotation: 30,
    //       transformOrigin:"bottom left",
    //       ease:Linear.easeNone
    //   });


    let minTL = new TimelineMax({repeat: -1});
    TweenMax.set(min_hand, {
        rotation: getCurrMinuteAngle(m),
        transformOrigin:"bottom center"
    });
    // minTL.to(min_hand, 60, {
    //       rotation: 360,
    //       transformOrigin:"bottom center",
    //       ease:Linear.easeNone
    //   });

    let secTL = new TimelineMax({repeat: -1});
    secTL.set(sec_hand, {
        rotation: getCurrSecAngle(s),
        transformOrigin:"bottom center"
    });
    // TweenMax.to(sec_hand, 1, {
    //       rotation: 360,
    //       transformOrigin:"bottom center",
    //       ease:SteppedEase.config(60),
    //       repeat: -1
    //   });

}

// function setCSSAngles(hr, min, sec) {
//     hr.css("transform-origin", "center center");
//     hr.css("transform", "rotate(90deg)")
// }

function getCurrHourAngle(currHour) {
    if (currHour > 12) {
        currHour -= 12;
    } else if (currHour === 12) {
       currHour = 0;
    }
    return currHour * 30;
}

function getCurrMinuteAngle(currMinute) {
    return currMinute * 6;
}

function getCurrSecAngle(currSec) {
    // console.log(currSec * 6);
    return currSec * 6;
}
