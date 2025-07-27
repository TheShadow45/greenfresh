document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const formStatus = document.getElementById('formStatus');

    if (orderForm) {
        orderForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(orderForm);
            const actionUrl = orderForm.action; // Get the Formspree URL from the form's action attribute

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Formspree requires this header
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thank you for your order! We will get back to you soon.';
                    formStatus.className = 'form-status success';
                    orderForm.reset(); // Clear the form fields
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        // Formspree returns errors in a specific format
                        formStatus.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your order.';
                    }
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.textContent = 'An error occurred. Please try again later.';
                formStatus.className = 'form-status error';
                console.error('Error submitting form:', error);
            } finally {
                formStatus.style.display = 'block'; // Show the status message
            }
        });
    }

    // Optional: Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
