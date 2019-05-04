$( document ).ready(function() {
    console.log("loading");
    $('#clock-svg').load("./svg/clock.svg", clock_main);
    loadTodaysDate();
    setInterval(countdown, 30000); //updates countdown
    // setInterval(test_toggle, 5000);
});

function clock_main() {
    console.log("loaded");
    let face = $('#clock_face'),
        hr_hand = $('#hour_hand'),
        min_hand = $('#min_hand'),
        sec_hand = $('#sec_hand');

    let datetime = new Date(),
        h = datetime.getHours(),
        m = datetime.getMinutes(),
        s = datetime.getSeconds();

    let aSecond = 60;
    let aMinute = aSecond * 60;
    let anHour = aMinute * 60;

    // console.log(datetime);

    let currHrAngle = getCurrHourAngle(h, m, s),
        currMinAngle = getCurrMinuteAngle(m, s),
        currSecAngle = getCurrSecAngle(s);

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

function loadTodaysDate() {
    // console.log("countdown refreshed")
    let datetime = new Date();
    dateStr = datetime.toString().split(' ');
    // console.log(datetime.getDate())
    $('#todayIs').append(dateStr.slice(0,4).join(' ') + '.');
    countdown();
}

function countdown() {
    let datetime = new Date();
    let dateCurr = new Date(2000, 0, 1, datetime.getHours(), datetime.getMinutes());
    // console.log(datetime.getHours())

    if (datetime.getHours() <= 12) {
        $('#hello').html('Good Morning!');
    } else {
        $('#hello').html('Good Afternoon!');
    }

    let dateClose = new Date()
    if (datetime.getDay() == 0) { //0 is sunday, 6 is saturday
        dateClose = new Date(2000, 0, 1, 5 + 12, 0);
    } else if ((datetime.getDay() == 5) || (datetime.getDay() == 6)) {
        dateClose = new Date(2000, 0, 1, 6 + 12, 0); //fri and sat
    } else {
        dateClose = new Date(2000, 0, 1, 7 + 12, 0); //mon - thurs
    }
    // console.log(dateClose)

    let diff = Math.round((dateClose - dateCurr) / (1000 * 60)); // in minutes
    if (diff > 0) {
        $('#countdown').html('The Library is closing in ' + diff + " minutes.");
    } else {
        $('#countdown').html('The Library is closed.');
    }
    // mon - thurs 10 am - 7pm
    //fri - sat 10 am - 6pm
    //sun 1pm - 5pm
}
