const importBtn = document.getElementById("importButton");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", async () => {
  const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(
    tabs.id,
    { type: "check_login_status" },
    (response) => {
      if (!response) {
        message.style.display = "block";
        importBtn.hidden = true;
        console.log("You're not logged in");
      } else {
        message.style.display = "none";
        importBtn.hidden = false;
        console.log("success");
      }
    }
  );
});

importBtn.addEventListener("click", async () => {
  const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tabs.id, { action: "startScraping" }, (response) => {
    const status = document.getElementById("status");
    const count = document.getElementById("count");
    if(response.success){
      status.textContent = "Data scrapped successfully";
      count.textContent = `Total jobs saved: ${response.size}`;
    }else{
      alert('Error occurred while scraping!')
    }
  })
})

