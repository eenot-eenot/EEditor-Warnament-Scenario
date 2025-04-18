function libShowFilters() {
    const filtersElement = document.querySelector('.lib-filters');
    if (filtersElement) {
        filtersElement.classList.toggle('active');
    }
}

function libToggleFilters() {
    const content = document.querySelector('.lib-filters-content');
    const button = document.querySelector('.collapse-filters');
    if (content && button) {
        content.classList.toggle('collapsed');
        button.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
    }
}

function libToggleFilterGroup(header) {
    const content = header.nextElementSibling;
    const button = header.querySelector('.collapse-filter-group');
    
    content.classList.toggle('collapsed');
    button.classList.toggle('collapsed');
    button.textContent = content.classList.contains('collapsed') ? '▼' : '▶';
}

function libApplyFilters() {
    const searchText = document.getElementById('lib-search').value.toLowerCase();
    const authorFilter = document.getElementById('lib-autor-filter').value.toLowerCase();
    const mapFilter = document.getElementById('lib-map-filter').value.toLowerCase();
    const typeFilter = document.getElementById('lib-type-filter').value;
    const languageFilter = document.getElementById('lib-language-filter').value;
    const timePeriods = Array.from(document.querySelectorAll('.checkbox-list input[type="checkbox"]:checked:not([name^="mechanics"])'))
        .map(cb => cb.value);

    // Get mechanics filters
    const mechanicsFilters = {
        economy: getCheckedValues('economy'),
        population: getCheckedValues('population'),
        resources: getCheckedValues('resources'),
        diplomacy: getCheckedValues('diplomacy'),
        rebellions: getCheckedValues('rebellions'),
        reforms: getCheckedValues('reforms'),
        events: getCheckedValues('events')
    };

    // Get all cards and convert to array for sorting
    const cards = Array.from(document.querySelectorAll('.download-card'));
    
    // Filter and sort cards
    cards.forEach(card => {
        let visible = true;

        // Apply text search
        if (searchText) {
            visible = visible && card.textContent.toLowerCase().includes(searchText);
        }

        // Apply author filter
        if (authorFilter) {
            visible = visible && card.dataset.author.toLowerCase().includes(authorFilter);
        }

        // Apply map filter
        if (mapFilter) {
            visible = visible && card.dataset.mapId.toLowerCase() === mapFilter.toLowerCase();
        }

        // Apply type filter
        if (typeFilter) {
            visible = visible && card.dataset.type === typeFilter;
        }

        // Apply language filter
        if (languageFilter) {
            visible = visible && card.dataset.languages.includes(languageFilter);
        }

        // Apply time period filter
        if (timePeriods.length > 0) {
            visible = visible && timePeriods.includes(card.dataset.period);
        }

        // Apply mechanics filters
        const mechanics = JSON.parse(card.dataset.mechanics || '{}');
        Object.entries(mechanicsFilters).forEach(([mechanic, values]) => {
            if (values.length > 0) {
                visible = visible && values.includes(mechanics[mechanic]);
            }
        });

        // Update visibility
        card.style.display = visible ? '' : 'none';
    });

    // Re-sort visible cards
    const container = document.getElementById('download-cards');
    const visibleCards = cards.filter(card => card.style.display !== 'none')
        .sort((a, b) => {
            const scoreA = parseFloat(a.dataset.score) || 0;
            const scoreB = parseFloat(b.dataset.score) || 0;
            return scoreB - scoreA;
        });

    // Reappend cards in sorted order
    visibleCards.forEach(card => container.appendChild(card));
}

function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(cb => cb.value);
}

function libClearFilters() {
    // Clear search
    document.getElementById('lib-search').value = '';
    
    // Clear dropdowns
    document.getElementById('lib-autor-filter').value = '';
    document.getElementById('lib-map-filter').value = '';
    document.getElementById('lib-type-filter').value = '';
    document.getElementById('lib-language-filter').value = '';
    
    // Clear all checkboxes
    document.querySelectorAll('.checkbox-list input[type="checkbox"]')
        .forEach(cb => cb.checked = false);

    // Re-apply filters to show all cards
    libApplyFilters();
}

