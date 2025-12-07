// ----------------------
// Modal + Pagination Logic (Full Implementation from Subjects)
// ----------------------

// Initialize links once to contain ALL links in the activity_categories container
let links = Array.from(document.querySelectorAll('.activity_categories a'));
let currentIndex = -1;

// NOTE: Ensure these IDs exist in [04] Research.htm
const modal = document.getElementById('viewerModal');
const iframe = document.getElementById('fileViewer');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const testBtn = document.getElementById('testBtn'); 


// ----------------------
// OPEN MODAL
// ----------------------
function openModal(index) {
    currentIndex = index;
    const link = links[index];
    const fileUrl = link.dataset.url;
    const testUrl = link.dataset.test; // Get the optional test URL

    iframe.src = fileUrl;
    modal.style.display = 'flex';

    // Update button states
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === links.length - 1;

    // Logic for the optional Test button
    if (testUrl) {
      testBtn.style.display = 'inline-block';
      testBtn.onclick = () => window.open(testUrl, '_blank');
    } else {
      testBtn.style.display = 'none';
      testBtn.onclick = null; // Cleanup handler
    }
}


// ----------------------
// ATTACH CLICK TO ALL LESSON LINKS
// ----------------------
function attachLessonEvents() {
    // Select all links within the main list container
    const allLessonLinks = document.querySelectorAll('.activity_categories a');

    allLessonLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();

            // Find correct index in the full list
            const index = links.indexOf(e.currentTarget);

            openModal(index);
        };
    });
}

// Attach events when the page loads
attachLessonEvents();


// ----------------------
// MODAL CONTROLS
// ----------------------
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = ''; // Clear iframe source for privacy/performance
    testBtn.onclick = null; // Cleanup testBtn event listener
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) openModal(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < links.length - 1) openModal(currentIndex + 1);
});

// Close modal when clicking outside (Added in your last attempt, kept here)
modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeBtn.click();
    }
});


// ----------------------
// KEYBOARD NAVIGATION (Copied from Subjects page)
// ----------------------
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeBtn.click();
        }
    }
});