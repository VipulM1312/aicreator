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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Generation failed");
      }

      const blob = await response.blob();
      const mediaUrl = URL.createObjectURL(blob);

      result.innerHTML = `<img src="${mediaUrl}" style="max-width: 100%; border-radius: 12px; margin-top: 10px;">`;
      status.innerText = "Success!";
    } catch (err) {
      status.innerText = "Error: " + err.message;
    }
  }
});
    
