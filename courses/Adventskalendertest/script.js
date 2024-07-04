document.addEventListener('DOMContentLoaded', () => {
    const days = document.querySelectorAll('#advent-calendar li');
    const overlay = document.getElementById('overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayImage = document.getElementById('overlay-image');
    const overlayText = document.getElementById('overlay-text');
    const closeButton = document.getElementById('close-button');
    const openAllDoorsButton = document.getElementById('open-all-doors');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    days.forEach(day => {
        const dayNumber = day.id.replace('day', '');
        day.setAttribute('data-day', dayNumber);

        const content = day.querySelector('p');
        const image = day.querySelector('img');
        const shortTitle = day.getAttribute('data-short-title');
        
        const shortTitleElement = document.createElement('div');
        shortTitleElement.className = 'short-title';
        shortTitleElement.textContent = shortTitle;
        shortTitleElement.style.display = 'none'; // Initially hide the short title
        day.appendChild(shortTitleElement);

        // Add initial classes based on whether the door can be opened
        if (currentMonth === 6 && dayNumber <= currentDay) {  // Assuming currentMonth 11 represents December
            day.classList.add('hidden');
        } else {
            day.classList.add('hidden');
            content.innerText = "This door cannot be opened yet";
        }

        // Add click event listener to each day
        day.addEventListener('click', (event) => {
            event.stopPropagation();
            if (currentMonth === 6 && dayNumber <= currentDay) {  // Assuming currentMonth 11 represents December
                overlayTitle.textContent = shortTitle;
                overlayText.innerHTML = content.innerHTML;
                overlay.style.display = 'flex';
                if (image && image.src) {
                    overlayImage.src = image.src;
                    overlayImage.style.display = 'block';
                } else {
                    overlayImage.style.display = 'none';
                }
                day.classList.add('opened');
                shortTitleElement.style.display = 'block';
            } else {
                // Flash effect for doors that cannot be opened
                day.classList.add('flash');
                content.innerText = "This door cannot be opened yet"; // Ensure the message is shown
                content.style.display = "block"; // Make sure the message is shown

                setTimeout(() => {
                    day.classList.remove('flash');
                    content.style.display = "none"; // Hide the message after flash
                }, 500); // Flash duration
            }
        });
    });

    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        // Show the short title for opened doors
        document.querySelectorAll('#advent-calendar li.opened').forEach(day => {
            day.querySelector('.short-title').style.display = 'block';
        });
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            // Show the short title for opened doors
            document.querySelectorAll('#advent-calendar li.opened').forEach(day => {
                day.querySelector('.short-title').style.display = 'block';
            });
        }
    });

    // Add event listener to open all openable doors
    openAllDoorsButton.addEventListener('click', () => {
        days.forEach(day => {
            const dayNumber = parseInt(day.getAttribute('data-day'), 10);
            if (currentMonth === 6 && dayNumber <= currentDay) {  // Assuming currentMonth 5 represents December
                const shortTitleElement = day.querySelector('.short-title');
                shortTitleElement.style.display = 'block';
                day.classList.add('opened');
                day.classList.remove('hidden');
            }
        });
    });
});
