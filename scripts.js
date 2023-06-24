let values = [];
let delay = 25;
let length = 80;

function updateDelay(value) {
  delay = parseInt(value);
  document.getElementById("delayValue").textContent = delay + "ms";
}

function updateLength(value) {
  length = parseInt(value);
  document.getElementById("lengthValue").textContent = length;
  buildArray(length);
}

function buildArray(length) {
  const min = 10;
  const max = 100;

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function reset() {
  values = [];
  buildArray(length);
}

function reload() {
  location.reload();
}

reset();

// Sorting Algorithms
async function bubbleSort() {
  reset();
  var len = values.length;

  async function performSwap(i) {
    await sleep(delay);
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
  }

  performSwap(0);
}

function selectionSort() {
  reset();
  var len = values.length;

  async function performSwap(i) {
    await sleep(delay);
    var minIndex = i;

    for (var j = i + 1; j < len; j++) {
      if (values[j] < values[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      var temp = values[i];
      values[i] = values[minIndex];
      values[minIndex] = temp;
    }

    updateBars();

    if (i < len - 1) {
      await performSwap(i + 1);
    }
  }

  performSwap(0);
}

function insertionSort() {
  reset();
  var len = values.length;

  async function performSwap(i) {
    await sleep(delay);
    var current = values[i];
    var j = i - 1;

    while (j >= 0 && values[j] > current) {
      values[j + 1] = values[j];
      j--;
    }

    values[j + 1] = current;

    updateBars();

    if (i < len - 1) {
      await performSwap(i + 1);
    }
  }

  performSwap(1);
}

function quickSort() {
  reset();

  async function performSort(start, end) {
    if (start >= end) {
      return;
    }

    var index = await partition(start, end);

    await performSort(start, index - 1);
    await performSort(index + 1, end);
  }

  async function partition(start, end) {
    var pivotIndex = start;
    var pivotValue = values[end];

    for (var i = start; i < end; i++) {
      if (values[i] < pivotValue) {
        await swap(i, pivotIndex);
        pivotIndex++;
      }
    }

    await swap(pivotIndex, end);
    return pivotIndex;
  }

  async function swap(i, j) {
    await sleep(delay);
    var temp = values[i];
    values[i] = values[j];
    values[j] = temp;
    updateBars();
  }

  performSort(0, values.length - 1);
}

function mergeSort() {
  reset();

  async function performSort(start, end) {
    if (start >= end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);

    await performSort(start, mid);
    await performSort(mid + 1, end);
    await merge(start, mid, end);
  }

  async function merge(start, mid, end) {
    await sleep(delay);
    const left = values.slice(start, mid + 1);
    const right = values.slice(mid + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let mergedIndex = start;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        values[mergedIndex] = left[leftIndex];
        leftIndex++;
      } else {
        values[mergedIndex] = right[rightIndex];
        rightIndex++;
      }
      mergedIndex++;
    }

    while (leftIndex < left.length) {
      values[mergedIndex] = left[leftIndex];
      leftIndex++;
      mergedIndex++;
    }

    while (rightIndex < right.length) {
      values[mergedIndex] = right[rightIndex];
      rightIndex++;
      mergedIndex++;
    }

    updateBars(start, end);
  }

  performSort(0, values.length - 1);
}

function heapSort() {
  reset();

  async function performSort() {
    const len = values.length;

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      await heapify(len, i);
    }

    for (let i = len - 1; i > 0; i--) {
      await swap(0, i);
      await heapify(i, 0);
    }
  }

  async function heapify(len, rootIndex) {
    let largestIndex = rootIndex;
    const leftChildIndex = 2 * rootIndex + 1;
    const rightChildIndex = 2 * rootIndex + 2;

    if (leftChildIndex < len && values[leftChildIndex] > values[largestIndex]) {
      largestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < len &&
      values[rightChildIndex] > values[largestIndex]
    ) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== rootIndex) {
      await swap(rootIndex, largestIndex);
      await heapify(len, largestIndex);
    }
  }

  async function swap(i, j) {
    await sleep(delay);
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
    updateBars();
  }

  performSort();
}
