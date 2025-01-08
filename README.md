# shorten url

## Структура проекта:
`shortenRouter` - содержит маршруты для обработки запросов.
`shortenController` - включает функции для выполнения логики приложения.

`dataBaseClient` - управляет подключением к базе данных (Redis).

`index.js` - главный файл, который запускает сервер и подключает все промежуточные обработчики (middleware).

## Основной функционал:
1. Создание сокращённой ссылки:
    * Отправив POST-запрос по маршруту /shorten, вы добавляете новый URL в базу данных Redis.
    * В теле запроса необходимо передать полный URL, на который будет происходить редирект.
2. Перенаправление по сокращённой ссылке:
    * Отправив GET-запрос по маршруту /shorten/:shortcode, происходит редирект на оригинальный URL, если он существует в базе данных Redis.
    * Если сокращённой ссылки нет в базе данных, сервер вернёт ответ с кодом 404 (не найдено).