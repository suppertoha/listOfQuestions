# YeaHub — Список вопросов

Учебный проект: каталог вопросов для подготовки к собеседованиям (практика YeaHub).

**Demo:** _добавь ссылку после деплоя на Vercel_

## Возможности

- Список вопросов из API YeaHub
- Фильтры: специализация, навык, сложность, рейтинг, поиск
- Пагинация
- Детальная страница вопроса
- Навигация «Предыдущий / Следующий» в рамках текущих фильтров
- Мобильная версия (drawer с фильтрами и sidebar)
- Скелетоны загрузки, страница 404

## Стек

- React 19, TypeScript, Vite
- Redux Toolkit, RTK Query
- React Router 7
- SCSS Modules, Feature-Sliced Design

## Быстрый старт

```bash
git clone <repository-url>
cd listOfQuestions
npm install
cp .env.example .env
npm run dev
```

Приложение: http://localhost:3000

> Порт **3000** обязателен (CORS API). Запросы идут на `/api` — прокси в `vite.config.ts`.

### Переменные окружения

| Переменная     | Значение | Описание        |
| -------------- | -------- | --------------- |
| `VITE_API_URL` | `/api`   | Базовый URL API |

## Скрипты

| Команда           | Описание               |
| ----------------- | ---------------------- |
| `npm run dev`     | Dev-сервер (порт 3000) |
| `npm run build`   | Production-сборка      |
| `npm run preview` | Просмотр сборки        |
| `npm run lint`    | ESLint                 |

## Маршруты

| Путь             | Описание            |
| ---------------- | ------------------- |
| `/`              | Список вопросов     |
| `/questions/:id` | Детальная страница  |
| `/404`           | Страница не найдена |

## Query-параметры (фильтры)

| Параметр         | Пример    | Описание           |
| ---------------- | --------- | ------------------ |
| `specialization` | `frontend`| Slug специализации |
| `skill`          | `react`   | Slug навыка        |
| `search`         | `hooks`   | Поиск              |
| `complexity`     | `4,5`     | Сложность          |
| `rate`           | `8,9`     | Рейтинг            |
| `status`         | `learned` | Статус (UI)        |
| `page`           | `2`       | Страница           |

## Деплой на Vercel

1. Залей проект на GitHub.
2. [vercel.com](https://vercel.com) → **Add New Project** → импорт репозитория.
3. Если репозиторий — монорепо, укажи **Root Directory:** `mainProjects/listOfQuestions`.
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variable:** `VITE_API_URL` = `/api`
7. Deploy.

Файл `vercel.json` настраивает SPA-роутинг и прокси `/api` → `api.yeatwork.ru`.

## API

- [YeaHub API](https://api.yeatwork.ru/api#)
