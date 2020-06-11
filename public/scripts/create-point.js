
function carregarUF(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then(states => {
            
            states.sort((a, b) => (a.nome > b.nome) ? 1 : -1)
            
            for (const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
    })
}

carregarUF();

function carregarCidade(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`;

    citySelect.innerHTML = "<option value>Selecione uma cidade...</option>";
    citySelect.disabled = true;

    fetch(url)
        .then( res => res.json())
        .then(cities => {

            cities.sort((a, b) => (a.nome > b.nome) ? 1 : -1)

            for (const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", carregarCidade);


// Itens de coleta
// Pegar todos os itens de coleta li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collecteditems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;

    itemLi.classList.toggle("selected");

    // Será adicionado a posição do array nessa const
    const alreadySelected = selectedItems.findIndex( item => item == itemId);

    // Se o item já estiver selecionado
    if (alreadySelected >= 0) {
        // Remover a selação dos itens
        const filterSelected = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })

        selectedItems = filterSelected;
    } else {
        // Se não estiver selecionado deverá ser adicionado a seleção
        selectedItems.push(itemId);
    }

    collecteditems.value = selectedItems;
}