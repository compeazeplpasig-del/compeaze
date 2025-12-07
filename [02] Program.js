const dropdownButtons = document.querySelectorAll('.ccs_program, .mission_vision_goals');

dropdownButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;

    // Close all other dropdowns
    document.querySelectorAll('.dropdown_content').forEach(other => {
      if (other !== content) {
        other.classList.remove('show');
        other.previousElementSibling.classList.remove('active');
        other.previousElementSibling.querySelector('.dropdown_icon').classList.remove('active');
      }
    });

    // Toggle the current one
    content.classList.toggle('show');
    button.classList.toggle('active');
    button.querySelector('.dropdown_icon').classList.toggle('active');
  });
});