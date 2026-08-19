const API_URL = "https://aicreatorapi.mvtalpada613.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const imageBtn = document.getElementById("imageBtn");
  const videoBtn = document.getElementById("videoBtn");

  if (imageBtn) {
    imageBtn.addEventListener("click", () => generateMedia("imagePrompt", "imageStatus", "imageResult"));
  }

  if (videoBtn) {
    videoBtn.addEventListener("click", () => generateMedia("videoPrompt", "videoStatus", "videoResult"));
  }

  async function generateMedia(promptId, statusId, resultId) {
    const promptInput = document.getElementById(promptId);
    const status = document.getElementById(statusId);
    const result = document.getElementById(resultId);

    const prompt = promptInput ? promptInput.value.trim() : "";

    if (!prompt) {
      status.innerText = "Please enter a prompt!";
      return;
    }

    status.innerText = "Generating... Please wait 5-10 seconds.";
    result.innerHTML = "";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt })
      });

      if (!response.ok) {
        throw new Error("Server error, please try again.");
      }

      const contentType = response.headers.get("content-type");

      // Case 1: If API directly returns Image Binary
      if (contentType && contentType.includes("image")) {
        const blob = await response.blob();
        const mediaUrl = URL.createObjectURL(blob);
        showImage(mediaUrl, result, status);
        return;
      }

      // Case 2: If API returns JSON containing URL
      const data = await response.json();
      const imageUrl = data.url || data.image || data.response || (data[0] && data[0].url);

      if (imageUrl) {
        showImage(imageUrl, result, status);
      } else {
        throw new Error("Image URL not found in API response");
      }

    } catch (err) {
      status.innerText = "Error: " + err.message;
    }
  }

  function showImage(src, result, status) {
    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "12px";
    img.style.marginTop = "10px";

    img.onload = () => {
      result.innerHTML = "";
      result.appendChild(img);
      status.innerText = "Success!";
    };

    img.onerror = () => {
      status.innerText = "Failed to load generated image.";
    };
  }
});
