//появление и закрытие меню с добавлением нового клиента 
const addNewClientBtn = document.querySelector('.clients__btn');
const newClientMenu = document.querySelector('.new-client');
const closeClientMenuBtn = document.querySelector('.new-client__close');
const cancelClentMenuBtn = document.querySelector('.new-client__cancel');
//для закрытия и открытия окна с удалением клиента
const delOpen = document.querySelector('.delete-client')
const delCloseBtn = document.querySelector('.delete-client__close');
const delCancelBtn = document.querySelector('.delete-client__cancel');
const deleteClientBtn = document.querySelector('.delete-client__delete');
//для открытия и изменения окна Изменить клиента
const changeOpen = document.querySelector('.change-client');
const changeCloselBtn = document.querySelector('.change-client__close');
const changeSaveBtn = document.querySelector('.change-client__save');
const changeDeleteClient = document.querySelector('.change-client__cancel');
//Данные с инпутов в меню Создать клиента
const nameInput = document.getElementById('input-name');
const surnameInput = document.getElementById('input-surname');
const lastnameInput = document.getElementById('input-lastname');
const form = document.querySelector('.new-client__form');
const saveClient = document.querySelector('.new-client__save');
const tableList = document.querySelector('.clients__tbody');
//Данные с инпутов в меню Создать клиента
const nameInputChange = document.getElementById('input-name-change');
const surnameInputChange = document.getElementById('input-surname-change');
const lastnameInputChange = document.getElementById('input-lastname-change');
//Форма для ввода данных
const newClientForm = document.getElementById('new-client__form');
//форма меню изменить
const changeForm = document.getElementById('change-client__form');
//ID клиента в меню изменить
const changeMenuId = document.querySelector('.clients__td-id')
//Поиск иформации по сайту (верхний инпут)
const searchInput = document.querySelector('.header__input');
//возможность сортировать список в по возростанию и убыванию
let column = 'fullName';
let columnDir = true;
const tableListTHAll = document.querySelectorAll('.clients__th');
//Массив клиентов
let clientsArray = [];
//создаем переменную с айди и изначально ставим значение 0
let clientId = 0;
//открыть окно для создания кдиента
addNewClientBtn.addEventListener('click', function () {
    newClientMenu.classList.add('new-client--open');
});
//закрыть окно для создания кдиента
closeClientMenuBtn.addEventListener('click', function () {
    newClientMenu.classList.remove('new-client--open');
});
//открыть окно для создания клиента
cancelClentMenuBtn.addEventListener('click', function () {
    newClientMenu.classList.remove('new-client--open');
});
//закрыть окно для удаления клиента по крестику
delCloseBtn.addEventListener('click', function () {
    delOpen.classList.remove('del--open');
});
//закрыть окно для удаления клиента по кнопке отмена
delCancelBtn.addEventListener('click', function () {
    delOpen.classList.remove('del--open');
});
//закрыть окно Изменить
changeCloselBtn.addEventListener('click', function () {
    changeOpen.classList.remove('change-client--open');
});
// удаление клиента 
async function deleteClient(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
    });
    // можно проверить response
    if (response.status === 404)
        console.log('Не удалось удалить дело, так как его не существует');
    const data = await response.json();
    //console.log(data);
};

//изменение клиента 
async function getClientID(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    //записываем данные с клиента в новые инпуты
    surnameInputChange.value = data.surname; //записываем фамилию в инпут
    nameInputChange.value = data.name; //записываем имя в инпут
    lastnameInputChange.value = data.lastName; //записываем отчество в инпут
    changeMenuId.textContent = data.id; //записываем ID клиента сверху
    //console.log(data);
};

//Создаем таблицу
function newWorkerTable(client, contacts) {
    const clientTR = document.createElement('tr');
    const clientIdTD = document.createElement('td');
    const clientFullNameTD = document.createElement('td');
    const clientCreateDateTD = document.createElement('td');
    const clientLastChangeTD = document.createElement('td');
    const clientContactsTD = document.createElement('td');
    const clientActionTD = document.createElement('td');
    const clientTimeCreate = document.createElement('span');
    const clientTimeChange = document.createElement('span');

    //Добавляем классы для стилей
    clientTR.classList.add('clients__tr')
    clientIdTD.classList.add('clients__td-id');
    clientFullNameTD.classList.add('clients__td-fio');
    clientCreateDateTD.classList.add('clients__td-create');
    clientLastChangeTD.classList.add('clients__td-last');
    clientActionTD.classList.add('clients__td-del');
    clientTimeCreate.classList.add('clients__td-time');
    clientTimeChange.classList.add('clients__td-time');
    clientContactsTD.classList.add('clients__td-contacts')

    //кнопки
    const delBtn = document.createElement('button');
    const changeBtn = document.createElement('button');
    changeBtn.classList.add('btn-reset', 'change-button');
    delBtn.classList.add('btn-reset', 'delete-button');
    changeBtn.textContent = 'Изменить';
    delBtn.textContent = 'Удалить';

    //получаем время создания клиента
    const date = new Date(client.createdAt);
    clientTimeCreate.textContent = `${date.getHours()}:`;
    if (date.getMinutes() < 10) {
        clientTimeCreate.textContent += '0';
    }
    clientTimeCreate.textContent += date.getMinutes();

    //получаем время последнего изменения клиента
    const dateChange = new Date(client.updatedAt);
    clientTimeChange.textContent = `${dateChange.getHours()}:`; //часы
    if (dateChange.getMinutes() < 10) { //минуты
        clientTimeChange.textContent += '0';
    }
    clientTimeChange.textContent += dateChange.getMinutes();

    //информация в колонке
    clientIdTD.textContent = client.id.slice(0, 10); //укорачиваем id, для крастоы
    clientFullNameTD.textContent = client.fullName;
    clientCreateDateTD.textContent = client.createDate + ' ';
    clientLastChangeTD.textContent = client.changeDate + ' ';

    //добавляем все в колонку
    clientTR.append(clientIdTD);
    clientTR.append(clientFullNameTD);
    clientCreateDateTD.append(clientTimeCreate);
    clientTR.append(clientCreateDateTD);
    clientLastChangeTD.append(clientTimeChange);
    clientTR.append(clientLastChangeTD);
    clientTR.append(clientContactsTD);
    clientActionTD.append(changeBtn, delBtn);
    clientTR.append(clientActionTD);
    clientTR.append(clientActionTD);

    //объявляем переменную
    let clientContacs;
    //создаем массив с контактами
    clientContacs = [...client.contacts];
    //Проверяем Массив с контактами и добавляем иконку на определенное значение
    for (let i = 0; i < clientContacs.length; i++) {
        if (clientContacs[i].type == "VK") {  //проверяем значение
            let img = document.createElement("img");  //создаем картинку 
            img.src = "../img/vk-icon.svg";  //путь до картинки
            let btn = document.createElement("button"); // создаем кнопку для подсказки (тултипа)
            btn.classList.add("btn-reset", "tooltip", "tooltip-btn"); // добавляем классы для тултипа из библиотеки
            btn.setAttribute("data-tooltip", 'VK: ' + clientContacs[i].value); // добавляем подсказке атрибут с информацией
            btn.append(img); //добавляем картинку к кнопке
            clientContactsTD.append(btn); //добавляем в таблицу
        } //проверяем дальше
        else if (clientContacs[i].type == "Телефон") {
            let img = document.createElement("img");
            img.src = "../img/phone-icon.svg";
            let btn = document.createElement("button");
            btn.classList.add("btn-reset", "tooltip", "tooltip-btn");
            btn.setAttribute("data-tooltip", 'Телефон: ' + clientContacs[i].value);
            btn.append(img);
            clientContactsTD.append(btn);
        } else if (clientContacs[i].type == "Facebook") {
            let img = document.createElement("img");
            img.src = "../img/facebook-icon.svg";
            let btn = document.createElement("button");
            btn.classList.add("btn-reset", "tooltip", "tooltip-btn");
            btn.setAttribute("data-tooltip", 'Facebook: ' + clientContacs[i].value);
            btn.append(img);
            clientContactsTD.append(btn);
        } else if (clientContacs[i].type == "Email") {
            let img = document.createElement("img");
            img.src = "../img/mail-icon.svg";
            let btn = document.createElement("button");
            btn.classList.add("btn-reset", "tooltip", "tooltip-btn");
            btn.setAttribute("data-tooltip", 'Email: ' + clientContacs[i].value);
            btn.append(img);
            clientContactsTD.append(btn);
        } else if (clientContacs[i].type == "Доп. телефон") {
            let img = document.createElement("img");
            img.src = "../img/phone-icon.svg";
            let btn = document.createElement("button");
            btn.classList.add("btn-reset", "tooltip", "tooltip-btn");
            btn.setAttribute("data-tooltip", 'Доп. телефон: ' + clientContacs[i].value);
            btn.append(img);
            clientContactsTD.append(btn);
        }
    };

    //возможность группировать иконки с контактами
    let moreBtn = document.createElement("button"); //сздаем кнопку
    moreBtn.classList.add('btn-reset', 'more-btn') //добавляем классы
    let showElems = 5; // добавляем значение кнопке, для дальнейшего удобства 
    if (clientContactsTD.childNodes.length > showElems) { // проверяем если количество элементов в массиве больше чем showElements
        moreBtn.textContent = `+${clientContactsTD.childNodes.length - showElems}`; //добавляем текст в кнопку, + , число которое осталось 
        clientContactsTD.append(moreBtn); //добавляем кнопку в таблицу
        for (let i = showElems; i < moreBtn.parentElement.children.length; i++) {
            if (moreBtn.parentElement.children[i].getAttribute("data-tooltip")) {
                moreBtn.parentElement.children[i].classList.add("hide-contact") //прячем лишние контакты через добавление класса со стилями 
            };
        };
    };
    //по нажатию на кнопку возвращаем все контакты в таблицу
    moreBtn.addEventListener("click", () => {
        for (let i = 0; i < moreBtn.parentElement.children.length; i++) {
            moreBtn.parentElement.children[i].classList.remove("hide-contact") //возвращаем кнопки, убирая класс 
        };
        moreBtn.style.display = "none"; //прячем кнопку с количеством контактов
    })

    //для закрытия и открытия окна с удалением клиента
    const delOpen = document.querySelector('.delete-client')
    //для открытия и изменения окна Изменить клиента
    const changeOpen = document.querySelector('.change-client');

    //открыть окно для удаления клиента
    delBtn.addEventListener('click', function () {
        delOpen.classList.add('del--open'); //добавляем класс для появления
        clientId = client.id; // записываем значение в перемнную
    });
    //Открыть окно Изменить
    changeBtn.addEventListener('click', function () {
        changeOpen.classList.add('change-client--open');
        clientId = client.id;
        getClientID(clientId);

    });

    return clientTR;
};

//Удаляем клиента в меню Удалить
deleteClientBtn.addEventListener('click', function () {
    deleteClient(clientId);
    clientId = 0; //обнуляем айди для следующего использования
});

//Удаляем клиента в меню Изменить
changeDeleteClient.addEventListener('click', function () {
    deleteClient(clientId);
    clientId = 0; //обнуляем айди для следующего использования
});

//создаем поле с контактами по клику
function createContacts() {

    //кнопка добавить клиента в меню добавить клиента
    const addContactBtn = document.querySelector('.new-client__AddBtn');

    addContactBtn.addEventListener('click', function (event) {
        event.preventDefault();

        //создаем Поле ввода
        const generalContainer = document.createElement('div');
        const selectContainer = document.createElement('div');
        const inputContainer = document.createElement('div');
        const inputContacts = document.createElement('input');
        const buttonContainer = document.createElement('div');
        const closeInputBtn = document.createElement('button');
        const contactsInfoContainer = document.querySelector('.new-client__contacts-container');

        //добавляем классы
        generalContainer.classList.add('general-container');
        selectContainer.classList.add('select-container');
        inputContacts.classList.add('new-client__input--contacts');
        closeInputBtn.classList.add('btn-reset', 'new-client__btn-close');

        //селект
        const select = document.createElement('select');
        select.name = 'select';
        select.classList.add('new-select');

        //Опции селекта
        const option1 = document.createElement('option');
        option1.value = 'Телефон'
        option1.textContent = 'Телефон'
        const option2 = document.createElement('option');
        option2.value = 'Доп. телефон'
        option2.textContent = 'Доп. телефон'
        const option3 = document.createElement('option');
        option3.value = 'Email'
        option3.textContent = 'Email'
        const option4 = document.createElement('option');
        option4.value = 'VK'
        option4.textContent = 'VK'
        const option5 = document.createElement('option');
        option5.value = 'Facebook'
        option5.textContent = 'Facebook'

        //создаем по нажатию
        select.append(option1, option2, option3, option4, option5);
        selectContainer.append(select);
        inputContainer.append(inputContacts);
        buttonContainer.append(closeInputBtn);
        generalContainer.append(selectContainer, inputContainer, buttonContainer);
        contactsInfoContainer.append(generalContainer);

        // кастомный селект
        const choices = new Choices(select, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            allowHTML: true,
            position: 'bottom'
        });

        //Удаляем поле для ввода по нажатию
        closeInputBtn.addEventListener('click', function (event) {
            event.preventDefault();
            contactsInfoContainer.removeChild(generalContainer);
        });

        return generalContainer;
    });

    //кнопка добавить клиента в меню изменить
    const addContactChangeBtn = document.querySelector('.change-client__AddBtn');

    addContactChangeBtn.addEventListener('click', function (event) {
        event.preventDefault();

        //создаем Поле ввода
        const generalContainer = document.createElement('div');
        const selectContainer = document.createElement('div');
        const inputContainer = document.createElement('div');
        const inputContacts = document.createElement('input');
        const buttonContainer = document.createElement('div');
        const closeInputBtn = document.createElement('button');
        const contactsInfoContainer = document.querySelector('.change-client__contacts-container');

        //добавляем классы
        generalContainer.classList.add('general-container');
        selectContainer.classList.add('select-container');
        inputContacts.classList.add('change-client__input--contacts');
        closeInputBtn.classList.add('btn-reset', 'new-client__btn-close');

        //селект
        const select = document.createElement('select');
        select.name = 'select';
        select.classList.add('change-select');

        //Опции селекта
        const option1 = document.createElement('option');
        option1.value = 'Телефон'
        option1.textContent = 'Телефон'
        const option2 = document.createElement('option');
        option2.value = 'Доп. телефон'
        option2.textContent = 'Доп. телефон'
        const option3 = document.createElement('option');
        option3.value = 'Email'
        option3.textContent = 'Email'
        const option4 = document.createElement('option');
        option4.value = 'VK'
        option4.textContent = 'VK'
        const option5 = document.createElement('option');
        option5.value = 'Facebook'
        option5.textContent = 'Facebook'

        //создаем по нажатию
        select.append(option1, option2, option3, option4, option5);
        selectContainer.append(select);
        inputContainer.append(inputContacts);
        buttonContainer.append(closeInputBtn);
        generalContainer.append(selectContainer, inputContainer, buttonContainer);
        contactsInfoContainer.append(generalContainer);

        // кастомный селект
        const choices = new Choices(select, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            allowHTML: true,
            position: 'bottom'
        });

        //Удаляем поле для ввода по нажатию
        closeInputBtn.addEventListener('click', function (event) {
            event.preventDefault();
            contactsInfoContainer.removeChild(generalContainer);
        });

        return generalContainer;
    });
};
createContacts();

//изменение клиента 
function changeFieldsData(data) {
    let clientsCopy = [...data];
    for (const client of clientsCopy) {
        client.fullName = client.surname + ' ' + client.name + ' ' + client.lastName; // Делаем ФИО одной переменной
        //дата добавления
        createDate1 = client.createdAt.slice(0, 4); //год
        createDate2 = client.createdAt.slice(5, 7); //месяц
        createDate3 = client.createdAt.slice(8, 10); //день
        client.createDate = createDate3 + '.' + createDate2 + '.' + createDate1 //полная дата
        //дата последнего обновления
        changeDate1 = client.updatedAt.slice(0, 4); //год
        changeDate2 = client.updatedAt.slice(5, 7); //месяц
        changeDate3 = client.updatedAt.slice(8, 10); //даень
        client.changeDate = changeDate3 + '.' + changeDate2 + '.' + changeDate1 //полная дата
    };
    return clientsCopy;
};

//рендер
async function render() {
    //запрос на список клиентов
    async function loadClients() {
        const response = await fetch('http://localhost:3000/api/clients');
        // получаем содержимое json из тела ответа
        const data = await response.json();
        clientsArray = data;
        console.log(clientsArray);
    }
    await loadClients();
    tableList.innerHTML = '';

    // Меняю свойства объекта клиента
    let data = changeFieldsData(clientsArray);

    //Поиск по алфавиту
    data = data.sort(function (a, b) {
        // обращаюсь к элементу массива по значению в переменной которое установил при клике на кнопки
        let sort = a[column] < b[column]
        // меняю условие при другом булевом значении переменной
        if (columnDir == false) sort = a[column] > b[column]
        if (sort) return -1
    });

    //добавление
    for (const client of data) {
        const newTR = newWorkerTable(client);
        tableList.append(newTR);
    };
};

//поиск по сайту
async function getClientName() {
    const response = await fetch(`http://localhost:3000/api/clients/?search=${searchInput.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    let clients = changeFieldsData(data);
    //очищаем
    tableList.innerHTML = "";
    //добавление
    for (const client of clients) {
        const newTR = newWorkerTable(client);
        tableList.append(newTR);
    };
};

//фунция для откладывание запроса
function debounce(callee, timeoutMs) {
    // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
    // чуть позже мы увидим, как это помогает.
    return function perform(...args) {
        // В переменной previousCall мы будем хранить
        // временную метку предыдущего вызова...
        let previousCall = this.lastCall

        // ...а в переменной текущего вызова —
        // временную метку нынешнего момента.
        this.lastCall = Date.now()

        // Нам это будет нужно, чтобы потом сравнить,
        // когда была функция вызвана в этот раз и в предыдущий.
        // Если разница между вызовами меньше, чем указанный интервал,
        // то мы очищаем таймаут...
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }
        // ...который отвечает за непосредственно вызов функции-аргумента.
        // Обратите внимание, что мы передаём все аргументы ...args,
        // который получаем в функции perform —
        // это тоже нужно, чтобы нам не приходилось менять другие части кода.
        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
        // Если таймаут был очищен, вызова не произойдёт
        // если он очищен не был, то callee вызовется.
        // Таким образом мы как бы «отодвигаем» вызов callee
        // до тех пор, пока «снаружи всё не подуспокоится».
    }
};

//Запускаем функцию при заполнение инпута
searchInput.addEventListener('input', function (e) {
    e.preventDefault();
    const getSearchResults = debounce(getClientName, 300)
    getSearchResults();
});

// возможность по нажатию сортировать списки
tableListTHAll.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        // console.log(column)
        columnDir = !columnDir
        render();
    });
});
render();

//валидация формы в меню Создать клиента
function validation(newClientForm) {

    //если этот класс находился до этого, то убираем его
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    };
    //создаем элементы для ошибок
    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    };

    let result = true;

    //находим все инпуты в форме
    const allInputs = newClientForm.querySelectorAll('input');

    for (const input of allInputs) {

        removeError(input)

        //проверяем минимальное количество символов
        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength) {
                removeError(input)
                createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`)
                result = false
            }
        };
        //проверяем максимальное количество символов
        if (input.dataset.maxLength) {
            if (input.value.length > input.dataset.maxLength) {
                removeError(input)
                createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`)
                result = false
            }
        };
        //проверяем на наличие символов
        if (input.dataset.required == "true") {
            if (input.value == "") {
                removeError(input)
                createError(input, 'Поле не заполнено!')
                result = false
            }
        };
    };

    return result;
};

//Валидация формы в меню Изменить
function newValidation(changeForm) {

    //если этот класс находился до этого, то убираем его
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    };
    //создаем элементы для ошибок
    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    };

    let result = true;

    //находим все инпуты в форме
    const allInputsChange = changeForm.querySelectorAll('input');

    for (const inputChange of allInputsChange) {

        removeError(inputChange)

        //проверяем минимальное количество символов
        if (inputChange.dataset.minLength) {
            if (inputChange.value.length < inputChange.dataset.minLength) {
                removeError(inputChange)
                createError(inputChange, `Минимальное кол-во символов: ${inputChange.dataset.minLength}`)
                result = false
            }
        };
        //проверяем максимальное количество символов
        if (inputChange.dataset.maxLength) {
            if (inputChange.value.length > inputChange.dataset.maxLength) {
                removeError(inputChange)
                createError(inputChange, `Максимальное кол-во символов: ${inputChange.dataset.maxLength}`)
                result = false
            }
        };
        //проверяем на наличие символов
        if (inputChange.dataset.required == "true") {
            if (inputChange.value == "") {
                removeError(inputChange)
                createError(inputChange, 'Поле не заполнено!')
                result = false
            }
        };
    };

    return result;
};

//записываем данные на сервер
form.addEventListener('submit', function (event) {
    event.preventDefault()

    // данные с инпутов и селектов (контакты)
    const selectAll = document.querySelectorAll('.new-select');
    const inputContactsAll = document.querySelectorAll('.new-client__input--contacts');
    //массив с контактами
    let contacts = [];

    // добавляем данные с инпутов в массив с кнтактами
    for (let i = 0; i < selectAll.length; i++) {
        if (!inputContactsAll[i].value) continue;
        contacts.push({
            type: selectAll[i].value,
            value: inputContactsAll[i].value,
        });
    };

    //отправляем данные на сервер
    if (validation(this) == true) { // если валидация пройдена
        async function createClient() {
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    surname: surnameInput.value.trim(),
                    lastName: lastnameInput.value.trim(),
                    contacts: contacts,
                })
            });
            const data = await response.json();
            // console.log(data);
            render();
        };
        createClient();
    };
});

//перезаписываем данные на сервер
changeForm.addEventListener('submit', function (event) {
    event.preventDefault()

    // данные с инпутов и селектов (контакты) в меню изменить
    const selectAllChange = document.querySelectorAll('.change-select');
    const inputContactsAllChange = document.querySelectorAll('.change-client__input--contacts');
    //массив с контактами
    let contacts = [];

    // добавляем данные с инпутов в массив с кнтактами в меню изменить
    for (let i = 0; i < selectAllChange.length; i++) {
        if (!inputContactsAllChange[i].value) continue;
        contacts.push({
            type: selectAllChange[i].value,
            value: inputContactsAllChange[i].value,
        });
    };

    //отправляем данные на сервер
    if (newValidation(this) == true) { // если валидация пройдена
        async function changeClient(id) {
            const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: document.getElementById('input-name-change').value.trim(),
                    surname: document.getElementById('input-surname-change').value.trim(),
                    lastName: document.getElementById('input-lastname-change').value.trim(),
                    contacts: contacts,
                })
            });
            const data = await response.json();
            // console.log(data);
            render();
        };
        changeClient(clientId);
    };
});

//эффекты на стрелку в колонке ID
document.querySelector('.clients__th--id').addEventListener('click', function () {
    document.querySelector('.clients__th--id .id-arrow-up').classList.toggle('id-arrow--active')
    document.querySelector('.clients__th--id .id-arrow-down').classList.toggle('id-arrow--disabled')
});

//эффекты на стрелку в колонке ФИО
document.querySelector('.clients__th--fio').addEventListener('click', function () {
    document.querySelector('.clients__th--fio .fio-arrow-up').classList.toggle('fio-arrow--active')
    document.querySelector('.clients__th--fio .fio-arrow-down').classList.toggle('fio-arrow--disabled')
});

//эффекты на стрелку в колонке Дата и время создания
document.querySelector('.clients__th--create').addEventListener('click', function () {
    document.querySelector('.clients__th--create .create-arrow-up').classList.toggle('create-arrow--active')
    document.querySelector('.clients__th--create .create-arrow-down').classList.toggle('create-arrow--disabled')
});

//эффекты на стрелку в колонке Дата и время изменения
document.querySelector('.clients__th--last').addEventListener('click', function () {
    document.querySelector('.clients__th--last .change-arrow-up').classList.toggle('change-arrow--active')
    document.querySelector('.clients__th--last .change-arrow-down').classList.toggle('change-arrow--disabled')
});
