document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        const date = document.getElementById('bookingDate').value;
        const rawTime = document.getElementById('bookingTime').value;
        const guests = document.getElementById('guestCount').value;
        const email = document.getElementById('contactEmail').value;

        // Format time (e.g., "21:05" -> "9:05 PM")
        let [hours, minutes] = rawTime.split(':');
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        // Format date (e.g., "2026-12-07" -> "Dec 7, 2026")
        const dateObj = new Date(date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        const guestLabel = guests === '1' ? 'guest' : 'guests';

        // Inject details into the Bootstrap Modal
        const modalDetails = document.getElementById('modalBookingDetails');
        modalDetails.innerHTML = `
          Your table for <span class="text-light fw-semibold">${guests} ${guestLabel}</span> 
          on <span class="text-warning fw-semibold">${formattedDate}</span> 
          at <span class="text-warning fw-semibold">${formattedTime}</span> is reserved.<br>
          <small class="d-block mt-2">Confirmation sent to: ${email}</small>
        `;

        // Show the Bootstrap Modal
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();

        form.reset();
        form.classList.remove('was-validated');
      } else {
        form.classList.add('was-validated');
      }
    }, false);
  });
});