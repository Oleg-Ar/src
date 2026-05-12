const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (!contactForm || !successMessage) {
    console.error(
        'One of these elements was not found: contact-form, success-message.'
    );
} else {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Block reload to prevent page from reloading

        // Hide the form
        contactForm.style.display = 'none';

        // Show the success message
        successMessage.style.display = 'block';
    });

    const textarea = document.querySelector('textarea');

    if (textarea) {
        const resize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        };

        textarea.addEventListener('input', resize);
        resize();
    }
}
