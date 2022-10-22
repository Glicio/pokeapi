const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const limit = document.getElementById("limit");

class Pokemon {
  id;
  name;
  img_url;
  types;
  stats;
  constructor(id, name, img_url, types, stats) {
    this.id = id;
    this.name = name;
    this.img_url = img_url;
    this.types = types;
    this.stats = stats;
  }

  getHtmlElement() {
    const div = document.createElement("div");
    div.id = this.id;
    div.className = "pokemon-card";
    const img = document.createElement("img");
    img.width = 128;
    img.height = 128;
    img.src = this.img_url;
    const name = document.createElement("span");
    name.innerHTML = this.name;

    div.appendChild(img);
    div.appendChild(name);

    return div;
  }
}

limit.addEventListener("change", async () => {
  await getPokemon(limit.value);
});


const getPokemon = async (limit) => {
  let pokelist = [];
  let content = document.getElementById("content");
  let child = content.lastElementChild;
  while (child){
      content.removeChild(child)
      child = content.lastElementChild;
  }
  for (let i = 1; i <= limit; i++) {
    const { name, sprites, types, stats } = await (
      await fetch(API_BASE_URL + `${i}`)
    ).json();
    const pokemon = new Pokemon(i, name, sprites.front_default, types, stats);

    pokelist.push(pokemon);
  }
  pokelist.forEach((pokemon) => {
    let card = pokemon.getHtmlElement();
    content.appendChild(card);
  });
  return pokelist;
};
getPokemon(limit.value)
document.getElementById("searchButtom").addEventListener("click", () => {alert("Função em desenvolvimento!\nDesculpa pela preguiça, tava ocupado! :D")})