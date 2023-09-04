const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(url)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordMatches, cities) {
  return cities.filter((place) => {
    // necesitamos obtener la ciudad o el estado que coincide con la palabra buscada
    const regex = new RegExp(wordMatches, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function formatNumber(number) {
  const format = new Intl.NumberFormat("en-us", { notation: "compact" });
  return format.format(number);
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${formatNumber(place.population)}</span>
        </li>
    `;
    })
    .join("");
  suggestion.innerHTML = html;
}

const inputSearch = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

inputSearch.addEventListener("change", displayMatches);
inputSearch.addEventListener("keyup", displayMatches);
