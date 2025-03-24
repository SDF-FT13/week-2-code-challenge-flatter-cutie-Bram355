document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://flatter-kitty-2-7cds.vercel.app/characters"
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");

function fetchCharacters() {
    fetch(baseURL)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(displayCharacterInBar);
        })
        .catch(error => console.error("Error fetching characters:", error));
}

 
function displayCharacterInBar(character) {
    const span = document.createElement("span");
    span.textContent = character.name;
    span.addEventListener("click", () => showCharacterDetails(character));
    characterBar.appendChild(span);
}

  
function showCharacterDetails(character) {
    characterName.textContent = character.name;
    characterImage.src = character.image;
    characterVotes.textContent = character.votes;
    characterImage.alt = character.name;

  
    detailedInfo.dataset.id = character.id;
    detailedInfo.dataset.votes = character.votes;
}


votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes");
    let newVotes = parseInt(votesInput.value) || 0;

    if (detailedInfo.dataset.id) {
        let updatedVotes = parseInt(detailedInfo.dataset.votes) + newVotes;
        characterVotes.textContent = updatedVotes;
        detailedInfo.dataset.votes = updatedVotes;
    }
    votesInput.value = ""; 
});

   
fetchCharacters();
});




