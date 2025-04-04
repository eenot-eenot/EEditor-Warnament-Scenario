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
    const typeFilter = document.getElementById('lib-type-filter').value;
    const sizeFilter = document.getElementById('lib-size-filter').value;
    const ratingFilter = document.getElementById('lib-rating-filter').value;
    
    // Get selected time periods
    const timePeriods = Array.from(document.querySelectorAll('.checkbox-list input:checked'))
        .map(cb => cb.value);

    // Get all scenario items
    const scenarios = document.querySelectorAll('.scenario-item');

    scenarios.forEach(scenario => {
        let visible = true;

        // Apply search filter
        if (searchText) {
            const text = scenario.textContent.toLowerCase();
            visible = text.includes(searchText);
        }

        // Apply type filter
        if (visible && typeFilter) {
            visible = scenario.dataset.type === typeFilter;
        }

        // Apply time period filter
        if (visible && timePeriods.length > 0) {
            visible = timePeriods.some(period => scenario.dataset.period === period);
        }

        // Apply size filter
        if (visible && sizeFilter) {
            visible = scenario.dataset.size === sizeFilter;
        }

        // Apply rating filter
        if (visible && ratingFilter) {
            visible = parseFloat(scenario.dataset.rating) >= parseFloat(ratingFilter);
        }

        // Show/hide scenario
        scenario.style.display = visible ? 'block' : 'none';
    });
}

function libClearFilters() {
    // Reset search
    document.getElementById('lib-search').value = '';

    // Reset select elements
    document.getElementById('lib-type-filter').value = '';
    document.getElementById('lib-size-filter').value = '';
    document.getElementById('lib-rating-filter').value = '';

    // Uncheck all checkboxes
    document.querySelectorAll('.checkbox-list input[type="checkbox"]')
        .forEach(cb => cb.checked = false);

    // Re-apply filters (will show all items since filters are cleared)
    libApplyFilters();
}

async function libDownloadScenario() {
    const rawUrl = 'https://raw.githubusercontent.com/eenot-eenot/eeditor-ws-data/refs/heads/main/lib/scenarios/eenot_world_v1_modern-world.json';
    
    try {
      const response = await fetch(rawUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Определяем тип содержимого и имя файла
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const fileName = rawUrl.split('/').pop() || 'file';
  
      // Создаем Blob с правильным MIME-типом
      const blob = await response.blob();
      const enhancedBlob = new Blob([blob], { type: contentType });
  
      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.href = URL.createObjectURL(enhancedBlob);
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(link.href);
      
    } catch (error) {
      console.error('Ошибка:', error);
      // Fallback: открываем в новой вкладке
      window.open(rawUrl, '_blank');
    }
  }
  
  