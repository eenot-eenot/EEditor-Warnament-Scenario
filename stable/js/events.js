class EventManager {
    constructor() {
        try {
            this.currentEvent = null;
            this.jsonData = null;
            this.undoStack = [];
            this.redoStack = [];
            this.maxStackSize = 50;
            this.isEditing = false;
            this.filters = {};  // Добавляем инициализацию фильтров
            
            // Добавляем параметры сортировки
            this.sortColumn = 'id'; // По умолчанию сортируем по ID
            this.sortDirection = 'asc'; // По умолчанию по возрастанию
            
            // Сохраняем ссылки на важные элементы
            this.previewContent = document.getElementById('preview-content');
            this.fileInfo = document.getElementById('file-info');
            
            // Проверяем наличие необходимых элементов
            if (!this.previewContent) {
                throw new Error('Не найден элемент preview-content');
            }
            if (!this.fileInfo) {
                throw new Error('Не найден элемент file-info');
            }
            
            // Пытаемся загрузить начальные данные из preview-content
            try {
                const initialData = JSON.parse(this.previewContent.value);
                this.setJsonData(initialData);
            } catch (error) {
                console.warn('Не удалось загрузить начальные данные:', error);
                console.warn("Если эта ошибка появилась до загрузки файла, то это нормально, просто нет данных для отображения");
            }
            
            // Подписываемся на изменения в preview-content
            this.previewContent.addEventListener('input', () => {
                if (this.isEditing) return; // Игнорируем событие, если мы сами его вызвали
                try {
                    const jsonData = JSON.parse(this.previewContent.value);
                    this.setJsonData(jsonData);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                    this.fileInfo.textContent = window.translator.translate('file_parse_error');
                }
            });
            
            this.init();
        } catch (error) {
            console.error('Ошибка при инициализации EventManager:', error);
            throw error;
        }
    }

    setJsonData(jsonData) {
        try {
            this.jsonData = jsonData;
            if (!this.jsonData.custom_events) {
                this.jsonData.custom_events = {};
            }
            this.updateEventsList();
        } catch (error) {
            console.error('Ошибка при установке JSON данных:', error);
            this.fileInfo.textContent = window.translator.translate('data_update_error');
        }
    }

    init() {
        // Инициализация обработчиков событий
        this.initEventListeners();
        
        // Инициализация сортировки
        this.initSortHandlers();

        // Добавляем обработчики для предпросмотра изображений
        const imageSelect = document.getElementById('event-image');
        const imagePreview = document.getElementById('event-image-preview');
        const iconSelect = document.getElementById('event-icon');
        const iconPreview = document.getElementById('event-icon-preview');

        if (imageSelect && imagePreview) {
            imageSelect.addEventListener('change', () => {
                const selectedImage = imageSelect.value;
                imagePreview.src = `event/img/${selectedImage}.png`;
            });
            // Инициализируем предпросмотр для текущего значения
            imagePreview.src = `event/img/${imageSelect.value}.png`;
        }

        if (iconSelect && iconPreview) {
            iconSelect.addEventListener('change', () => {
                const selectedIcon = iconSelect.value;
                iconPreview.src = `event/ico/${selectedIcon}.png`;
            });
            // Инициализируем предпросмотр для текущего значения
            iconPreview.src = `event/ico/${iconSelect.value}.png`;
        }
    }

    initSortHandlers() {
        const headers = document.querySelectorAll('#events .list-table th[data-sort]');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-sort');
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = 'asc';
                }
                this.updateEventsList();
            });
        });
    }

    updateEventsList() {
        if (!this.jsonData?.custom_events) return;

        const tbody = document.getElementById('events-list');
        if (!tbody) return;

        tbody.innerHTML = '';

        // Создаем массив событий для сортировки и фильтрации
        let events = Object.entries(this.jsonData.custom_events)
            .map(([id, event]) => ({
                id,
                group: event.group_name || '',
                name: event.unique_event_name || '',
                title: event.title || '',
                ...event
            }));

        // Применяем фильтры
        if (this.filters.groups) {
            events = events.filter(event => 
                this.filters.groups.includes(event.group)
            );
        }

        // Сортировка
        if (this.sortColumn) {
            events.sort((a, b) => {
                let valueA = a[this.sortColumn] || '';
                let valueB = b[this.sortColumn] || '';

                return this.sortDirection === 'asc' 
                    ? String(valueA).localeCompare(String(valueB))
                    : String(valueB).localeCompare(String(valueA));
            });
        }

        // Обновляем индикаторы сортировки и фильтрации
        const headers = document.querySelectorAll('#events .list-table th[data-sort]');
        headers.forEach(header => {
            const column = header.getAttribute('data-sort');
            header.classList.remove('sort-asc', 'sort-desc', 'filtered');
            if (column === this.sortColumn) {
                header.classList.add(`sort-${this.sortDirection}`);
            }
            if (column === 'group' && this.filters.groups) {
                header.classList.add('filtered');
            }
        });

        // Отображаем события
        events.forEach(event => {
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer';
            tr.addEventListener('click', () => this.openEvent(event.id));

            const idCell = document.createElement('td');
            idCell.textContent = event.id;

            const groupCell = document.createElement('td');
            groupCell.textContent = event.group;

            const nameCell = document.createElement('td');
            nameCell.textContent = event.name;

            const titleCell = document.createElement('td');
            titleCell.textContent = event.title;

            tr.appendChild(idCell);
            tr.appendChild(groupCell);
            tr.appendChild(nameCell);
            tr.appendChild(titleCell);

            tbody.appendChild(tr);
        });
    }

    initEventListeners() {
        // Обработчик добавления нового события
        document.getElementById('add-event')?.addEventListener('click', () => this.createNewEvent());

        // Обработчики действий с событием
        document.getElementById('copy-event')?.addEventListener('click', () => this.copyCurrentEvent());
        document.getElementById('delete-event')?.addEventListener('click', () => this.deleteCurrentEvent());

        // Обработчики формы редактирования
        const form = document.getElementById('event-form');
        if (form) {
            form.addEventListener('change', (e) => this.handleFormChange(e));
            form.addEventListener('submit', (e) => e.preventDefault());
        }

        // Обработчики изменения изображений
        document.getElementById('event-image')?.addEventListener('change', (e) => {
            this.updateImagePreview(e.target.value);
        });

        document.getElementById('event-icon')?.addEventListener('change', (e) => {
            this.updateIconPreview(e.target.value);
        });

        // Обработчики состояния ответов
        document.getElementById('event-answer2-disabled')?.addEventListener('change', () => {
            this.updateAnswerBlocksState();
        });

        document.getElementById('event-answer3-disabled')?.addEventListener('change', () => {
            this.updateAnswerBlocksState();
        });

        // Обработчики кнопок требований и бонусов
        document.querySelectorAll('.requirements-button').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.getAttribute('data-answer') || '';
                this.openRequirementsEditor(answer);
            });
        });

        // Обработчики сохранения и отмены
        document.getElementById('save-event')?.addEventListener('click', () => {
            this.saveChanges();
        });

        document.getElementById('cancel-edit')?.addEventListener('click', () => {
            this.switchToEventsList();
        });

        // Кнопка возврата к списку событий
        document.getElementById('back-to-events-list')?.addEventListener('click', () => this.backToEventsList());

        // Обработчики фильтров
        document.querySelectorAll('#events .th-filter').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const column = button.closest('th').getAttribute('data-sort');
                
                // Закрываем все модальные окна
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });

                // Показываем соответствующее модальное окно
                if (column === 'group') {
                    this.showGroupFilterModal();
                } else {
                    this.showFilterModal(column);
                }
            });
        });

        // Кнопка очистки всех фильтров
        document.getElementById('clear-events-filters')?.addEventListener('click', () => {
            this.clearAllFilters();
        });

        // Обработчики событий формы
        document.getElementById('event-id').addEventListener('input', function(e) {
            const newId = e.target.value;
            const currentEvent = window.eventManager.currentEvent;
            
            if (currentEvent) {
                const jsonData = window.eventManager.jsonData;
                if (jsonData && jsonData.custom_events) {
                    const oldKey = currentEvent;
                    const eventData = jsonData.custom_events[oldKey];
                    
                    if (eventData) {
                        // Обновляем ID внутри объекта события
                        eventData.id = newId;
                        
                        // Создаем новый объект с обновленным ключом
                        jsonData.custom_events[newId] = eventData;
                        
                        // Удаляем старый ключ
                        if (oldKey !== newId) {
                            delete jsonData.custom_events[oldKey];
                        }
                        
                        // Обновляем currentEvent в менеджере
                        window.eventManager.currentEvent = newId;
                        
                        // Обновляем JSON в превью
                        window.eventManager.updateJsonInPreview();
                    }
                }
            }
        });
    }

    createNewEvent() {
        if (!this.jsonData) {
            try {
                this.jsonData = JSON.parse(this.previewContent.value);
            } catch (error) {
                this.jsonData = {};
            }
        }
        
        if (!this.jsonData.custom_events) {
            this.jsonData.custom_events = {};
        }

        const newId = this.generateUniqueId();
        const newEvent = {
            id: newId,
            group_name: "",
            unique_event_name: `Event ${newId.toLowerCase()}`,
            title: "New Event Title",
            description: "",
            answer1: "ignore",
            answer2: "",
            answer3: "",
            description1: "",
            description2: "",
            description3: "",
            answer2_is_disabled: true,
            answer3_is_disabled: true,
            auto_answer1_if_ignored: true,
            delete_after_turns: 1,
            hide_later: false,
            image: "diplomacy",
            icon: "diplomacy",
            lands: [],
            bonuses: [],
            bonuses1: [],
            bonuses2: [],
            bonuses3: [],
            requirements: [],
            requirements1: [],
            requirements2: [],
            requirements3: []
        };

        this.pushToUndoStack();
        this.jsonData.custom_events[newId] = newEvent;
        this.updateJsonInPreview();
        this.updateEventsList();
        this.openEvent(newId);
    }

    generateUniqueId() {
        if (!this.jsonData || !this.jsonData.custom_events) {
            return 'E1';
        }

        // Получаем все существующие ID
        const existingIds = Object.keys(this.jsonData.custom_events)
            .filter(id => id.startsWith('E'))
            .map(id => parseInt(id.substring(1)))
            .filter(num => !isNaN(num));

        // Если нет существующих ID, возвращаем E1
        if (existingIds.length === 0) {
            return 'E1';
        }

        // Находим максимальный номер и увеличиваем его на 1
        const maxId = Math.max(...existingIds);
        return `E${maxId + 1}`;
    }

    copyCurrentEvent() {
        if (!this.currentEvent || !this.jsonData?.custom_events?.[this.currentEvent]) return;

        const newId = this.generateUniqueId();
        const currentEvent = this.jsonData.custom_events[this.currentEvent];
        
        this.pushToUndoStack();
        
        // Создаем глубокую копию события
        this.jsonData.custom_events[newId] = JSON.parse(JSON.stringify(currentEvent));
        
        // Обновляем id и заголовок копии
        this.jsonData.custom_events[newId].id = newId;
        this.jsonData.custom_events[newId].title += ' (копия)';
        this.jsonData.custom_events[newId].unique_event_name = `${currentEvent.unique_event_name}_copy`;
        
        this.updateEventsList();
        this.openEvent(newId);
        this.saveChanges();
    }

    deleteCurrentEvent() {
        if (!this.currentEvent || !this.jsonData?.custom_events?.[this.currentEvent]) return;

        this.pushToUndoStack();
        delete this.jsonData.custom_events[this.currentEvent];
        this.updateJsonInPreview();
        this.updateEventsList();
        this.switchToEventsList();
    }

    openEvent(eventId) {
        if (!this.jsonData?.custom_events?.[eventId]) return;

        this.currentEvent = eventId;
        const event = this.jsonData.custom_events[eventId];

        // Заполняем основные поля
        const titleHeader = document.getElementById('event-name-header');
        if (titleHeader) {
            titleHeader.textContent = event.title || 'Без названия';
        }

        this.setFormValues({
            'event-id': event.id,
            'event-group-name': event.group_name || '',
            'event-unique-name': event.unique_event_name || '',
            'event-title': event.title || '',
            'event-description': event.description || '',
            'event-image': event.image || '',
            'event-icon': event.icon || '',
            'event-answer1': event.answer1 || '',
            'event-answer2': event.answer2 || '',
            'event-answer3': event.answer3 || '',
            'event-description1': event.description1 || '',
            'event-description2': event.description2 || '',
            'event-description3': event.description3 || '',
            'event-answer2-disabled': event.answer2_is_disabled ? 'true' : 'false',
            'event-answer3-disabled': event.answer3_is_disabled ? 'true' : 'false',
            'event-auto-answer1': event.auto_answer1_if_ignored ? 'true' : 'false',
            'event-delete-turns': event.delete_after_turns || 1,
            'event-hide-later': event.hide_later ? 'true' : 'false'
        });

        // Заполняем бонусы и требования
        this.populateRequirementsAndBonuses(event);

        // Переключаемся на страницу редактирования
        this.switchToEditPage();
    }

    setFormValues(values) {
        Object.entries(values).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                if (element.tagName === 'SELECT') {
                    element.value = value;
                    // Обновляем предпросмотр для изображений
                    if (id === 'event-image') {
                        this.updateImagePreview(value);
                    } else if (id === 'event-icon') {
                        this.updateIconPreview(value);
                    }
                } else {
                    element.value = value;
                }
            }
        });

        // Обновляем состояние блоков ответов
        this.updateAnswerBlocksState();
    }

    updateImagePreview(imageName) {
        const preview = document.getElementById('event-image-preview');
        if (preview) {
            preview.src = imageName ? `event/img/${imageName}.png` : '';
        }
    }

    updateIconPreview(iconName) {
        const preview = document.getElementById('event-icon-preview');
        if (preview) {
            preview.src = iconName ? `event/ico/${iconName}.png` : '';
        }
    }

    updateAnswerBlocksState() {
        // Обновляем состояние второго ответа
        const answer2Block = document.querySelector('.answer-block:nth-child(2)');
        const answer2Disabled = document.getElementById('event-answer2-disabled').value === 'true';
        if (answer2Block) {
            answer2Block.setAttribute('data-disabled', answer2Disabled);
        }

        // Обновляем состояние третьего ответа
        const answer3Block = document.querySelector('.answer-block:nth-child(3)');
        const answer3Disabled = document.getElementById('event-answer3-disabled').value === 'true';
        if (answer3Block) {
            answer3Block.setAttribute('data-disabled', answer3Disabled);
        }
    }

    populateRequirementsAndBonuses(event) {
        // Очищаем существующие списки
        ['requirements', 'requirements1', 'requirements2', 'requirements3',
         'bonuses', 'bonuses1', 'bonuses2', 'bonuses3'].forEach(listType => {
            const container = document.getElementById(`event-${listType}`);
            if (container) {
                container.innerHTML = '';
                const items = event[listType] || [];
                items.forEach(item => this.addRequirementOrBonusItem(container, item));
            }
        });
    }

    addRequirementOrBonusItem(container, item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'array-list-item';

        const isRequirement = container.id.includes('requirements');
        const content = isRequirement ? 
            `${item.type} ${item.action || ''} ${item.value}${item.subtype ? ` (${item.subtype})` : ''}` :
            `${item.type} ${item.value}${item.duration ? ` на ${item.duration} ходов` : ''}${item.subtype ? ` (${item.subtype})` : ''}`;

        itemDiv.innerHTML = `
            <div class="item-content">${content}</div>
            <div class="item-controls">
                <button type="button" class="item-edit">✎</button>
                <button type="button" class="item-delete">×</button>
            </div>
        `;

        container.appendChild(itemDiv);
    }

    handleFormChange(e) {
        if (this.isEditing) return;
        this.pushToUndoStack();
        this.saveChanges();
    }

    saveChanges() {
        if (!this.currentEvent || !this.jsonData?.custom_events?.[this.currentEvent]) {
            console.warn('Нет текущего события или данных для сохранения');
            return;
        }

        this.isEditing = true;
        try {
            const event = this.jsonData.custom_events[this.currentEvent];

            // Проверяем наличие всех необходимых элементов формы
            const requiredElements = [
                'event-id', 'event-group-name', 'event-unique-name', 'event-title',
                'event-description', 'event-image', 'event-icon'
            ];

            for (const elementId of requiredElements) {
                const element = document.getElementById(elementId);
                if (!element) {
                    throw new Error(`Не найден элемент формы: ${elementId}`);
                }
            }

            // Обновляем основные данные
            event.id = document.getElementById('event-id').value;
            event.group_name = document.getElementById('event-group-name').value;
            event.unique_event_name = document.getElementById('event-unique-name').value;
            event.title = document.getElementById('event-title').value;
            event.description = document.getElementById('event-description').value;
            event.image = document.getElementById('event-image').value;
            event.icon = document.getElementById('event-icon').value;

            // Валидация обязательных полей
            if (!event.id || !event.unique_event_name) {
                throw new Error('ID и системное название события обязательны');
            }

            // Обновляем ответы
            this.updateEventAnswers(event);

            // Обновляем JSON и интерфейс
            this.updateJsonInPreview();
            
            // Обновляем заголовок
            const titleHeader = document.getElementById('event-name-header');
            if (titleHeader) {
                titleHeader.textContent = event.title || 'Без названия';
            }

            this.updateEventsList();
            
            // Показываем сообщение об успешном сохранении
            this.fileInfo.textContent = window.translator.translate('changes_saved');
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
            this.fileInfo.textContent = window.translator.translate('save_error');
        } finally {
            this.isEditing = false;
        }
    }

    updateEventAnswers(event) {
        try {
            event.answer1 = document.getElementById('event-answer1').value;
            event.answer2 = document.getElementById('event-answer2').value;
            event.answer3 = document.getElementById('event-answer3').value;
            event.description1 = document.getElementById('event-description1').value;
            event.description2 = document.getElementById('event-description2').value;
            event.description3 = document.getElementById('event-description3').value;
            event.answer2_is_disabled = document.getElementById('event-answer2-disabled').value === 'true';
            event.answer3_is_disabled = document.getElementById('event-answer3-disabled').value === 'true';
            event.auto_answer1_if_ignored = document.getElementById('event-auto-answer1').value === 'true';
            event.delete_after_turns = parseInt(document.getElementById('event-delete-turns').value) || 1;
            event.hide_later = document.getElementById('event-hide-later').value === 'true';
        } catch (error) {
            console.error('Ошибка при обновлении ответов события:', error);
            throw error;
        }
    }

    updateRequirementsAndBonuses(event) {
        ['requirements', 'requirements1', 'requirements2', 'requirements3',
         'bonuses', 'bonuses1', 'bonuses2', 'bonuses3'].forEach(listType => {
            const container = document.getElementById(`event-${listType}`);
            if (!container) return;

            const items = [];
            container.querySelectorAll('.array-list-item').forEach(item => {
                // Здесь нужно добавить логику извлечения данных из элементов списка
                // В зависимости от того, как хранятся данные в DOM
                const itemData = this.parseItemData(item, listType.includes('requirements'));
                if (itemData) {
                    items.push(itemData);
                }
            });

            event[listType] = items;
        });
    }

    parseItemData(item, isRequirement) {
        if (isRequirement) {
            const typeCell = item.cells[0];
            const subtypeCell = item.cells[1];
            const actionCell = item.cells[2];
            const valueCell = item.cells[3];
            
            return {
                type: typeCell.textContent.trim(),
                action: actionCell.textContent.trim() || undefined,
                value: valueCell.textContent.split('(')[0].trim(),
                subtype: subtypeCell.textContent.trim() || undefined
            };
        } else {
            const typeCell = item.cells[0];
            const subtypeCell = item.cells[1];
            const valueCell = item.cells[3];
            
            const durationMatch = valueCell.textContent.match(/\((\d+) ходов\)/);
            
            return {
                type: typeCell.textContent.trim(),
                value: valueCell.textContent.split('(')[0].trim(),
                duration: durationMatch ? parseInt(durationMatch[1]) : 3,
                subtype: subtypeCell.textContent.trim() || undefined
            };
        }
    }

    updateJsonInPreview() {
        if (!this.previewContent || !this.jsonData) return;
        
        this.isEditing = true;
        try {
            // Сохраняем текущую позицию курсора
            const cursorPosition = this.previewContent.selectionStart;
            
            // Обновляем JSON в текстовом поле
        this.previewContent.value = JSON.stringify(this.jsonData, null, 4);
        
            // Восстанавливаем позицию курсора
            this.previewContent.setSelectionRange(cursorPosition, cursorPosition);

        if (this.fileInfo) {
            this.fileInfo.textContent = 'Изменения не сохранены';
        }
        } finally {
            this.isEditing = false;
        }
    }

    switchToEditPage() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById('event-edit')?.classList.add('active');

        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    switchToEventsList() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById('events')?.classList.add('active');

        document.querySelectorAll('.nav-button').forEach(btn => {
            if (btn.getAttribute('data-page') === 'events') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    pushToUndoStack() {
        if (!this.jsonData) return;
        
        this.undoStack.push(JSON.stringify(this.jsonData));
        if (this.undoStack.length > this.maxStackSize) {
            this.undoStack.shift();
        }
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length === 0) return;

        const currentState = JSON.stringify(this.jsonData);
        this.redoStack.push(currentState);

        const previousState = this.undoStack.pop();
        this.jsonData = JSON.parse(previousState);

        this.updateJsonInPreview();
        if (this.currentEvent) {
            this.openEvent(this.currentEvent);
        }
    }

    redo() {
        if (this.redoStack.length === 0) return;

        const currentState = JSON.stringify(this.jsonData);
        this.undoStack.push(currentState);

        const nextState = this.redoStack.pop();
        this.jsonData = JSON.parse(nextState);

        this.updateJsonInPreview();
        if (this.currentEvent) {
            this.openEvent(this.currentEvent);
        }
    }

    openRequirementsEditor(answer) {
        const modal = document.getElementById('requirements-editor-modal');
        const title = document.getElementById('requirements-editor-title');
        const list = document.getElementById('requirements-items');
        const editor = document.getElementById('requirement-editor');
        const addButton = document.getElementById('add-requirement');
        const closeButton = modal.querySelector('.close-modal');
        const saveButton = document.getElementById('save-requirement');
        const cancelButton = document.getElementById('cancel-requirement');
        const typeSelect = document.getElementById('requirement-type');

        // Определяем тип редактора (требования или бонусы)
        const isBonus = answer.includes('bonus');
        this.isEditingBonus = isBonus;
        const listType = isBonus ? 'bonuses' : 'requirements';
        title.textContent = isBonus ? window.translator.translate('bonus_editor') : window.translator.translate('requirements_editor');

        // Получаем список требований/бонусов
        const items = this.jsonData.custom_events[this.currentEvent][listType + (answer.includes('-') ? answer.split('-')[0] : '')] || [];

        // Обновляем список типов в зависимости от режима
        typeSelect.innerHTML = '';
        if (isBonus) {
            // Для бонусов показываем только бонусы
            const bonusOptions = [
                { value: 'defense', label: window.translator.translate('defense') },
                { value: 'attack', label: window.translator.translate('attack') },
                { value: 'building_cost', label: window.translator.translate('building_cost') },
                { value: 'discontent', label: window.translator.translate('discontent') },
                { value: 'population_income', label: window.translator.translate('population_income') },
                { value: 'add_random_culture_population', label: window.translator.translate('add_random_culture_population') },
                { value: 'prestige', label: window.translator.translate('prestige') },
                { value: 'science', label: window.translator.translate('science') },
                { value: 'money', label: window.translator.translate('money') },
                { value: 'add_oil', label: window.translator.translate('add_oil') },
                { value: 'add_cruiser', label: window.translator.translate('add_cruiser') },
                { value: 'add_battleship', label: window.translator.translate('add_battleship') },
                { value: 'add_tank', label: window.translator.translate('add_tank') },
                { value: 'add_shock_infantry', label: window.translator.translate('add_shock_infantry') },
                { value: 'add_infantry', label: window.translator.translate('add_infantry') },
                { value: 'army_losses', label: window.translator.translate('army_losses') },
                { value: 'relation_ideology_change', label: window.translator.translate('relation_ideology_change') },
                { value: 'relation_change', label: window.translator.translate('relation_change') },
                { value: 'diplomacy_lift_sanctions', label: window.translator.translate('diplomacy_lift_sanctions') },
                { value: 'diplomacy_sanctions', label: window.translator.translate('diplomacy_sanctions') },
                { value: 'diplomacy_pact', label: window.translator.translate('diplomacy_pact') },
                { value: 'diplomacy_alliance', label: window.translator.translate('diplomacy_alliance') },
                { value: 'diplomacy_peace', label: window.translator.translate('diplomacy_peace') },
                { value: 'diplomacy_war', label: window.translator.translate('diplomacy_war') },
                { value: 'resurrect_country', label: window.translator.translate('resurrect_country') },
                { value: 'annex_country', label: window.translator.translate('annex_country') },
                { value: 'accelerated_recruit_cost', label: window.translator.translate('accelerated_recruit_cost') },
                { value: 'maintaining_army_cost_multiplier', label: window.translator.translate('maintaining_army_cost_multiplier') },
                { value: 'population_increase', label: window.translator.translate('population_increase') },
                { value: 'recruit_cost', label: window.translator.translate('recruit_cost') },
                { value: 'change_country', label: window.translator.translate('change_country') },
                { value: 'add_culture_population', label: window.translator.translate('add_culture_population') }
            ];
            typeSelect.innerHTML = bonusOptions.map(opt => 
                `<option value="${opt.value}">${opt.label}</option>`
            ).join('');
        } else {
            // Для требований показываем только требования
            const requirementOptions = [
                { value: 'year', label: window.translator.translate('year') },
                { value: 'month', label: window.translator.translate('month') },
                { value: 'turn', label: window.translator.translate('turn') },
                { value: 'land_id', label: window.translator.translate('land_id') },
                { value: 'land_name', label: window.translator.translate('land_name') },
                { value: 'near_water', label: window.translator.translate('near_water') },
                { value: 'has_pact', label: window.translator.translate('has_pact') },
                { value: 'has_sanctions', label: window.translator.translate('has_sanctions') },
                { value: 'has_war', label: window.translator.translate('has_war') },
                { value: 'enemy_near_capital', label: window.translator.translate('enemy_near_capital') },
                { value: 'lost_capital', label: window.translator.translate('lost_capital') },
                { value: 'is_defeated', label: window.translator.translate('is_defeated') },
                { value: 'land_power', label: window.translator.translate('land_power') },
                { value: 'independent_land', label: window.translator.translate('independent_land') },
                { value: 'no_enemy', label: window.translator.translate('no_enemy') },
                { value: 'random_value', label: window.translator.translate('random_value') },
                { value: 'count_of_tasks', label: window.translator.translate('count_of_tasks') },
                { value: 'num_of_provinces', label: window.translator.translate('num_of_provinces') },
                { value: 'tax', label: window.translator.translate('tax') },
                { value: 'money', label: window.translator.translate('money') },
                { value: 'discontent', label: window.translator.translate('discontent') },
                { value: 'building_exists', label: window.translator.translate('building_exists') },
                { value: 'political_institution', label: window.translator.translate('political_institution') } /*,
                { value: 'cooldown', label: window.translator.translate('cooldown') } */
            ];
            typeSelect.innerHTML = requirementOptions.map(opt => 
                `<option value="${opt.value}">${opt.label}</option>`
            ).join('');
        }

        // Функция для обновления списка
        const updateList = () => {
            list.innerHTML = '';
            items.forEach((item, index) => {
                const row = document.createElement('tr');
                const config = isBonus ? window.reqbonConfig?.bonuses?.[item.type] : null;
                const showDuration = isBonus && config?.hasDuration;
                
                row.innerHTML = `
                    <td>${item.type}</td>
                    <td>${item.subtype || ''}</td>
                    <td>${isBonus ? (showDuration ? `${item.duration || 3} ходов` : '') : (item.action || '')}</td>
                    <td>${item.value}</td>
                    <td>
                        <div class="requirement-actions">
                            <button type="button" class="edit" data-index="${index}">✎</button>
                            <button type="button" class="delete" data-index="${index}">×</button>
                        </div>
                    </td>
                `;
                list.appendChild(row);
            });
        };

        // Функция для обновления доступных действий в зависимости от типа
        const updateActions = () => {
            const actionSelect = document.getElementById('requirement-action');
            const durationInput = document.getElementById('requirement-duration');
            const selectedType = typeSelect.value;
            const actions = [];

            if (isBonus) {
                // Для бонусов скрываем действия
                actionSelect.parentElement.style.display = 'none';
                
                // Проверяем конфигурацию бонуса для отображения длительности
                const config = window.reqbonConfig?.bonuses?.[selectedType];
                if (durationInput && config) {
                    durationInput.parentElement.style.display = config.hasDuration ? 'block' : 'none';
                    if (config.hasDuration) {
                        durationInput.value = config.defaultDuration || 3;
                    }
                }
            } else {
                // Для требований показываем действия и скрываем длительность
                actionSelect.parentElement.style.display = 'block';
                if (durationInput) {
                    durationInput.parentElement.style.display = 'none';
                }
                
                // Получаем доступные действия из конфигурации
                if (['month', 'num_of_provinces', 'year', 'turn', 'random_value', 'count_of_tasks', 'tax', 'discontent', 'money', 'land_power'].includes(selectedType)) {
                    actions.push('more', 'equal', 'less');
                } else if (['near_water', 'has_pact', 'has_sanctions', 'has_war', 'independent_land', 'land_name', 'building_exists', 'land_id', 'political_institution', 'enemy_near_capital', 'is_defeated', 'lost_capital'].includes(selectedType)) {
                    actions.push('equal', 'not_equal');
                } else if (['cooldown'].includes(selectedType)) {
                    actions.push('more', 'less');
                    
                    // Создаем выпадающий список событий для подтипа
                    const subtypeGroup = document.querySelector('[for="requirement-subtype"]').parentElement;
                    subtypeGroup.style.display = 'block';
                    
                    const subtypeInput = document.getElementById('requirement-subtype');
                    const select = document.createElement('select');
                    select.id = 'requirement-subtype';
                    select.className = 'main-page-input';
                    
                    // Получаем список всех событий
                    const events = Object.entries(this.jsonData.custom_events || {}).map(([id, event]) => ({
                        id,
                        name: event.unique_event_name || event.title || id
                    }));
                    
                    // Сортируем события по имени
                    events.sort((a, b) => a.name.localeCompare(b.name));
                    
                    // Создаем опции для выпадающего списка
                    select.innerHTML = events.map(event => 
                        `<option value="${event.id}">${event.name}</option>`
                    ).join('');
                    
                    // Заменяем текстовое поле на выпадающий список
                    subtypeInput.parentNode.replaceChild(select, subtypeInput);
                    
                    // Создаем числовое поле для значения
                    const valueContainer = document.getElementById('requirement-value-container');
                    valueContainer.innerHTML = '';
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_number');
                    valueContainer.appendChild(input);
                } else if (['no_enemy'].includes(selectedType)) {
                    actions.push('equal');
                }
            }

            actionSelect.innerHTML = actions.map(action => `
                <option value="${action}">${
                    action === 'more' ? window.translator.translate('more') :
                    action === 'equal' ? window.translator.translate('equal') :
                    action === 'not_equal' ? window.translator.translate('not_equal') :
                    action === 'less' ? window.translator.translate('less') : action
                }</option>
            `).join('');
        };

        // Функция для обновления поля значения в зависимости от типа
        const updateValueField = () => {
            const valueContainer = document.getElementById('requirement-value-container');
            const subtypeGroup = document.querySelector('[for="requirement-subtype"]').parentElement;
            const selectedType = document.getElementById('requirement-type').value;
            const durationInput = document.getElementById('requirement-duration');

            // Очищаем контейнер
            valueContainer.innerHTML = '';

            if (this.isEditingBonus) {
                // Новые бонусы
                if (['accelerated_recruit_cost', 'maintaining_army_cost_multiplier', 'population_increase', 'recruit_cost'].includes(selectedType)) {
                    // Для процентных значений с длительностью
                    subtypeGroup.style.display = 'none';
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_percent');
                    valueContainer.appendChild(input);

                    // Показываем поле длительности
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (selectedType === 'change_country') {
                    // Для выбора страны без длительности
                    subtypeGroup.style.display = 'none';
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    select.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    valueContainer.appendChild(select);

                    // Скрываем поле длительности
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'none';
                    }
                } else if (selectedType === 'add_culture_population') {
                    // Для добавления населения культуры с подтипом страны
                    subtypeGroup.style.display = 'block';
                    const subtypeInput = document.getElementById('requirement-subtype');
                    // Создаем выпадающий список для стран
                    const countrySelect = document.createElement('select');
                    countrySelect.id = 'requirement-subtype';
                    countrySelect.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    countrySelect.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    // Заменяем текстовое поле на выпадающий список
                    subtypeInput.parentNode.replaceChild(countrySelect, subtypeInput);

                    // Добавляем поле для числового значения
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_number');
                    valueContainer.appendChild(input);

                    // Показываем поле длительности
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['resurrect_country', 'annex_country'].includes(selectedType)) {
                    // Существующая логика для старых бонусов
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    select.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    valueContainer.appendChild(select);
                    subtypeGroup.style.display = 'none';
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['diplomacy_lift_sanctions', 'diplomacy_sanctions', 'diplomacy_pact', 'diplomacy_alliance', 'diplomacy_peace', 'diplomacy_war'].includes(selectedType)) {
                    // Для дипломатических действий со странами
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    select.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    valueContainer.appendChild(select);
                    subtypeGroup.style.display = 'none';
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['relation_ideology_change'].includes(selectedType)) {
                    // Для изменения идеологии
                    subtypeGroup.style.display = 'block';
                    const subtypeInput = document.getElementById('requirement-subtype');
                    // Создаем выпадающий список для идеологий
                    const ideologySelect = document.createElement('select');
                    ideologySelect.id = 'requirement-subtype';
                    ideologySelect.className = 'main-page-input';
                    const ideologies = [
                        window.translator.translate('democracy'),
                        window.translator.translate('monarchy'),
                        window.translator.translate('communism'),
                        window.translator.translate('fascism'),
                        window.translator.translate('theocracy'),
                        window.translator.translate('paganism'),
                        window.translator.translate('trade_republic')
                    ];
                    ideologySelect.innerHTML = ideologies.map(ideology => 
                        `<option value="${ideology}">${ideology}</option>`
                    ).join('');
                    // Заменяем текстовое поле на выпадающий список
                    subtypeInput.parentNode.replaceChild(ideologySelect, subtypeInput);

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_number');
                    valueContainer.appendChild(input);
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['relation_change'].includes(selectedType)) {
                    // Для изменения отношений
                    subtypeGroup.style.display = 'block';
                    const subtypeInput = document.getElementById('requirement-subtype');
                    // Создаем выпадающий список для стран
                    const countrySelect = document.createElement('select');
                    countrySelect.id = 'requirement-subtype';
                    countrySelect.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    countrySelect.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    // Заменяем текстовое поле на выпадающий список
                    subtypeInput.parentNode.replaceChild(countrySelect, subtypeInput);

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_percent');
                    valueContainer.appendChild(input);
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['defense', 'attack', 'population_income', 'building_cost'].includes(selectedType)) {
                    // Для процентных значений
                    subtypeGroup.style.display = 'none';
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_percent');
                    valueContainer.appendChild(input);
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                } else if (['add_oil', 'add_cruiser', 'add_random_culture_population', 'add_shock_infantry', 'discontent', 'add_tank', 'army_losses', 'prestige', 'add_battleship', 'add_infantry', 'science', 'money'].includes(selectedType)) {
                    // Для числовых значений
                    subtypeGroup.style.display = 'none';
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = window.translator.translate('enter_number');
                    valueContainer.appendChild(input);
                    if (durationInput) {
                        durationInput.parentElement.style.display = 'block';
                    }
                }
            } else {
                // Для требований оставляем существующую логику
                if (['near_water', 'independent_land', 'no_enemy', 'enemy_near_capital', 'lost_capital'].includes(selectedType)) {
                    valueContainer.innerHTML = `
                        <select id="requirement-value" class="main-page-input">
                            <option value="да">${window.translator.translate('yes')}</option>
                            <option value="нет">${window.translator.translate('no')}</option>
                        </select>
                    `;
                    subtypeGroup.style.display = 'none';
                } else if (['political_institution'].includes(selectedType)) {
                    // Для политических институтов
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const institutions = [
                        window.translator.translate('democracy'),
                        window.translator.translate('monarchy'),
                        window.translator.translate('communism'),
                        window.translator.translate('fascism'),
                        window.translator.translate('theocracy'),
                        window.translator.translate('paganism'),
                        window.translator.translate('trade_republic')
                    ];
                    select.innerHTML = institutions.map(inst => 
                        `<option value="${inst}">${inst}</option>`
                    ).join('');
                    valueContainer.appendChild(select);
                    subtypeGroup.style.display = 'none'; // Скрываем поле subtype
                } else if (['has_pact', 'has_sanctions', 'has_war', 'land_id', 'is_defeated'].includes(selectedType)) {
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    select.innerHTML = countries.map(country => 
                        `<option value="${country.id}">${country.name}</option>`
                    ).join('');
                    valueContainer.appendChild(select);
                    subtypeGroup.style.display = 'none';
                } else if (['land_name'].includes(selectedType)) {
                    const select = document.createElement('select');
                    select.id = 'requirement-value';
                    select.className = 'main-page-input';
                    const countries = Object.entries(this.jsonData.lands || {}).map(([id, country]) => ({
                        id,
                        name: country.name
                    }));
                    select.innerHTML = countries.map(country => 
                        `<option value="${country.name}">${country.name}</option>`
                    ).join('');
                    valueContainer.appendChild(select);
                    subtypeGroup.style.display = 'none';
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.id = 'requirement-value';
                    input.className = 'main-page-input';
                    input.placeholder = 
                        ['month', 'num_of_provinces', 'year', 'turn', 'random_value', 'count_of_tasks', 'tax', 'discontent', 'money', 'land_power'].includes(selectedType) ? window.translator.translate('enter_number') :
                        ['building_exists'].includes(selectedType) ? window.translator.translate('enter_building_name') :
                        ['political_institution'].includes(selectedType) ? window.translator.translate('enter_institution_name') : window.translator.translate('enter_value');
                    valueContainer.appendChild(input);
                    subtypeGroup.style.display = selectedType === 'building_exists' || selectedType === 'political_institution' ? 'block' : 'none';
                }
            }
        };

        // Обработчики событий
        typeSelect.addEventListener('change', () => {
            updateActions();
            updateValueField();
        });

        addButton.onclick = () => {
            editor.style.display = 'block';
            document.getElementById('requirement-type').value = '';
            document.getElementById('requirement-action').value = '';
            document.getElementById('requirement-subtype').value = '';
            updateActions();
            updateValueField();
        };

        list.onclick = (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const index = parseInt(button.dataset.index);
            if (button.classList.contains('edit')) {
                const item = items[index];
                editor.style.display = 'block';
                document.getElementById('requirement-type').value = item.type;
                document.getElementById('requirement-action').value = item.action || '';
                document.getElementById('requirement-subtype').value = item.subtype || '';
                if (isBonus && document.getElementById('requirement-duration')) {
                    document.getElementById('requirement-duration').value = item.duration || 3;
                }
                updateActions();
                updateValueField();
                // Устанавливаем значение после создания поля
                const valueElement = document.getElementById('requirement-value');
                if (valueElement) {
                    valueElement.value = item.value;
                }
                editor.dataset.editIndex = index;
            } else if (button.classList.contains('delete')) {
                items.splice(index, 1);
                updateList();
                this.saveChanges();
            }
        };

        saveButton.onclick = () => {
            const type = document.getElementById('requirement-type').value;
            const action = isBonus ? '' : document.getElementById('requirement-action').value;
            const subtype = document.getElementById('requirement-subtype').value;
            const value = document.getElementById('requirement-value').value;
            
            // Проверяем конфигурацию бонуса для длительности
            const config = isBonus ? window.reqbonConfig?.bonuses?.[type] : null;
            const duration = (isBonus && config?.hasDuration) ? 
                parseInt(document.getElementById('requirement-duration').value) || config.defaultDuration || 3 : 
                undefined;

            if (!type || !value || (isBonus && config?.hasDuration && !duration)) {
                console.warn('Не все обязательные поля заполнены');
                return;
            }

            const item = {
                type,
                action: isBonus ? undefined : action,
                subtype: subtype || undefined,
                value,
                duration: (isBonus && config?.hasDuration) ? duration : undefined
            };

            const editIndex = editor.dataset.editIndex;
            if (editIndex !== undefined) {
                items[editIndex] = item;
                delete editor.dataset.editIndex;
            } else {
                items.push(item);
            }

            editor.style.display = 'none';
            updateList();
            this.saveChanges();
        };

        cancelButton.onclick = () => {
            editor.style.display = 'none';
            delete editor.dataset.editIndex;
        };

        closeButton.onclick = () => {
            modal.classList.remove('active');
        };

        // Инициализация
        updateList();
        updateActions();
        updateValueField();
        editor.style.display = 'none';
        modal.classList.add('active');
    }

    loadAvailableImages() {
        // TODO: Загрузить список доступных изображений и иконок
        const imageSelect = document.getElementById('event-image');
        const iconSelect = document.getElementById('event-icon');

        if (imageSelect) {
            // Временный список изображений
            const images = ['diplomacy', 'war', 'economy', 'culture'];
            imageSelect.innerHTML = images.map(img => 
                `<option value="${img}">${img}</option>`
            ).join('');
        }

        if (iconSelect) {
            // Временный список иконок
            const icons = ['diplomacy', 'war', 'economy', 'culture'];
            iconSelect.innerHTML = icons.map(icon => 
                `<option value="${icon}">${icon}</option>`
            ).join('');
        }
    }

    backToEventsList() {
        // Переключаемся на страницу списка событий
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById('events').classList.add('active');
    }

    showGroupFilterModal() {
        console.log('Открытие модального окна фильтра групп');
        const modal = document.getElementById('groups-filter-modal');
        if (!modal) {
            console.error('Модальное окно фильтра групп не найдено');
            return;
        }

        const groupsList = document.getElementById('groups-filter-list');
        if (!groupsList) {
            console.error('Список групп не найден');
            return;
        }

        // Получаем все уникальные группы
        const groups = new Set();
        if (!this.jsonData?.custom_events) {
            console.warn('Нет данных о событиях');
            return;
        }

        Object.values(this.jsonData.custom_events).forEach(event => {
            if (event.group_name) {
                groups.add(event.group_name);
            }
        });

        console.log('Найдено групп:', groups.size);

        // Сортируем группы по алфавиту
        const sortedGroups = Array.from(groups).sort();

        // Создаем чекбоксы для каждой группы
        groupsList.innerHTML = sortedGroups.map(group => {
            const isChecked = this.filters.groups?.includes(group);
            console.log(`Группа ${group}, выбрана: ${isChecked}`);
            return `
                <div class="group-checkbox-item">
                    <input type="checkbox" id="group-${group}" value="${group}"
                           ${isChecked ? 'checked' : ''}>
                    <label for="group-${group}">${group}</label>
                </div>
            `;
        }).join('');

        // Обработчики кнопок
        const applyButton = modal.querySelector('#groups-filter-apply');
        const clearButton = modal.querySelector('#groups-filter-clear');
        const closeButton = modal.querySelector('.close-modal');

        // Удаляем старые обработчики
        const newApplyButton = applyButton.cloneNode(true);
        const newClearButton = clearButton.cloneNode(true);
        const newCloseButton = closeButton.cloneNode(true);

        applyButton.parentNode.replaceChild(newApplyButton, applyButton);
        clearButton.parentNode.replaceChild(newClearButton, clearButton);
        closeButton.parentNode.replaceChild(newCloseButton, closeButton);

        // Добавляем новые обработчики
        newApplyButton.addEventListener('click', () => {
            const checkedGroups = Array.from(groupsList.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);
            
            console.log('Выбранные группы:', checkedGroups);
            
            if (checkedGroups.length > 0) {
                this.filters.groups = checkedGroups;
            } else {
                delete this.filters.groups;
            }
            
            console.log('Обновленные фильтры:', this.filters);
            this.updateEventsList();
            modal.classList.remove('active');
        });

        newClearButton.addEventListener('click', () => {
            delete this.filters.groups;
            this.updateEventsList();
            modal.classList.remove('active');
        });

        newCloseButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Добавляем обработчик клавиши Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Показываем модальное окно
        modal.classList.add('active');
    }

    showFilterModal(column) {
        const modal = document.getElementById('events-filter-modal');
        const title = modal.querySelector('.modal-title');
        const operatorSelect = document.getElementById('events-filter-operator');
        const valueContainer = document.getElementById('events-filter-value-container');

        // Устанавливаем заголовок
        title.textContent = `${window.translator.translate('filter')}: ${this.getColumnTitle(column)}`;

        // Настраиваем операторы
        operatorSelect.innerHTML = `
            <option value="equals">${window.translator.translate('filter_equals')}</option>
            <option value="not_equals">${window.translator.translate('filter_not_equals')}</option>
            <option value="contains">${window.translator.translate('filter_contains')}</option>
        `;

        // Создаем поле ввода
        valueContainer.innerHTML = `
            <input type="text" id="events-filter-value" class="main-page-input" 
                   placeholder="${window.translator.translate('filter_text_value')}">
        `;

        // Устанавливаем текущие значения фильтра, если они есть
        if (this.filters[column]) {
            operatorSelect.value = this.filters[column].operator;
            document.getElementById('events-filter-value').value = this.filters[column].value;
        }

        // Обработчики кнопок
        const applyButton = modal.querySelector('#events-filter-apply');
        const clearButton = modal.querySelector('#events-filter-clear');
        const closeButton = modal.querySelector('.close-modal');

        // Удаляем старые обработчики
        const newApplyButton = applyButton.cloneNode(true);
        const newClearButton = clearButton.cloneNode(true);
        const newCloseButton = closeButton.cloneNode(true);

        applyButton.parentNode.replaceChild(newApplyButton, applyButton);
        clearButton.parentNode.replaceChild(newClearButton, clearButton);
        closeButton.parentNode.replaceChild(newCloseButton, closeButton);

        // Добавляем новые обработчики
        newApplyButton.addEventListener('click', () => {
            const operator = operatorSelect.value;
            const value = document.getElementById('events-filter-value').value;
            
            if (value) {
                this.filters[column] = { operator, value };
            } else {
                delete this.filters[column];
            }
            
            this.updateEventsList();
            modal.classList.remove('active');
        });

        newClearButton.addEventListener('click', () => {
            delete this.filters[column];
            this.updateEventsList();
            modal.classList.remove('active');
        });

        newCloseButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Добавляем обработчик клавиши Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Показываем модальное окно
        modal.classList.add('active');
    }

    clearAllFilters() {
        this.filters = {};
        this.updateEventsList();
    }

    getColumnTitle(column) {
        const titles = {
            'id': 'event_id',
            'group': 'event_group',
            'name': 'event_name',
            'title': 'event_title'
        };
        return window.translator.translate(titles[column] || column);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    window.eventManager = new EventManager();
});
function createRequirementEditor() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
    `;
    document.body.appendChild(modal);
    window.translator.updateTranslations(modal);
    return modal;
}

function createBonusEditor() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 data-translate="bonus_editor">Редактор бонусов</h2>
            <div class="form-group">
                <label for="bonus-type" data-translate="type">Тип:</label>
                <select id="bonus-type" class="main-page-input">
                    <option value="province" data-translate="province">Провинция</option>
                    <option value="country" data-translate="country">Страна</option>
                    <option value="resource" data-translate="resource">Ресурс</option>
                </select>
            </div>
            <div class="form-group">
                <label for="bonus-subtype" data-translate="subtype">Подтип:</label>
                <input type="text" id="bonus-subtype" class="main-page-input">
            </div>
            <div class="form-group">
                <label for="bonus-value" data-translate="value">Значение:</label>
                <div id="bonus-value-container"></div>
            </div>
            <div class="form-actions">
                <button type="button" id="save-bonus" class="action-button" data-translate="save">Сохранить</button>
                <button type="button" id="cancel-bonus" class="action-button" data-translate="cancel">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    window.translator.updateTranslations(modal);
    return modal;
}

// Обновляем обработчик добавления требований
document.addEventListener('click', function(e) {
    if (e.target.matches('#add-requirement')) {
        const modal = createRequirementEditor();
        // ... existing code ...
        window.translator.updateTranslations(modal);
    }
});

// Обновляем обработчик добавления бонусов
document.addEventListener('click', function(e) {
    if (e.target.matches('#add-bonus')) {
        const modal = createBonusEditor();
        // ... existing code ...
        window.translator.updateTranslations(modal);
    }
});

