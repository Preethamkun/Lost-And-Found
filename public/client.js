// client.js
function reportFoundItem(event) {
    event.preventDefault();
    const foundDescription = document.getElementById('foundDescription').value;
    const foundLocation = document.getElementById('foundLocation').value;
    const foundDate = document.getElementById('foundDate').value;
    const finderInfo = document.getElementById('finderInfo').value;

    // Validate input fields...
    // ...

    // Make a POST request using Fetch API
    fetch(`/reportFoundItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            foundDescription,
            foundLocation,
            foundDate,
            finderInfo,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Server Response:', data);
        if (data.message === 'Found item reported successfully') {
            // Send email to all registered users
            const subject = 'New Found Item Reported';
            const text = `A new found item has been reported: ${foundDescription}. Please check the website for more details.`;
            sendEmailToUsers(subject, text);

            console.log('Redirecting to confirmation page');
            // Redirect to the confirmation page or any other desired page
            window.location.href = `/found_confirmation.html?description=${foundDescription}&location=${foundLocation}&date=${foundDate}&finderInfo=${finderInfo}`;
        } else {
            // Handle other cases if needed
            alert('Found item reporting failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
    });
}

function reportLostItem(event) {
    event.preventDefault();
    const lostCategory = document.getElementById('lostCategory').value;
    const lostDescription = document.getElementById('lostDescription').value;
    const lostLocation = document.getElementById('lostLocation').value;
    const lostDate = document.getElementById('lostDate').value;

    // Validate input fields...
    // ...

    // Make a POST request using Fetch API
    fetch(`/reportLostItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lostCategory,
            lostDescription,
            lostLocation,
            lostDate,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Server Response:', data);
        if (data.message === 'Lost item reported successfully') {
            // Send email to all registered users
            const subject = 'New Lost Item Reported';
            const text = `A new lost item has been reported: ${lostDescription}. Please check the website for more details.`;
            sendEmailToUsers(subject, text);

            // Redirect to the confirmation page or any other desired page
            window.location.href = `/confirmation.html?description=${lostDescription}&location=${lostLocation}&date=${lostDate}`;
        } else {
            // Handle other cases if needed
            alert('Lost item reporting failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
    });
}
