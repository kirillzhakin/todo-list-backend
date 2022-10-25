# todo-list-backend Tasks

### Использованные технологии  
![NODE.JS](https://img.shields.io/badge/Node.js-172F45?style=for-the-badge&logo=node.js)
![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-172F45?style=for-the-badge&logo=posrgresql)
![EXPRESS.JS](https://img.shields.io/badge/Express-172F45?style=for-the-badge&logo=express)


### Реализована
- Регистрация пользователя
- Авторизация
- Создание задачи
- Удаление задачи
- Редактирование задачи

### Инструкция по запуску backend (Быстрый старт)

Если вы хотите запустить локальную копию приложения, следуйте инструкции:

1. Клонируйте репозиторий 
2. Установите зависимости npm

```sh
npm install
```

3. Запустите локальный сервер, в режиме разработки

```sh
npm run dev
```
 или в обычном режиме
```sh
npm run start
```

### Тестирование сервера с помощью Postman
#
### User
### // POST /signup - регистрация пользователя
```sh
http://localhost:5000/signup
```

### // POST /signin - авторизация пользователя
```sh
http://localhost:5000/signin
```

```sh
{
  "login": "Mone2022",
  "password": "2022"
}
```
### // Сервер возвращает token, в которм хранится id, login, дата создания, время жизни token


```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImxvZ2luIjoiTW9uZTIwMzgiLCJpYXQiOjE2NjY2NzM5NzIsImV4cCI6MTY2NzI3ODc3Mn0.LpzyTyzMyRAJ02zhD8gNwxj5IcvwBVnYm7OnJl1OoeE"
}
```

### // GET /tasks — возвращает все задачи
```sh
http://localhost:5000/tasks
```

### // GET /tasks/:id — возвращает задачу по идентификатору
```sh
http://localhost:5000/tasks/"id"
```
### // POST /tasks — создаёт задачу
```sh
http://localhost:5000/tasks
```
// Тело запроса
```sh
{
  "title": "Объект 22",
  "date": "2022-10-30",
  "priority": "Высокий",
  "status": "Выполняется",
  "creatorUser": "Кирилл",
  "responsibleUser": "Иванов",
  "userId": "1"
}
```

### // DELETE /tasks/:id — удаляет задачу по идентификатору
```sh
http://localhost:5000/tasks/"id"
```

### // PATCH /tasks/:id — обновляет задачу по идентификатору
```sh
http://localhost:5000/tasks/"id"
```


