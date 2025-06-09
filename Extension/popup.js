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
    // Tooltip delay logic
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach((item, index) => {
    let timeout;

    item.addEventListener('mouseenter', () => {
      timeout = setTimeout(() => {
        item.classList.add('show-tooltip');
      }, 300); //tooltip appear delay
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(timeout);
      item.classList.remove('show-tooltip');
    });
    //redirect to Trackvie
    if (index === 1) {
      item.addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:3000" }); 
      });
    }
  });


  // Ask background for the current tab URL
  chrome.runtime.sendMessage({ type: "get-page-info" }, (response) => {
    if (response && response.title) {
      showName.textContent = response.title;
      isUrlFound = true;
    } else {
      showName.textContent = "Title not found";
      isUrlFound = false;
    }
  });

  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");

    const isRotated = settingsBtn.classList.toggle("rotated");
    settingsBtn.style.transform = isRotated ? "rotate(45deg)" : "rotate(0deg)";

    if (dropdown.classList.contains("show")) {
      document.querySelectorAll(".dropdown-item").forEach((item, index) => {
        item.style.animation = "none";
        item.offsetHeight; 
        item.style.animation = `dropIn 0.3s ease forwards`;
        item.style.animationDelay = `${index * 0.05}s`;
      });
    }
  });

 saveBtn.addEventListener("click", () => {
  if (isUrlFound) {
    chrome.runtime.sendMessage({ type: "get-page-info" }, (response) => {
      const url = response?.url;
      const title = response?.title;
      if (!url) return;

      chrome.runtime.sendMessage({ type: "get-video-progress" }, async (progressResponse) => {
        const progress = progressResponse?.progress;

        const btnText = saveBtn.querySelector(".btn-text");
        const spinner = saveBtn.querySelector("i.fa-circle-notch");

        btnText.style.display = "none";
        spinner.style.display = "inline-block";

        // 🔐 Fetch token & userId from extension storage
        chrome.storage.local.get(["userToken", "userId"], async (result) => {
          const token = result.userToken;
          const userId = result.userId;

          if (!token || !userId) {
            notification.textContent = "User not authenticated.";
            notification.classList.add("show");
            setTimeout(() => notification.classList.remove("show"), 1500);
            btnText.style.display = "inline";
            spinner.style.display = "none";
            return;
          }

          try {
            const res = await fetch(`http://localhost:4000/users/${userId}/savedShows`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                url: url,
                videoProgress: progress.currentTime,
                title: title,
              }),
            });

            notification.textContent = res.ok ? "Show saved!" : "Failed to save.";
          } catch (error) {
            console.error("Error saving:", error);
            notification.textContent = "Error while saving.";
          } finally {
            btnText.style.display = "inline";
            spinner.style.display = "none";

            notification.classList.add("show");
            setTimeout(() => {
              notification.classList.remove("show");
            }, 1500);
          }
        });
      });
    });
  } else {
    notification.textContent = "Couldn't save show";
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
    if (!dropdown.contains(e.target) && e.target !== settingsBtn) {
      dropdown.classList.remove("show");
      settingsBtn.classList.remove("rotated");
      settingsBtn.style.transform = "rotate(0deg)";
    }
  });
});
function generateDocId() {
  return `doc-${Date.now()}`;
}

