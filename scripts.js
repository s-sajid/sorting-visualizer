function newArray(length, min, max) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    arr.push(randomNumber);
  }
  return arr;
}

function createBars(arr) {
  var container = document.getElementById("container");
  container.innerHTML = "";

  var maxVal = Math.max(...arr);
  var barHeightScale = 800 / maxVal;

  arr.forEach(function (value) {
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value * barHeightScale + "px";
    container.appendChild(bar);
  });
}
