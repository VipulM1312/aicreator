const API_URL = "https://aicreatorapi.mvtalpada613.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const imageBtn = document.getElementById("imageBtn");
  const videoBtn = document.getElementById("videoBtn");

  // Image Generation Logic
  if (imageBtn) {
    imageBtn.addEventListener("click", async () => {
      const prompt = document.getElementById("imagePrompt").value.trim();
      const status = document.getElementById("imageStatus");
      const result = document.getElementById("imageResult");

      if (!prompt) {
        status.innerText = "Kripya prompt likhein!";
        return;
      }

      status.innerText = "Generating image...";
      result.innerHTML = "";

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt, type: "image" })
        });

        if (!response.ok) throw new Error("Image generate nahi ho payi");

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);

        result.innerHTML = `<img src="${imgUrl}" alt="Generated Image" style="max-width: 100%; border-radius: 8px;">`;
        status.innerText = "Success!";
      } catch (err) {
        status.innerText = "Error: " + err.message;
      }
    });
  }

  // Video Generation Logic
  if (videoBtn) {
    videoBtn.addEventListener("click", async () => {
      const prompt = document.getElementById("videoPrompt").value.trim();
      const status = document.getElementById("videoStatus");
      const result = document.getElementById("videoResult");

      if (!prompt) {
        status.innerText = "Kripya prompt likhein!";
        return;
      }

      status.innerText = "Generating video/animation...";
      result.innerHTML = "";

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt, type: "video" })
        });

        if (!response.ok) throw new Error("Video generate nahi ho payi");

        const blob = await response.blob();
        const mediaUrl = URL.createObjectURL(blob);

        result.innerHTML = `<img src="${mediaUrl}" alt="Generated Video" style="max-width: 100%; border-radius: 8px;">`;
        status.innerText = "Success!";
      } catch (err) {
        status.innerText = "Error: " + err.message;
      }
    });
  }
});
