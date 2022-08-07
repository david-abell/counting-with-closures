const counters = document.querySelector("#counters");
let totalcounters = 0;

function createCountContainer(counterName) {
  const countContainer = document.createElement("div");
  countContainer.classList.add(`count-container`);
  countContainer.classList.add(`card`);
  countContainer.setAttribute("id", `count-container-${counterName}`);
  return countContainer;
}

function createCountHeader(counterName, countContainer) {
  const countHeader = document.createElement("h2");
  countHeader.classList.add(`count-header`);
  countHeader.setAttribute("id", `count-header-${counterName}`);
  countContainer.appendChild(countHeader);
  return countHeader;
}

function createCountDisplay(counterName, countContainer) {
  const countElement = document.createElement("div");
  countElement.classList.add(`total-count`);
  countElement.setAttribute("id", `total-${counterName}`);
  countContainer.appendChild(countElement);
  return countElement;
}

function createIncrementButton(counterName, countElement) {
  const incrementButton = document.createElement("button");
  incrementButton.innerText = `Add 1`;
  incrementButton.classList.add(`count-control`);
  incrementButton.classList.add(`count-control-add`);
  incrementButton.setAttribute("id", `increment-${counterName}`);
  countElement.appendChild(incrementButton);
  return incrementButton;
}

function createDecrementButton(counterName, countElement) {
  const decrementButton = document.createElement("button");
  decrementButton.innerText = `Subtract 1`;
  decrementButton.classList.add(`count-control`);
  decrementButton.classList.add(`count-control-subtract`);
  decrementButton.setAttribute("id", `decrement-${counterName}`);
  countElement.appendChild(decrementButton);
  return decrementButton;
}

function createRemoveButton(countElement) {
  const removeButton = document.createElement("button");
  removeButton.classList.add(`count-control`);
  removeButton.innerText = "Remove counter";
  countElement.appendChild(removeButton);
  return removeButton;
}

function createAutocountButton(counterName, countElement) {
  const autocountButton = document.createElement("button");
  autocountButton.innerText = `Count for me`;
  autocountButton.classList.add(`count-control`);
  autocountButton.classList.add(`count-control-add`);
  autocountButton.setAttribute("id", `autocount-${counterName}`);
  countElement.appendChild(autocountButton);
  return autocountButton;
}

function createStopCountButton(counterName, countElement) {
  const stopCountButton = document.createElement("button");
  stopCountButton.innerText = `Stop counting`;
  stopCountButton.classList.add(`count-control`);
  stopCountButton.setAttribute("id", `stopCount-${counterName}`);
  countElement.appendChild(stopCountButton);
  return stopCountButton;
}

function createCountInterval(countTotal, countdisplay) {
  let isStarted = false;
  let intervalId;
  return {
    start() {
      if (!isStarted) {
        isStarted = true;
        intervalId = setInterval(() => {
          countTotal.current += 1;
          countdisplay.innerText = countTotal.current;
          console.log(countTotal.current);
        }, 1000);
      }
    },
    stop() {
      clearInterval(intervalId);
      intervalId = null;
      isStarted = false;
    },
    isStarted() {
      return isStarted;
    },
  };
}

function makeCounter() {
  const counterName = `Counter${totalcounters + 1}`;
  let countTotal = {
    current: 0,
  };
  const counter = createCountContainer(counterName);
  createCountHeader(counterName, counter);
  const countdisplay = createCountDisplay(counterName, counter);
  countdisplay.innerText = countTotal.current;

  const incrementButton = createIncrementButton(counterName, counter);
  incrementButton.addEventListener("click", () => {
    countTotal.current += 1;
    countdisplay.innerText = countTotal.current;
  });

  const decrementButton = createDecrementButton(counterName, counter);
  decrementButton.addEventListener("click", () => {
    countTotal.current -= 1;
    countdisplay.innerText = countTotal.current;
  });

  const countInterval = createCountInterval(countTotal, countdisplay);

  const countForMeButton = createAutocountButton(counterName, counter);
  countForMeButton.addEventListener("click", () => {
    if (!countInterval.isStarted()) {
      countTotal.current += 1;
      countdisplay.innerText = countTotal.current;
      countInterval.start(countTotal, countdisplay);
    }
  });

  const stopCountButton = createStopCountButton(counterName, counter);
  stopCountButton.addEventListener("click", () => {
    countInterval.stop();
  });

  const removeButton = createRemoveButton(counter);
  removeButton.addEventListener("click", () => {
    countInterval.stop();
    counter.remove();
  });

  counters.prepend(counter);
  return { counter, countTotal };
}

const addCounterButton = document.querySelector("#add-counter-button");
addCounterButton.addEventListener("click", makeCounter);
