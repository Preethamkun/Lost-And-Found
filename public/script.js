//script.js
document.addEventListener('DOMContentLoaded', function () {
    const backendBaseUrl = 'http://localhost:3000';
    const itemsContainer = document.getElementById('itemsContainer');
    console.log('Script - itemsContainer:', itemsContainer);
    function fetchItems() {
        // Example: Log responses
fetch(`${backendBaseUrl}/api/items`)
.then(response => response.json())
.then(data => {
    console.log('API Response:', data);
    displayItems(data.items, itemsContainer);
})
.catch(error => {
    console.error('Error fetching items:', error);
});

    }

    const lostItemsUrl = 'http://localhost:3000/api/lost-items';
    const foundItemsUrl = 'http://localhost:3000/api/found-items';

    
  // Update the total reported lost items in the summary statistics
function updateTotalLostItems(totalLostItems) {
    const lostItemsElement = document.getElementById('totalLostItems');
    if (lostItemsElement) {
        lostItemsElement.textContent = totalLostItems;
    }
}

// Update the total found items in the summary statistics
function updateTotalFoundItems(totalFoundItems) {
    const foundItemsElement = document.getElementById('totalFoundItems');
    if (foundItemsElement) {
        foundItemsElement.textContent = totalFoundItems;
    }
}

// Fetch and display lost items
function fetchLostItems() {
    fetch('http://localhost:3000/api/lost-items')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched lost items:', data.items);
            displayItems(data.items, document.getElementById('lostItemList'), true); // Display lost items
            updateTotalLostItems(data.items.length); // Update total lost items
        })
        .catch(error => {
            console.error('Error fetching lost items:', error);
        });
}

// Function to remove a lost item
function removeLostItem(itemId) {
    // Send a request to your backend server to delete the item
    fetch(`${backendBaseUrl}/api/lost-items/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Remove the item from the UI
            const itemToRemove = document.querySelector(`.lost-item[data-item-id="${itemId}"]`);
            if (itemToRemove) {
                itemToRemove.remove();
            }
        } else {
            console.error('Failed to delete lost item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting lost item:', error);
    });
}

// Event delegation to handle remove item button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item-btn')) {
        const itemId = event.target.dataset.itemId;
        if (itemId) {
            if (confirm('Are you sure you want to remove this item?')) {
                removeLostItem(itemId);
            }
        }
    }
});


// Fetch and display found items
function fetchFoundItems() {
    fetch('http://localhost:3000/api/found-items')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched found items:', data.items);
            displayItems(data.items, document.getElementById('foundItemList'), false);
            updateTotalFoundItems(data.items.length); // Update total found items
        })
        .catch(error => {
            console.error('Error fetching found items:', error);
        });
}

// Fetch lost items initially when the page loads
fetchLostItems();

// Periodically fetch lost items (every 5 minutes in this example)
setInterval(fetchLostItems, 5 * 60 * 1000);

// Fetch found items initially when the page loads
fetchFoundItems();

// Periodically fetch found items (every 5 minutes in this example)
setInterval(fetchFoundItems, 5 * 60 * 1000);


    // Function to report a found item using Fetch API
    function reportFoundItem(event) {
        event.preventDefault();
        const foundDescription = document.getElementById('foundDescription').value;
        const foundLocation = document.getElementById('foundLocation').value;
        const foundDate = document.getElementById('foundDate').value;
        const finderInfo = document.getElementById('finderInfo').value;

        console.log('Form Values:', {
            foundDescription,
            foundLocation,
            foundDate,
            finderInfo,
        });

        // Validate that the description and other required fields are not empty
        if (!foundDescription.trim() || !foundLocation.trim() || !foundDate.trim() || !finderInfo.trim()) {
            alert('Please fill in all the required fields.');
            return;
        }

        // Make a POST request using Fetch API
        fetch(`${backendBaseUrl}/reportFoundItem`, {
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

    const foundItemForm = document.getElementById('foundItemForm');
    if (foundItemForm) {
        foundItemForm.addEventListener('submit', reportFoundItem);
    }

    // Function to report a lost item using Fetch API
    function reportLostItem(event) {
        event.preventDefault();
        const lostCategory = document.getElementById('lostCategory').value;
        const lostDescription = document.getElementById('lostDescription').value;
        const lostLocation = document.getElementById('lostLocation').value;
        const lostDate = document.getElementById('lostDate').value;

        // Log the values to the console for debugging
        console.log('Lost Description:', lostDescription);
        console.log('Lost Location:', lostLocation);
        console.log('Lost Date:', lostDate);
        console.log('Lost Category:', lostCategory);

        // Validate that the description is not empty
        if (!lostDescription.trim()) {
            alert('Please provide a description for the lost item.');
            return;
        }

        // Make a POST request using Fetch API
        fetch(`${backendBaseUrl}/reportLostItem`, {
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

    const lostItemForm = document.getElementById('lostItemForm');
    if (lostItemForm) {
        lostItemForm.addEventListener('submit', reportLostItem);
    }

    function updateUI() {
        console.log('UI updated');
    }

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        makeRequest('POST', '/login', { username, password }, backendBaseUrl,
            function (response) {
                // Authentication successful
                showNotification(`Welcome back, ${response.username}!`);
                setAuthentication(response.userId, response.username);
                // Refresh the UI after authentication
                updateUI();
            },
            function (error) {
                // Authentication failed
                console.error('Error during login:', error);

                // Display error message based on the error type
                if (error.details && error.details.type === 'user_not_found') {
                    showErrorMessage('User not found. Please check your username.');
                } else if (error.details && error.details.type === 'incorrect_password') {
                    showErrorMessage('Incorrect password. Please try again.');
                } else {
                    showErrorMessage('An error occurred during login. Please try again later.');
                }
            }
        );
    });


    function displayItems(items, container, isLostItem) {
        container.innerHTML = ''; // Clear the container first
        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('lost-item');
            itemElement.dataset.itemId = item.item_id; // Set the data-item-id attribute to the item ID
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = isLostItem ? `Lost Item: ${item.description}` : `Found Item: ${item.description}`;
    
            const locationElement = document.createElement('p');
            locationElement.textContent = isLostItem ? `Location: ${item.location_found}` : `Location Found: ${item.location_found}`;
    
            const dateElement = document.createElement('p');
            dateElement.textContent = isLostItem ? `Date Lost: ${item.date_found}` : `Date Found: ${item.date_found}`;
    
            // Append description, location, and date elements first
            itemElement.appendChild(descriptionElement);
            itemElement.appendChild(locationElement);
            itemElement.appendChild(dateElement);
    
            if (isLostItem) {
                const removeButton = document.createElement('button');
                removeButton.classList.add('remove-item-btn');
                removeButton.textContent = 'Remove Item'; // Text for the remove button
                removeButton.dataset.itemId = item.item_id; // Set the data-item-id attribute to the item ID
                itemElement.appendChild(removeButton); // Append the remove button to the list item
            } else {
                const finderInfoElement = document.createElement('p');
                finderInfoElement.textContent = `Finder Info: ${item.finder_info}`;
                itemElement.appendChild(finderInfoElement); // Append finder info for found items
            }
    
            container.appendChild(itemElement); // Append the list item to the container
        });
    }
    
    
    
    // Update the UI when the page loads
    updateUI();
});