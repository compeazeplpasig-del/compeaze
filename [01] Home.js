// Scroll to context section
document.getElementById("call_to_action").addEventListener("click", function() {
  document.querySelector(".context").scrollIntoView({ behavior: "smooth" });
});

// Gmail button
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contact_us");
  if (contactBtn) {
    contactBtn.addEventListener("click", function(event) {
      event.preventDefault();
      const email = "compeaze.plpasig@gmail.com";
      const subject = encodeURIComponent("Inquiry from Compeaze Website");
      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
      const mailtoURL = `mailto:${email}?subject=${subject}`;
      const gmailWindow = window.open(gmailURL, "_blank");
      setTimeout(() => {
        if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === "undefined") {
          window.location.href = mailtoURL;
        }
      }, 500);
    });
  }
});

// Hover highlight for context buttons
function applyHeaderStyle(headerButton) { if(headerButton) headerButton.classList.add('highlight-header'); }
function removeHeaderStyle(headerButton) { if(headerButton) headerButton.classList.remove('highlight-header'); }

const contextProgram = document.getElementById('context_program');
const contextSubject = document.getElementById('context_subject');
const contextResearch = document.getElementById('context_research');

const headerButtons = document.querySelectorAll('.navigation_bar_content button:not(.home_button):not(.help_button)');
const headerProgram = headerButtons[0], headerSubject = headerButtons[1], headerResearch = headerButtons[2];

contextProgram.addEventListener('mouseover', () => applyHeaderStyle(headerProgram));
contextProgram.addEventListener('mouseout', () => removeHeaderStyle(headerProgram));
contextSubject.addEventListener('mouseover', () => applyHeaderStyle(headerSubject));
contextSubject.addEventListener('mouseout', () => removeHeaderStyle(headerSubject));
contextResearch.addEventListener('mouseover', () => applyHeaderStyle(headerResearch));
contextResearch.addEventListener('mouseout', () => removeHeaderStyle(headerResearch));
