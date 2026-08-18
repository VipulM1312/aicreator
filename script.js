const pages=[
  ["AI Image Generator","#image","Create AI images from text prompts."],
  ["AI Video Generator","#video","Create AI videos from text prompts."],
  ["Search","#search","Search content inside AI Creator Hub."],
  ["About","#about","Learn about AI Creator Hub."],
  ["Contact","#contact","Contact information."],
  ["Privacy Policy","#privacy","Privacy information."],
  ["Terms & Conditions","#terms","Website terms."]
];

const imageBtn=document.getElementById("imageBtn");
const imageStatus=document.getElementById("imageStatus");
const imageResult=document.getElementById("imageResult");

imageBtn.addEventListener("click",()=>{
  const prompt=document.getElementById("imagePrompt").value.trim();
  if(!prompt){imageStatus.textContent="Please enter an image prompt.";return;}
  imageStatus.textContent="Generator interface is ready. Connect a server-side AI image model/API to generate the real image.";
  imageResult.innerHTML='<p class="note">No API key is stored in this public website. A backend/free model must be connected for real generation.</p>';
});

const videoBtn=document.getElementById("videoBtn");
const videoStatus=document.getElementById("videoStatus");
const videoResult=document.getElementById("videoResult");

videoBtn.addEventListener("click",()=>{
  const prompt=document.getElementById("videoPrompt").value.trim();
  if(!prompt){videoStatus.textContent="Please enter a video prompt.";return;}
  videoStatus.textContent="Video request interface is ready. Connect a server-side video model/API for real generation.";
  videoResult.innerHTML='<p class="note">Video generation can be slow and may have free-tier limits.</p>';
});

function doSearch(){
  const q=document.getElementById("searchBox").value.trim().toLowerCase();
  const box=document.getElementById("searchResults");
  if(!q){box.innerHTML="<p class='note'>Type something to search.</p>";return;}
  const matches=pages.filter(p=>(p[0]+" "+p[2]).toLowerCase().includes(q));
  box.innerHTML=matches.length?matches.map(p=>`<div class="search-item"><a href="${p[1]}">${p[0]}</a><div>${p[2]}</div></div>`).join(""):"<p class='note'>No result found on this website.</p>";
}
document.getElementById("searchBtn").addEventListener("click",doSearch);
document.getElementById("searchBox").addEventListener("keydown",e=>{if(e.key==="Enter")doSearch();});