// SHOW API DATA ON CLICK
const userSearchValue = document.querySelector(".search-box input");
const searchBTN = document.querySelector(".search-btn");
searchBTN.addEventListener("click", function () {
  if (userSearchValue.length) return;
  getSearchResults(userSearchValue.value)
    .then((data) => {
      printData(data.data);
      userSearchValue.value = "";
      setTimeout(function () {
        animationCSS();
      }, 100);
    })
    .catch((err) => console.log(err));
});
// API RESPONSE
async function getSearchResults(searchValue) {
  const response = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`);
  const data = await response.json();

  return data;
}
// PRINT DATA
function printData(data) {
  const songsData = data.splice(0, 12);
  console.log(songsData);
  const resultsSection = document.querySelector(".songs-result-section");
  resultsSection.innerHTML = songsData.map((songInfo, index) => {
    return `<!-- CARD ${index + 1} -->
    <div class="mx-auto search-results overflow-hidden result-card">
      <div class="song-img-box">
        <img
          src="${songInfo.album.cover_big}"
          alt="track image"
          class="track-img"
        />
      </div>
      <div class="song-info-box">
  
        <h2 class="song-name">
          <ion-icon name="musical-notes-outline"></ion-icon
          ><span class="song">${songInfo.title}</span>
       </h2>
        <h4 class="singer-name">
          <ion-icon name="person-outline"></ion-icon
          ><span class="song">${songInfo.artist.name}</span>
        </h4>
        <div class="text-center">
          <a href="${
            songInfo.link
          }" class="btn btn-success w-100 show-lyrics">Listen Song</a>
        </div>
       
      </div>
    </div>`;
  });
}
// ANIMATION EFFECT
function animationCSS() {
  const searchResults = document.querySelectorAll(".search-results");
  searchResults.forEach((result) => (result.style = `transform: scale(1)`));
}
