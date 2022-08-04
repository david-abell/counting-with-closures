const counters = document.querySelector("#counters");
let totalcounters = 0;

function createCountContainer(counterName) {
  const countContainer = document.createElement("div");
  countContainer.classList.add(`count-container`);
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
  countElement.setAttribute("id", `total-count-${counterName}`);
  countContainer.appendChild(countElement);
  return countElement;
}

function createIncrementButton(counterName, countElement) {
  const incrementButton = document.createElement("button");
  incrementButton.innerText = `Add 1`;
  incrementButton.addEventListener("click", countElement.increment);
  incrementButton.classList.add(`increment-count`);
  incrementButton.setAttribute("id", `increment-count-${counterName}`);
  countElement.appendChild(incrementButton);
  return incrementButton;
}

function createDecrementButton(counterName, countElement) {
  const decrementButton = document.createElement("button");
  decrementButton.innerText = `Subtract 1`;
  decrementButton.addEventListener("click", countElement.increment);
  decrementButton.classList.add(`decrement-count`);
  decrementButton.setAttribute("id", `decrement-count-${counterName}`);
  countElement.appendChild(decrementButton);
  return decrementButton;
}

function createRemoveButton(countElement) {
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove counter";
  countElement.appendChild(removeButton);
  return removeButton;
}

function makeCounter() {
  const counterName = `Counter${totalcounters + 1}`;
  let countTotal = 0;
  const counter = createCountContainer(counterName);
  const countHeader = createCountHeader(counterName, counter);
  const countdisplay = createCountDisplay(counterName, counter);
  countdisplay.innerText = countTotal;
  const incrementButton = createIncrementButton(counterName, counter);
  const decrementButton = createDecrementButton(counterName, counter);
  const removeButton = createRemoveButton(counter);

  incrementButton.addEventListener("click", () => {
    countTotal += 1;
    countdisplay.innerText = countTotal;
  });

  decrementButton.addEventListener("click", () => {
    countTotal -= 1;
    countdisplay.innerText = countTotal;
  });

  counters.appendChild(counter);

  removeButton.addEventListener("click", () => {
    counter.remove();
  });

  return counter;
}

const addCounterButton = document.querySelector("#add-counter-button");
addCounterButton.addEventListener("click", makeCounter);
const removeCounterButton = document.querySelector("#remove-counter-button");
