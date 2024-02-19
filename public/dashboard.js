function displayItems(items, itemsContainer) {
    // Check if the itemsContainer is provided
    if (!itemsContainer) {
        console.error("Container not provided.");
        return;
    }

    console.log('Displaying items:', items);

    // Clear previous items
    itemsContainer.innerHTML = '';

    if (items.length === 0) {
        console.log('No items found.');
        return;
    }

    items.forEach((item, index) => {
        console.log(`Processing item ${index}:`, item);

        const listItem = document.createElement('li');
        listItem.className = 'item';

        // Display category for lost items
        if (item.category) {
            const itemCategory = document.createElement('div');
            itemCategory.className = 'item-category';
            itemCategory.textContent = `Category: ${item.category}`;
            listItem.appendChild(itemCategory);
        }

        const itemDescription = document.createElement('div');
        itemDescription.className = 'item-description';
        itemDescription.textContent = `Description: ${item.description}`;
        listItem.appendChild(itemDescription);

        const itemLocation = document.createElement('div');
        itemLocation.className = 'item-location';
        itemLocation.textContent = `Location Found: ${item.location_found}`;
        listItem.appendChild(itemLocation);

        const itemDate = document.createElement('div');
        itemDate.className = 'item-date';
        itemDate.textContent = `Date Found: ${item.date_found}`;
        listItem.appendChild(itemDate);

        // For found items, display finder information
        if (item.finder_info) {
            const finderInfo = document.createElement('div');
            finderInfo.className = 'finder-info';
            finderInfo.textContent = `Finder Information: ${item.finder_info}`;
            listItem.appendChild(finderInfo);
        }

        itemsContainer.appendChild(listItem);
    });

    console.log('Dashboard - itemsContainer:', itemsContainer);
}
