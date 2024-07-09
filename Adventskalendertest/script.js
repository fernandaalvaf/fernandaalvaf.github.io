document.addEventListener('DOMContentLoaded', () => {
    // define variables
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

    // define a variable for the month of the Adventskalender
    const adventMonth = 6;  // for December, change to 11

    // iterate through the list items (or days) in the ordered list
    days.forEach(day => {
        // get day number from the attribute "id" (e.g. "day1" -> 1) and cast it as int
        const dayNumber = day.id.replace('day', '');
        day.setAttribute('data-day', dayNumber);
        // get content from each day: text (=content), img and title
        const content = day.querySelector('p');
        const image = day.querySelector('img');
        const shortTitleElement = day.querySelector('.short-title');
        const shortTitle = shortTitleElement.textContent;

        // add click event listener to each day
        day.addEventListener('click', (event) => {
            event.stopPropagation(); // apparently necessary to avoid that clicking parent elements triggers the event
            if (currentMonth === adventMonth  && dayNumber <= currentDay) {  
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
                // flash doors that cannot be opened
                day.classList.add('flash');
                // show message
                content.innerText = "This door cannot be opened yet"; 
                content.style.display = "block";
                // hide message after a while    
                setTimeout(() => {
                    day.classList.remove('flash');
                    content.style.display = "none"; 
                }, 500); // flash duration
            }
        });
    });
    // adding an event to the close button, close the "pop-up"
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none'; // hide overlay
        // show the short title for opened doors
        document.querySelectorAll('#advent-calendar li.opened').forEach(day => {
            day.querySelector('.short-title').style.display = 'block';
        });
    });

    // clicking outside of the "pop-up" also closes it
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            // show the short title for opened doors - same as before
            document.querySelectorAll('#advent-calendar li.opened').forEach(day => {
                day.querySelector('.short-title').style.display = 'block';
            });
        }
    });

    // add event listener to open all openable doors
    openAllDoorsButton.addEventListener('click', () => {
        days.forEach(day => {
            const dayNumber = parseInt(day.getAttribute('data-day'), 10);
            if (currentMonth === adventMonth  && dayNumber <= currentDay) {  
                const shortTitleElement = day.querySelector('.short-title');
                shortTitleElement.style.display = 'block';
                day.classList.add('opened');
                day.classList.remove('hidden');
            }
        });
    });
});
