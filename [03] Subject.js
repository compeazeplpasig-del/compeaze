// ----------------------
// Modal + Pagination Logic
// ----------------------

let links = Array.from(document.querySelectorAll('#lessonList a')); 
let currentIndex = -1;

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
  const testUrl = link.dataset.test;

  iframe.src = fileUrl;
  modal.style.display = 'flex';

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === links.length - 1;

  if (testUrl) {
    testBtn.style.display = 'inline-block';
    testBtn.onclick = () => window.open(testUrl, '_blank');
  } else {
    testBtn.style.display = 'none';
  }
}


// ----------------------
// ATTACH CLICK TO ALL LESSON LINKS
// BUT ALWAYS USE UPDATED VISIBLE LINKS
// ----------------------
function attachLessonEvents() {
  const allLessonLinks = document.querySelectorAll('#lessonList a');

  allLessonLinks.forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();

      // Rebuild links array using only visible lessons
      links = Array.from(document.querySelectorAll('#lessonList li:not([style*="display: none"]) a'));

      // Find correct index
      const index = links.indexOf(e.currentTarget);

      openModal(index);
    };
  });
}

attachLessonEvents();


// ----------------------
// MODAL CONTROLS
// ----------------------
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  iframe.src = '';
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) openModal(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < links.length - 1) openModal(currentIndex + 1);
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
    iframe.src = '';
  }
});

// ----------------------
// SINGLE FILTER SYSTEM (Correct Behavior)
// ----------------------

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Reset active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const lessons = document.querySelectorAll('.subject_categories li');

    lessons.forEach(lesson => {
      const link = lesson.querySelector('a');
      const category = lesson.getAttribute('data-category') || link?.dataset.category;

    if (filter === 'all') {
        lesson.style.display = '';
    } else {
        const categories = category.split(',').map(c => c.trim());
        lesson.style.display = categories.includes(filter) ? '' : 'none';
    }
    });

    // Show or hide each category section
    document.querySelectorAll('.midterm_materials, .final_materials')
      .forEach(section => {
        const visibleLessons = section.querySelectorAll('li:not([style*="display: none"])');
        section.style.display = visibleLessons.length > 0 ? '' : 'none';
      });

    // Update modal pagination list
    links = Array.from(document.querySelectorAll('#lessonList li:not([style*="display: none"]) a'));

    // Re-attach events so index matches the visible items
    attachLessonEvents();
  });
});
