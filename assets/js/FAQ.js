document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');

        item.addEventListener('click', (event) => {
            event.stopPropagation();
            // If the clicked item is already active, close it
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                button.textContent = '+';
                content.style.height = '0px'; // Collapse the content
                content.style.opacity = 0; // Fade out
                
            } else {
                // Close any currently active item
                faqItems.forEach(i => {
                    const otherButton = i.querySelector('button');
                    const otherContent = i.querySelector('.faq-content');
                    otherButton.textContent = '+';
                    otherContent.style.height = '0px';
                    otherContent.style.opacity = 0;
                    i.classList.remove('active');
                });

                // Open the clicked item
                item.classList.add('active');
                button.textContent = '×';
                content.style.height = content.scrollHeight + 'px'; // Expand the content
                content.style.opacity = 1; // Fade in
            }
        });
    });
});