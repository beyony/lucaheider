var x = 0;

function flip() {
  var element = document.getElementsByClassName("flipper")[0];
  element.classList.toggle("flip");

  if (x % 2 === 0) {
    document.getElementById("map").classList.add("visible");
  } else {
    setTimeout(
      () => document.getElementById("map").classList.remove("visible"),
      400
    );
  }
  x++;
}
