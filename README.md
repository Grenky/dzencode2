Dzencode2

dzencode2/
├── client/ # Фронтенд на React
│ └── build/ # Собранная версия React
├── server/ # Бэкенд на Express
│ └── index.js
├── Dockerfile # Docker-конфигурация
├── db-schema.mwb # Схема БД (MySQL Workbench)
├── package-lock.json
└── README.md

---

Проект развернут на Render:
https://dzencode2.onrender.com

---

запустить локально

git clone https://github.com/Grenky/dzencode2.git
cd dzencode2

---

Собрать образ:
docker build -t dzencode2-app .
Запустить контейнер:
docker run -p 3001:3001 dzencode2-app

---

Ручной запуск (без Docker)

Установка зависимостей:
cd server
npm install

Запуск сервера:
node index.js

Сборка клиента:

cd client
npm install
npm run build

Express автоматически раздаёт папку client/build как статические файлы.

---

WebSocket
REACT_APP_API_URL=https://dzencode2.onrender.com

---

Схема базы данных

Таблица orders:

id — INT, PK, Auto Increment

title — VARCHAR

price_usd — DECIMAL(10,2)

created_at — DATETIME

---
