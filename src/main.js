function loadItem() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function createHTMLString(item) {
  return `
    <li class="item">
    <img src="${item.image}" alt=${item.type} class="item__thumnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
    </li> 
    `;
}

function displayItems(items) {
  const container = document.querySelector(".items");
  ////container.innterHTML = items.map(item ==> createHTMLString(item)).join('');
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
  console.log(container.innerHTML);

  items.forEach((element) => {
    let item = document.createElement("li");
    item.classList.add("item");
    item.innerHTML = `<img src=${element.image}
    alt=${element.type}
    class="item__thumnail">
    <span class="item__description">
    ${element.gender}, ${element.size}
    </span>`;

    container.appendChild(item);
  });
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  console.log(key, value);

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListners(items) {
  const logo = document.querySelector(".logo");
  const clickBtn = document.querySelector(".buttons");

  //When logo is clicked, all items wil be displayed
  logo.addEventListener("click", () => displayItems(items));

  //When button is cliked, data will be filtered
  clickBtn.addEventListener("click", (event) => onButtonClick(event, items));
}

loadItem()
  .then((items) => {
    console.log(items);
    displayItems(items);
    setEventListners(items);
  })
  .catch(console.log);
