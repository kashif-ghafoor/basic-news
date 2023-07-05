// on document load fetch data

const container = `
<div class="w3-quarter">
    <img
    src="https://www.eatingwell.com/thmb/YxkWBfh2AvNYrDKoHukRdmRvD5U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"
    alt="Sandwich"
    style="width: 100%"
    />
    <h3>The Perfect Sandwich, A Real NYC Classic</h3>
    <p>Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.</p>
</div>
`;

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchNews();
  console.log(data);

  const newsContainer = document.querySelector("#news-container");

  data["articles"].forEach((article) => {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("w3-quarter");
    const image = document.createElement("img");
    image.src = article.urlToImage;
    image.style.width = "100%"; // sets the width of the image
    image.style.height = "200px"; // sets the height of the image
    image.style.objectFit = "cover"; // ensures that the aspect ratio of the image is maintained

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    // Trim the description to 100 characters
    description.textContent =
      article.description.length > 100
        ? article.description.substring(0, 100) + "..."
        : article.description;

    articleContainer.appendChild(image);
    articleContainer.appendChild(title);
    articleContainer.appendChild(description);

    newsContainer.appendChild(articleContainer);
  });
});

// const apiKey = "ea403db9f526455aba7beda8873e98c6";
// const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ea403db9f526455aba7beda8873e98c6`;

async function fetchNews() {
  const url = "https://newsapi.org/v2/top-headlines?country=us";
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": "ea403db9f526455aba7beda8873e98c6",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.firstChild;
}
