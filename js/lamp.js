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

    let datetime = new Date(),
        h = datetime.getHours(),
        m = datetime.getMinutes(),
        s = datetime.getSeconds();

    console.log(datetime);
    console.log(h);
    console.log(m);
    console.log(s);

    let tl = new TimelineMax({repeat: -1});
    tl.add("start")
      .to(min_hand, 60, {
          rotation: 720,
          transformOrigin:"bottom center",
          ease:Linear.easeNone
      }, "start")
      .to(hr_hand, 60, {
          rotation: 360,
          transformOrigin:"bottom center",
          ease:Linear.easeNone
      }, "start");

}
