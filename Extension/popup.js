document.addEventListener("DOMContentLoaded", () => {
  const db = window.db;

  const settingsBtn = document.getElementById("settings-btn");
  const dropdown = document.getElementById("dropdown-menu");
  const saveBtn = document.getElementById("save-btn");
  const showName = document.getElementById("title");
  const notification = document.getElementById("notification");
  const autoSaveToggle = document.getElementById("autoSaveToggle");
  const autosaveTxt = document.getElementById("autosaveTxt");
  let isUrlFound = true;

  // Ask background for the current tab URL
  chrome.runtime.sendMessage({ type: "get-url" }, (response) => {
    if (response && response.url) {
      showName.textContent = response.url;
      isUrlFound = true;
    } else {
      showName.textContent = "URL not found";
      isUrlFound = false;
    }
  });

  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");

    const isRotated = settingsBtn.classList.toggle("rotated");
    settingsBtn.style.transform = isRotated ? "rotate(45deg)" : "rotate(0deg)";
  });

  saveBtn.addEventListener("click", () => {
    if(isUrlFound){ 
      //showName.textContent = "Show saved!";
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 1500);}
    else{
      notification.textContent ="Couldn't save show"
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 1500);
    }
   
  });

  autoSaveToggle.addEventListener("change", () => {
    autosaveTxt.classList.add("show");
    autosaveTxt.textContent = autoSaveToggle.checked ? "autosave on" : "autosave off";

    setTimeout(() => {
      autosaveTxt.classList.remove("show");
    }, 1000);
  });

  window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
      settingsBtn.classList.remove("rotated");
      settingsBtn.style.transform = "rotate(0deg)";
    }
  });
});
