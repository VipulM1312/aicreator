const API_URL = "https://aicreatorapi.mvtalpada613.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("imageBtn").addEventListener("click", () => generate("imagePrompt", "imageStatus", "imageResult"));
  document.getElementById("videoBtn").addEventListener("click", () => generate("videoPrompt", "videoStatus", "videoResult"));
});

async function generate(promptId, statusId, resultId) {
  const prompt = document.getElementById(promptId).value.trim();
  const status = document.getElementById(statusId);
  const result = document.getElementById(resultId);

  if (!prompt) return status.innerText = "Prompt likhein!";
  status.innerText = "Loading...";
  result.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ prompt: prompt })
    });
    const data = await response.json();
    
    if (data.url) {
      result.innerHTML = `<img src="${data.url}" style="width:100%; border-radius:10px;">`;
      status.innerText = "Success!";
    } else {
      status.innerText = "Error: URL nahi mila.";
    }
  } catch (err) {
    status.innerText = "Connection Error!";
  }
    }
                           
