const pages = [
  ["AI Image Generator", "#image", "Create AI images from text prompts."],
  ["AI Video Generator", "#video", "Create AI videos from text prompts."],
  ["Search", "#search", "Search content inside AI Creator Hub."],
  ["About", "#about", "Learn about AI Creator Hub."],
  ["Contact", "#contact", "Contact information."],
  ["Privacy Policy", "#privacy", "Privacy information."],
  ["Terms & Conditions", "#terms", "Website terms."]
];

const API_URL =
  "https://aicreatorapi.mvtalpada613.workers.dev";


/* IMAGE */

const imageBtn = document.getElementById("imageBtn");
const imageStatus = document.getElementById("imageStatus");
const imageResult = document.getElementById("imageResult");

imageBtn.addEventListener("click", async () => {
  const prompt =
    document.getElementById("imagePrompt").value.trim();

  if (!prompt) {
    imageStatus.textContent =
      "Please enter an image prompt.";
    return;
  }

  imageBtn.disabled = true;
  imageStatus.textContent =
    "Generating image... Please wait.";
  imageResult.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "image",
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    imageResult.innerHTML = `
      <img
        src="${url}"
        alt="AI Generated Image"
        style="max-width:100%;border-radius:12px;"
      >
      <br><br>
      <a href="${url}" download="ai-image.png">
        Download Image
      </a>
    `;

    imageStatus.textContent =
      "Image generated successfully.";

  } catch (error) {
    console.error(error);

    imageStatus.textContent =
      "Image generation failed.";

    imageResult.innerHTML = `
      <p class="note">
        ${error.message}
      </p>
    `;
  }

  imageBtn.disabled = false;
});


/* VIDEO */

const videoBtn = document.getElementById("videoBtn");
const videoStatus = document.getElementById("videoStatus");
const videoResult = document.getElementById("videoResult");

videoBtn.addEventListener("click", async () => {
  const prompt =
    document.getElementById("videoPrompt").value.trim();

  if (!prompt) {
    videoStatus.textContent =
      "Please enter a video prompt.";
    return;
  }

  videoBtn.disabled = true;
  videoStatus.textContent =
    "Generating video... This may take longer.";
  videoResult.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "video",
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    videoResult.innerHTML = `
      <video
        src="${url}"
        controls
        style="max-width:100%;border-radius:12px;"
      ></video>
      <br><br>
      <a href="${url}" download="ai-video.mp4">
        Download Video
      </a>
    `;

    videoStatus.textContent =
      "Video generated successfully.";

  } catch (error) {
    console.error(error);

    videoStatus.textContent =
      "Video generation failed.";

    videoResult.innerHTML = `
      <p class="note">
        ${error.message}
      </p>
    `;
  }

  videoBtn.disabled = false;
});


/* SEARCH */

function doSearch() {
  const q = document
    .getElementById("searchBox")
    .value
    .trim()
    .toLowerCase();

  const box =
    document.getElementById("searchResults");

  if (!q) {
    box.innerHTML =
      "<p class='note'>Type something to search.</p>";
    return;
  }

  const matches = pages.filter(p =>
    (p[0] + " " + p[2])
      .toLowerCase()
      .includes(q)
  );

  box.innerHTML = matches.length
    ? matches.map(p => `
        <div class="search-item">
          <a href="${p[1]}">${p[0]}</a>
          <div>${p[2]}</div>
        </div>
      `).join("")
    : "<p class='note'>No result found on this website.</p>";
}

document
  .getElementById("searchBtn")
  .addEventListener("click", doSearch);

document
  .getElementById("searchBox")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") {
      doSearch();
    }
  });
