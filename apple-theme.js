[file name]: apple-theme.js
[file content begin]
// Apple Theme Enhancement Script
// This script enhances the UI with Apple-style interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize color picker display
  const picker = document.getElementById('picker');
  const pickerValue = document.getElementById('pickerValue');
  const preview = document.getElementById('preview');
  const previewHex = document.getElementById('previewHex');
  
  if (picker && pickerValue) {
    // Update picker display when color changes
    picker.addEventListener('input', function() {
      const color = this.value.toUpperCase();
      pickerValue.textContent = color;
      
      // Update preview if it exists
      if (previewHex) {
        previewHex.textContent = color;
      }
      
      // Add smooth transition to preview
      if (preview) {
        preview.style.transition = 'background-color 0.3s ease';
      }
    });
  }
  
  // Enhanced copy button interactions
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target text to copy
      const targetId = this.id.replace('copy', '').toLowerCase();
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const textToCopy = targetElement.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Visual feedback
          const originalHTML = this.innerHTML;
          const originalBackground = this.style.background;
          const originalColor = this.style.color;
          const originalBorder = this.style.borderColor;
          
          // Change button to success state
          this.innerHTML = '<i class="fas fa-check"></i> <span class="btn-text">Copied!</span>';
          this.style.background = '#34C759';
          this.style.color = '#FFFFFF';
          this.style.borderColor = '#34C759';
          
          // Add subtle animation
          this.style.transform = 'scale(0.98)';
          
          // Reset after 2 seconds
          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = originalBackground;
            this.style.color = originalColor;
            this.style.borderColor = originalBorder;
            this.style.transform = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
          
          // Error feedback
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">Error</span>';
          this.style.background = '#FF3B30';
          this.style.color = '#FFFFFF';
          this.style.borderColor = '#FF3B30';
          
          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = originalBackground;
            this.style.color = originalColor;
            this.style.borderColor = originalBorder;
          }, 2000);
        });
      }
    });
  });
  
  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });
  
  // Initialize color preview with current picker value
  if (picker && preview) {
    preview.style.backgroundColor = picker.value;
    if (previewHex) {
      previewHex.textContent = picker.value.toUpperCase();
    }
  }
  
  // Update preview color when picker changes (for the main preview)
  if (picker && preview) {
    picker.addEventListener('input', function() {
      preview.style.backgroundColor = this.value;
    });
  }
});
[file content end]