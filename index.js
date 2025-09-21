// constants
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2508";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// state
let parties = [];

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();

    if (result.success) {
      parties = result.data;
    }

    render();
  } catch (error) {
    console.error(error);
  }
}

// components
function partyCard(party) {
  const $card = document.createElement("article");
  $card.classList.add("party-card");

  $card.innerHTML = `
        <h2 class="party-name">${party.name}</h2>
        <div class="party-details"></div>
    `;

  const $name = $card.querySelector(".party-name");

  $name.addEventListener("click", () => {
    const $details = document.querySelector("#party-details");
    $details.innerHTML = `
        <h3>${party.name}</h3>
        <p>#${party.id}</p>
        <p>#${party.date}</p>
        <p>#${party.description}</p>
        <p>#${party.location}</p>
        `;
  });

  return $card;
}

function PartiesCollection() {
  const $collection = document.createElement("article");
  $collection.classList.add("parties");
  const $parties = parties.map(partyCard);
  $collection.replaceChildren(...$parties);
  return $collection;
}

// render
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
        <h1>Upcoming Parties</h1>
        <div id="parties-collection"></div>
        <h2>Party Details</h2>
        <div id="party-details" class="party-details-box">
            <p>Please click on a party name for details</P>
        </div>
    `;
  const $collection = PartiesCollection();
  document.querySelector("#parties-collection").replaceWith($collection);
}

async function init() {
  await getParties();
  render();
}

init();

// End
