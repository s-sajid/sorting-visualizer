let values = [];
let delay = 25;

function buildArray() {
  var length = 80;
  var min = 10;
  var max = 100;

  values = [];

  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    values.push(randomNumber);
  }
  updateBars();
}

function updateBars() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  var maxVal = Math.max(...values);
  var maxBarHeight = 800;
  var barHeightScale = maxBarHeight / maxVal;

  values.forEach(function (value) {
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value * barHeightScale + "px";
    container.appendChild(bar);
  });
}

function reset() {
  values = [];
  buildArray();
}

reset();

// Sorting Algorithms
function bubbleSort() {
  reset();
  var len = values.length;

  function performSwap(i) {
    setTimeout(function () {
      var swapped = false;

      for (var j = 0; j < len - 1; j++) {
        if (values[j] > values[j + 1]) {
          var temp = values[j];
          values[j] = values[j + 1];
          values[j + 1] = temp;
          swapped = true;
        }
      }

      updateBars();

      if (swapped) {
        performSwap(i + 1);
      }
    }, delay);
  }
  performSwap(0);
}

function selectionSort() {
  reset();
  var len = values.length;

  function performSwap(i) {
    setTimeout(function () {
      var minIndex = i;

      for (var j = i + 1; j < len; j++) {
        if (values[j] < values[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        // Swap elements
        var temp = values[i];
        values[i] = values[minIndex];
        values[minIndex] = temp;
      }

      updateBars();

      if (i < len - 1) {
        performSwap(i + 1);
      }
    }, delay);
  }

  performSwap(0);
}
