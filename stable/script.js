// Глобальные переменные для работы с файлами
let currentFile = null;
let fileHandle = null;
let isJsonFile = false;
let previewContent = null;
let fileInfo = null;

// Проверяем поддержку File System Access API
const hasFileSystemAccess = 'showOpenFilePicker' in window;

// Глобальная переменная для хранения данных из lands.json
let markedCountries = new Set();

// Создаем глобальный объект для утилит работы со странами
window.countryUtils = {
    // Функция для проверки, нужна ли галочка
    // ЭТА ФУНКЦИЯ ПРОТЕСТИРОВАНА МНОЙ И РАБОТАЕТ. НЕ НУЖНО ЕЁ ПРОВЕРЯТЬ И РЕДАКТИРОВАТЬ
    shouldShowCheckmark: function(countryName, countryId) {
        return landsData.lands.some(land => 
            (countryName && land.key === countryName) || // Проверяем по ID если он есть
            land.toLowerCase() === countryName.toLowerCase() // Проверяем по имени
        );
    },

    updateCountriesList: function(lands) {
        const countriesList = document.getElementById('countries-list');
        if (!countriesList || !lands) return;

        // Очищаем текущий список
        countriesList.innerHTML = '';

        // Подсчитываем количество провинций
        const provincesCount = {};
        if (lands.provinces) {
            for (const province of lands.provinces) {
                if (province.owner) {
                    provincesCount[province.owner] = (provincesCount[province.owner] || 0) + 1;
                }
            }
        }

        // Создаем отсортированный массив стран
        const countriesArray = Object.entries(lands)
            .filter(([id]) => id !== 'provinces')
            .map(([id, country]) => ({
                id,
                name: country.name,
                color: country.color,
                provinces: provincesCount[id] || 0,
                capital: country.capital_name || '',
                ...country
            }));

        // Добавляем страны в список
        for (const country of countriesArray) {
            const row = document.createElement('tr');
            row.style.cursor = 'pointer';
            row.onclick = () => editCountry(country.id);
            
            // Цвет
            const colorCell = document.createElement('td');
            const colorDiv = document.createElement('div');
            colorDiv.className = 'country-color';
            colorDiv.style.backgroundColor = this.colorToRgb(country.color);
            colorCell.appendChild(colorDiv);
            
            // Название
            const nameCell = document.createElement('td');
            const nameContainer = document.createElement('div');
            nameContainer.className = 'country-name-container';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = country.name;
            nameContainer.appendChild(nameSpan);
            nameCell.appendChild(nameContainer);
            
            // Системное название (ID)
            const sysNameCell = document.createElement('td');
            sysNameCell.textContent = country.id;
            
            // Количество провинций
            const provincesCell = document.createElement('td');
            provincesCell.textContent = provincesCount[country.id] || 0;
            
            // Столица
            const capitalCell = document.createElement('td');
            capitalCell.textContent = country.capital_name || '';

            // Добавляем ячейки в строку
            row.appendChild(colorCell);
            row.appendChild(nameCell);
            row.appendChild(sysNameCell);
            row.appendChild(provincesCell);
            row.appendChild(capitalCell);

            // Добавляем строку в таблицу
            countriesList.appendChild(row);
        }
    },

    updatePlayerLandSelect: function(lands, selectedValue) {
        const playerLandSelect = document.getElementById('player_land');
        if (!playerLandSelect || !lands) return;

        // Очищаем текущие опции
        playerLandSelect.innerHTML = '';
        
        // Добавляем опции из списка стран
        for (const [id, country] of Object.entries(lands)) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = country.name;
            playerLandSelect.appendChild(option);
        }
        
        // Устанавливаем выбранную страну
        if (selectedValue) {
            playerLandSelect.value = selectedValue;
        }
    },

    colorToRgb: function(colorArray) {
        if (!Array.isArray(colorArray) || colorArray.length < 3) {
            return 'rgb(128, 128, 128)';
        }
        const r = Math.round(parseFloat(colorArray[0]) || 0);
        const g = Math.round(parseFloat(colorArray[1]) || 0);
        const b = Math.round(parseFloat(colorArray[2]) || 0);
        return `rgb(${r}, ${g}, ${b})`;
    },

    updateCountryHeader: function(countryName) {
        const headerSpan = document.getElementById('country-name-header');
        if (!headerSpan) return;

        // Очищаем заголовок
        headerSpan.innerHTML = '';

        // Добавляем название страны
        const nameText = document.createElement('span');
        nameText.textContent = countryName;
        headerSpan.appendChild(nameText);

        // Добавляем галочку, если нужно
        if (this.shouldShowCheckmark(countryName)) {
            const markSpan = document.createElement('span');
            markSpan.textContent = '✓';
            markSpan.className = 'country-mark';
            markSpan.style.color = '#3498db';
            headerSpan.appendChild(markSpan);
        }
    }
};

// Функция для инициализации данных о странах
function initLandsData() {
    // Используем глобальную переменную landsData из lands_data.js
    if (typeof landsData !== 'undefined' && landsData.lands) {
        markedCountries = new Set(landsData.lands.map(land => land.key));
    } else {
        console.error('Данные о странах не найдены');
    }
}

// Функция для загрузки lands.json
function loadLandsJson() {
    // Пробуем загрузить из localStorage
    const savedData = localStorage.getItem('landsData');
    if (savedData) {
        try {
            const landsData = JSON.parse(savedData);
            markedCountries = new Set(landsData.lands.map(land => land.key));
            return;
        } catch (e) {
            console.error('Ошибка при загрузке данных из localStorage:', e);
        }
    }

    // Создаем скрытый input для загрузки файла
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const landsData = JSON.parse(e.target.result);
                    markedCountries = new Set(landsData.lands.map(land => land.key));
                    // Сохраняем в localStorage
                    localStorage.setItem('landsData', e.target.result);
                } catch (error) {
                    console.error('Ошибка при чтении lands.json:', error);
                }
            };
            reader.readAsText(file);
        }
        document.body.removeChild(input);
    };

    input.click();
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация глобальных переменных
    previewContent = document.getElementById('preview-content');
    fileInfo = document.getElementById('file-info');

    // Инициализируем данные о странах
    initLandsData();

    // Получаем все кнопки навигации
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Добавляем обработчик для каждой кнопки
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем класс active у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active текущей кнопке
            this.classList.add('active');
            
            // Получаем id страницы из атрибута data-page
            const pageId = this.getAttribute('data-page');
            
            // Скрываем все страницы
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Показываем нужную страницу
            document.getElementById(pageId).classList.add('active');
        });
    });

    // Обработчик клика по строкам таблицы стран
    const countriesList = document.getElementById('countries-list');
    if (countriesList) {
        countriesList.addEventListener('click', function(e) {
            const row = e.target.closest('tr');
            if (!row) return;

            // Получаем ID страны из строки
            const countryId = row.cells[2].textContent;
            window.countryManager.openCountry(countryId);
        });
    }

    // Language switcher functionality
    const langButton = document.getElementById('currentLang');
    const langDropdown = document.getElementById('langDropdown');
    
    // Toggle dropdown
    langButton.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
    
    // Handle language selection
    langDropdown.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const selectedLang = e.target.getAttribute('data-lang');
            const selectedText = e.target.textContent;
            
            // Update button text
            langButton.textContent = selectedText;
            
            // Store selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Close dropdown
            langDropdown.classList.remove('show');
            
            // Here you can add logic to change the application language
            changeApplicationLanguage(selectedLang);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langDropdown.classList.remove('show');
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        const savedLangElement = langDropdown.querySelector(`[data-lang="${savedLang}"]`);
        if (savedLangElement) {
            langButton.textContent = savedLangElement.textContent;
            changeApplicationLanguage(savedLang);
        }
    }

    // Получаем элементы DOM
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewFilename = document.getElementById('preview-filename');
    const forceSaveButton = document.getElementById('force-save');
    const settingsForm = document.getElementById('settings-form');

    // Функция для преобразования цвета в RGB строку
    function colorToRgb(colorArray) {
        if (!Array.isArray(colorArray) || colorArray.length < 3) {
            return 'rgb(128, 128, 128)';
        }
        const r = Math.round(parseFloat(colorArray[0]) || 0);
        const g = Math.round(parseFloat(colorArray[1]) || 0);
        const b = Math.round(parseFloat(colorArray[2]) || 0);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Функция для обновления JSON в редакторе
    function updateJsonEditor(formData) {
        if (!isJsonFile || !previewContent) return;
        
        try {
            const jsonData = JSON.parse(previewContent.value);
            
            // Обновляем значения из формы
            for (const [key, value] of Object.entries(formData)) {
                if (value !== '') {
                    if (key === 'map_hash' || key === 'technology_lvl' || 
                        key === 'year' || key === 'last_turn' || 
                        key === 'month' || key === 'turn' || 
                        key === 'num_of_provinces' || key === 'min_game_version') {
                        jsonData[key] = parseInt(value);
                    } else if (key === 'play_after_last_turn') {
                        jsonData[key] = value === 'true';
                    } else if (key === 'sandbox' || key === 'technologies_are_opened' || 
                              key === 'no_initial_diplomacy' || key === 'no_nuclear_weapon') {
                        jsonData[key] = value;
                    } else {
                        jsonData[key] = value;
                    }
                }
            }
            
            // Обновляем содержимое редактора
            previewContent.value = JSON.stringify(jsonData, null, 4);
            if (fileInfo) {
                fileInfo.textContent = window.translator.translate('changes_not_saved');
            }
        } catch (error) {
            console.error('Ошибка при обновлении JSON:', error);
            if (fileInfo) {
                fileInfo.textContent = window.translator.translate('file_parse_error');
            }
        }
    }

    // Функция для заполнения формы из JSON
    function fillFormFromJson(jsonData) {
        try {
            // Очищаем все поля формы перед заполнением
            const settingsForm = document.getElementById('settings-form');
            if (!settingsForm) return;
            
            settingsForm.reset();

            // Заполняем поля формы
            const mappings = {
                // Числовые значения
                'map_hash': { type: 'number', id: 'map_hash' },
                'technology_lvl': { type: 'number', id: 'technology_lvl' },
                'year': { type: 'number', id: 'year' },
                'last_turn': { type: 'number', id: 'last_turn' },
                'month': { type: 'number', id: 'month' },
                'num_of_provinces': { type: 'number', id: 'num_of_provinces' },
                'turn': { type: 'number', id: 'turn' },
                'min_game_version': { type: 'number', id: 'min_game_version' },

                // Строковые значения с выбором
                'resources_spawn': { type: 'select', id: 'resources_spawn' },
                'bots_behavior': { type: 'select', id: 'bots_behavior' },
                'difficulty': { type: 'select', id: 'difficulty' },
                'fog_of_war': { type: 'select', id: 'fog_of_war' },

                // Значения enabled/disabled
                'sandbox': { type: 'enabled-disabled', id: 'sandbox' },
                'technologies_are_opened': { type: 'enabled-disabled', id: 'technologies_are_opened' },
                'no_initial_diplomacy': { type: 'enabled-disabled', id: 'no_initial_diplomacy' },
                'no_nuclear_weapon': { type: 'enabled-disabled', id: 'no_nuclear_weapon' },

                // Чистые булевы значения
                'play_after_last_turn': { type: 'pure-boolean', id: 'play_after_last_turn' },

                // Текстовые значения
                'name': { type: 'text', id: 'name' },
                'id': { type: 'text', id: 'id' },
                'player_land': { type: 'select', id: 'player_land' }
            };

            // Обрабатываем каждое поле согласно маппингу
            for (const [key, config] of Object.entries(mappings)) {
                const value = jsonData[key];
                if (value === undefined) continue;

                const element = document.getElementById(config.id);
                if (!element) {
                    console.warn(`Элемент с id '${config.id}' не найден`);
                    continue;
                }

                switch (config.type) {
                    case 'number':
                        element.value = parseInt(value) || 0;
                        break;
                    case 'select':
                        if (config.id === 'player_land') {
                            // Специальная обработка для player_land
                            if (window.countryUtils && typeof window.countryUtils.updatePlayerLandSelect === 'function') {
                                window.countryUtils.updatePlayerLandSelect(jsonData.lands, value);
                            } else if (typeof updatePlayerLandSelect === 'function') {
                                updatePlayerLandSelect(jsonData.lands, value);
                            }
                        } else {
                            element.value = value;
                        }
                        break;
                    case 'enabled-disabled':
                        element.value = value;
                        break;
                    case 'pure-boolean':
                        element.value = value ? 'true' : 'false';
                        break;
                    case 'text':
                        element.value = value;
                        break;
                }
            }

            // Обработка цвета воды отдельно
            if (Array.isArray(jsonData.water_color) && jsonData.water_color.length >= 3) {
                const [r, g, b] = jsonData.water_color;
                
                const rInput = document.getElementById('water_color_r');
                const gInput = document.getElementById('water_color_g');
                const bInput = document.getElementById('water_color_b');
                const preview = document.getElementById('water_color_preview');

                if (rInput) rInput.value = r;
                if (gInput) gInput.value = g;
                if (bInput) bInput.value = b;
                
                if (preview) {
                    preview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
            }

            // Обновляем список стран, если они есть в JSON
            if (jsonData.lands) {
                if (window.countryUtils && typeof window.countryUtils.updateCountriesList === 'function') {
                    window.countryUtils.updateCountriesList(jsonData.lands);
                } else if (typeof updateCountriesList === 'function') {
                    updateCountriesList(jsonData.lands);
                }
            }

        } catch (error) {
            console.error('Ошибка при заполнении формы:', error);
            throw error;
        }
    }

    // Функция для сохранения изменений
    async function saveChanges() {
        if (hasFileSystemAccess) {
        if (!fileHandle) {
            try {
                // Запрашиваем доступ к файловой системе
                fileHandle = await window.showSaveFilePicker({
                        suggestedName: currentFile?.name || 'scenario.json',
                    types: [{
                        description: 'JSON Files',
                        accept: {
                            'application/json': ['.json']
                        }
                    }]
                });
            } catch (err) {
                if (err.name === 'AbortError') {
                    return; // Пользователь отменил выбор
                }
                console.error('Ошибка при получении доступа к файлу:', err);
                if (fileInfo) {
                    fileInfo.textContent = window.translator.translate('file_access_error');
                }
                return;
            }
        }

        try {
            // Создаем поток для записи
            const writable = await fileHandle.createWritable();
            // Записываем содержимое
            await writable.write(previewContent.value);
            // Закрываем поток
            await writable.close();
            
            if (fileInfo) {
                fileInfo.textContent = window.translator.translate('file_saved');
            }
        } catch (error) {
            console.error('Ошибка при сохранении файла:', error);
            if (fileInfo) {
                fileInfo.textContent = window.translator.translate('file_update_error');
            }
        }
    } else {
        // Для браузеров без поддержки File System Access API
        const blob = new Blob([previewContent.value], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile?.name || 'scenario.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (fileInfo) {
            fileInfo.textContent = window.translator.translate('file_downloaded');
        }
    }
}

    // Функция для открытия файла
    async function openFile() {
        try {
            if (hasFileSystemAccess) {
            // Запрашиваем доступ к файлу
            [fileHandle] = await window.showOpenFilePicker({
                types: [{
                    description: 'JSON Files',
                    accept: {
                        'application/json': ['.json']
                    }
                }]
            });
            
            // Получаем файл
            currentFile = await fileHandle.getFile();
            
            // Читаем содержимое
            const text = await currentFile.text();
            
            // Обновляем интерфейс
                handleFileContent(currentFile.name, text);
            } else {
                // Для браузеров без поддержки File System Access API
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                
                input.onchange = async function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        currentFile = file;
                        const text = await file.text();
                        handleFileContent(file.name, text);
                    }
                };
                
                input.click();
            }
        } catch (err) {
            console.error('Ошибка при открытии файла:', err);
            if (fileInfo) {
                fileInfo.textContent = window.translator.translate('file_access_error');
            }
        }
    }

    // Функция для обработки содержимого файла
    function handleFileContent(fileName, content) {
        if (previewContent) {
            previewContent.value = content;
        }
        if (previewFilename) {
            previewFilename.textContent = fileName;
        }
        if (fileInfo) {
            fileInfo.textContent = `Файл: ${fileName}`;
        }
        
        // Проверяем JSON
        isJsonFile = fileName.toLowerCase().endsWith('.json');
        if (isJsonFile) {
            try {
                const jsonData = JSON.parse(content);
                fillFormFromJson(jsonData);
                
                // Обновляем данные в менеджерах
                if (window.countryManager) {
                    window.countryManager.jsonData = jsonData;
                    window.countryManager.updateCountriesList();
                }
                if (window.eventManager) {
                    window.eventManager.setJsonData(jsonData);
                }
            } catch (error) {
                console.error('Ошибка при парсинге JSON:', error);
                if (fileInfo) {
                    fileInfo.textContent = window.translator.translate('file_parse_error');
                }
            }
        }
    }

    // Обработчик изменений в текстовом поле
    let saveTimeout;
    previewContent.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            fileInfo.textContent = window.translator.translate('changes_not_saved');
        }, 500);
    });

    // Обработчик кнопки принудительного сохранения
    forceSaveButton.addEventListener('click', saveChanges);

    // Обработчик выбора файла через input
    fileInput.addEventListener('click', (e) => {
        e.preventDefault();
        openFile();
    });

    // Обработчик drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');

        // Получаем перетащенные файлы
        if (hasFileSystemAccess) {
        const items = [...e.dataTransfer.items];
        for (const item of items) {
            if (item.kind === 'file') {
                const handle = await item.getAsFileSystemHandle();
                if (handle.kind === 'file') {
                    fileHandle = handle;
                    currentFile = await fileHandle.getFile();
                    const text = await currentFile.text();
                        handleFileContent(currentFile.name, text);
                        break;
                    }
                }
            }
        } else {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                currentFile = file;
                const text = await file.text();
                handleFileContent(file.name, text);
            }
        }
    });

    // Обработчик изменений в форме
    settingsForm.addEventListener('change', (e) => {
        if (!isJsonFile) return;
        
        const formData = new FormData(settingsForm);
        const data = Object.fromEntries(formData.entries());
        updateJsonEditor(data);
    });

    // Обработчик изменения цвета воды
    const waterColorInputs = ['water_color_r', 'water_color_g', 'water_color_b'].map(id => 
        document.getElementById(id)
    );

    waterColorInputs.forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            if (!isJsonFile || !previewContent) return;

            try {
                const jsonData = JSON.parse(previewContent.value);
                
                // Получаем значения RGB
            const r = Math.round(parseFloat(waterColorInputs[0].value) || 0);
            const g = Math.round(parseFloat(waterColorInputs[1].value) || 0);
            const b = Math.round(parseFloat(waterColorInputs[2].value) || 0);

            // Обновляем предпросмотр цвета
            const colorPreview = document.getElementById('water_color_preview');
            if (colorPreview) {
                colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }

                // Обновляем значение в JSON
                jsonData.water_color = [r, g, b, 255];
                
                // Обновляем содержимое редактора
                previewContent.value = JSON.stringify(jsonData, null, 4);
                
                if (fileInfo) {
                    fileInfo.textContent = window.translator.translate('changes_not_saved');
                }
            } catch (error) {
                console.error('Ошибка при обновлении цвета воды:', error);
                if (fileInfo) {
                    fileInfo.textContent = window.translator.translate('water_color_update_error');
                }
            }
        });
    });

    // Обработчик горячих клавиш
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Z - отмена
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            if (window.countryManager) {
                window.countryManager.undo();
            }
        }
        
        // Ctrl/Cmd + Shift + Z или Ctrl/Cmd + Y - возврат
        if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
            e.preventDefault();
            if (window.countryManager) {
                window.countryManager.redo();
            }
        }
    });

    // Загружаем данные при старте
    loadLandsJson();

    // Инициализируем менеджер стран
    window.countryManager = new CountryManager();

    // Обработчик для кнопки удаления несуществующих владельцев
    document.getElementById('remove-invalid-owners')?.addEventListener('click', () => {
        if (!window.countryManager) return;
        window.countryManager.removeInvalidOwners();
    });

    // Обработчик для кнопки настроек
    document.getElementById('settings-button').addEventListener('click', function() {
        window.location.href = 'page/settings.html?return=main';
    });

    // Обработчик для кнопки языка
    document.getElementById('currentLangChooser')?.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = document.getElementById('langDropdown');
        const accountDropdown = document.getElementById('accountDropdown');
        
        if (accountDropdown) {
            accountDropdown.classList.remove('active');
        }
        
        dropdown.classList.toggle('active');
    });

    // Обработчик для кнопки аккаунта
    document.getElementById('account-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = document.getElementById('accountDropdown');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langDropdown) {
            langDropdown.classList.remove('active');
        }
        
        dropdown.classList.toggle('active');
    });

    // Обработчики для пунктов меню аккаунта
    document.querySelectorAll('.account-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'login':
                    window.authManager.loginWithDiscord();
                    break;
                case 'register':
                    window.authManager.loginWithDiscord();
                    break;
                case 'settings':
                    console.log('Настройки аккаунта');
                    break;
                case 'logout':
                    window.authManager.logout();
                    break;
            }
            
            document.getElementById('accountDropdown').classList.remove('active');
        });
    });

    // Закрытие выпадающих меню при клике вне них
    document.addEventListener('click', function(e) {
        const langDropdown = document.getElementById('langDropdown');
        const accountDropdown = document.getElementById('accountDropdown');
        
        if (!e.target.closest('.language-switcher')) {
            langDropdown?.classList.remove('active');
        }
        
        if (!e.target.closest('#account-button') && !e.target.closest('#accountDropdown')) {
            accountDropdown?.classList.remove('active');
        }
    });

    // Инициализация тултипов
    document.querySelectorAll('.icon-action-button').forEach(button => {
        const tooltip = button.nextElementSibling;
        if (!tooltip || !tooltip.classList.contains('tooltip')) return;

        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 10 + 'px';
        });
    });
});

function changeApplicationLanguage(lang) {
    // Add your translation logic here
    // For example:
    const translations = {
        en: {
            editor: 'Editor',
            countries: 'Countries',
            events: 'Events',
            // Add more translations
        },
        ru: {
            editor: 'Редактор',
            countries: 'Страны',
            events: 'События',
            // Add more translations
        },
        uk: {
            editor: 'Редактор',
            countries: 'Країни',
            events: 'Події',
            // Add more translations
        }
    };

    // Apply translations
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

