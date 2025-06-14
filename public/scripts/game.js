document.addEventListener('DOMContentLoaded', () => {
  const allSelects = document.querySelectorAll('.funfact-select'); 
  const resetButtons = document.querySelectorAll('.reset-select');

  allSelects.forEach((selectElement, index) => {
    selectElement.addEventListener('change', () => {
      updateDropdowns();
    });

    // Add click listener for reset
    resetButtons[index].addEventListener('click', () => {
      selectElement.value = 'start';
      updateDropdowns();
    });
  });

  function updateDropdowns() {
    const selectedValues = new Set(); 

    allSelects.forEach(selectElement => {
      if (selectElement.value !== 'start') {
        selectedValues.add(selectElement.value);
      }
    });

    allSelects.forEach((currentSelect, index) => {
      const options = currentSelect.querySelectorAll('option');

      // Show/hide reset button based on value
      const resetButton = resetButtons[index];
      if (currentSelect.value === 'start') {
        resetButton.style.opacity = '0';
      } else {
        resetButton.style.opacity = '1';
      }

      options.forEach(option => {
        if (option.value === 'start') {
          option.disabled = false;
          return;
        }

        if (selectedValues.has(option.value) && option.value !== currentSelect.value) {
          option.style.display = 'none';
        } else {
          option.style.display = 'flex';
        }
      });
    });
  }

  updateDropdowns();
});






