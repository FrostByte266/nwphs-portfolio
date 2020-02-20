// Initialize the stage in a global scope so it can be accessed from all events
var stage = null;

$(document).ready(() => {
  // Define some useful variables and functions
  const dimens = $("#canvas").innerWidth();

  const grey = "#696969"

  const randPos = () => Math.floor(Math.random() * 360);

  // Equalize the 3 rows
  const thirdHeight = window.innerHeight / 3;
  $(".row").each((_, row) => $(row).css("height", thirdHeight));

  // Create the main canvas
  stage = new Konva.Stage({
    container: 'canvas',
    width: dimens,
    height: dimens
  });

  stage.getContainer().style.backgroundColor = "#252934";
  let layer = new Konva.Layer();

  // Create the compass shape
  const compassOuter = new Konva.Circle({
    x: dimens / 2,
    y: dimens / 2,
    radius: dimens / 3 + 25,
    stroke: grey,
    strokeWidth: 10,
    opacity: 1
  });


  const compassInner = new Konva.Circle({
    x: dimens / 2,
    y: dimens / 2,
    radius: dimens / 48,
    stroke: grey,
    fill: grey,
    strokeWidth: 10,
    opacity: 1
  });

  const compassArrow = new Konva.Arrow({
    x: dimens / 2,
    y: dimens / 2,
    offsetX: dimens / 4,
    offsetY: dimens / 4,
    points: [0, 0, dimens / 2, dimens / 2],
    pointerLength: 20,
    pointerWidth: 20,
    fill: grey,
    rotation: 0,
    stroke: grey,
    strokeWidth: 10
  });

  // Add all the parts of the compass to the layer
  const canvasElements = [compassOuter, compassInner, compassArrow]
  for (const element of canvasElements) {
    layer.add(element);
  }
  stage.add(layer);

  // Functions to create animations for the compass
  const makeAnimNW = () => new Konva.Tween({
    node: compassArrow,
    rotation: 180,
    duration: 1,
    easing: Konva.Easings.EaseInOut
  });

  const makeAnimRand = () => new Konva.Tween({
    node: compassArrow,
    rotation: randPos(),
    duration: 1,
    easing: Konva.Easings.EaseInOut
  });

  // Start the random animations
  let compassRandomMove = setInterval(() => makeAnimRand().play(), 1100);

  $("#nw").on("mouseenter", () => {
    // Stop random animations and orient compass NW
    clearInterval(compassRandomMove);
    makeAnimNW().play();
  });

  $("#nw").on("mouseleave", () => {
    // Resume random Movement
    makeAnimRand().play();
    compassRandomMove = setInterval(() => makeAnimRand().play(), 1100);
  });

  // Click handler for call to action
  $("#nw").on("click", () => {
    $("#nw").off("mouseenter mouseleave");
    $(".navbar").css("z-index", "-1");
    // Get position of the compass canvas
    const canvSize = { width: $("#canvas").width(), height: $("#canvas").height() }
    const canv = Object.assign({}, $("#canvas").position(), canvSize, { position: "absolute" });
    $("#greeter").fadeOut(1500);
    // Assign the compass position to the logo image, fade in, then animate to the corner
    $("#logo").css(canv).fadeIn(1500).animate({
      top: 13,
      left: 16,
      width: "50px",
      height: "50px"
    }, 1500, 'easeInOutQuint', () => {
      $("#logo").hide();
      $(".navbar-brand").show();
    });
    // Change background color to white, then show the navbar
    $("body").delay(1000)
      .animate({
        backgroundColor: "#ffffff"
      }, 1500, () => {
        $(".navbar").css("z-index", 0).show().children().show();
        $(".navbar-brand").hide();
        $("#main-content").show().children().show()
      }).css("overflow", "visible");
  });

  // Initialize greeter typer
  const typer = new Typed("#type-target", {
    strings: ["explore my world.", "seek my path.", "build my community."],
    loop: true,
    backDelay: 3000,
    typeSpeed: 30,
    backSpeed: 30
  });

  $(".loader-wrapper").fadeOut("slow");
});

$(window).resize(() => {
  const thirdHeight = window.innerHeight / 3;
  $(".row").each((_, row) => $(row).css("height", thirdHeight));
});