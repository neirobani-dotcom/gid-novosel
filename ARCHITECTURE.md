# Архитектура Гид Новосёла

## Общая схема

```
Браузер
  └── React SPA (Vite)
        ├── Данные: статические JS-файлы (companies.js, gifts.js)
        ├── Хранилище: localStorage (заявки для AdminPage)
        ├── Email: Web3Forms API (сертификаты)
        └── PHP-скрипт на хостинге (лиды партнёров)
```

Никакой базы данных нет. Никакого API нет. Всё статическое, кроме двух внешних точек отправки писем.

---

## Маршрутизация

Используется не React Router, а ручная реализация через `window.history.pushState` + событие `popstate`.

В `App.jsx` одна большая функция с цепочкой `if (page === '...')` — каждая страница рендерится условно. Состояние `page` управляет тем, что показывается.

```
App.jsx
  state: page (string)
  state: selected (company object)
  ├── page === 'home'        → главная страница
  ├── page === 'smd'         → SmdPage
  ├── page === 'sibmebel'    → SibmebelPage
  ├── page === 'neirobanya'  → NeirobanyaPage
  ├── page === 'proclimat'   → ProclimatPage
  ├── page === 'company'     → CompanyPage (универсальная)
  ├── page === 'gifts-boxes' → GiftsBoxPage
  ├── page === 'gift-detail' → GiftDetailPage
  ├── page === 'admin'       → AdminPage
  ├── page === 'gid-voditelya' → GidVoditelya
  └── page === 'gid-*'       → GidEmpty
```

---

## Данные (нет БД — только файлы)

### src/data/companies.js

Единственный источник данных о партнёрах. Массив объектов. Каждый объект:

```js
{
  id: 'proclimat',          // уникальный slug, используется везде
  name: 'ПроКлимат',
  category: 'Климат и вентиляция',
  giftAmount: 15000,        // число для счётчика на главной
  giftLabel: '...',         // короткое описание подарка
  phone: '+79232962500',
  phones: [...],            // массив для ContactButtons
  messengers: ['max'],      // whatsapp | telegram | max
  gifts: [...],             // список для Certificate
  address: '...',
  hours: '...',
  color: '#00d4ff',         // акцентный цвет компании
  logo: '/partners/proclimat/logo.jpeg',
  images: [...],            // массив путей к фото
  freebies: [...],          // список бонусов для CompanyPage
  advantages: [...],        // список преимуществ
  ctaButtons: [...],        // кнопки действий
}
```

### src/data/gifts.js

Данные для страницы «коробок подарков» (`/gifts`). Не все партнёры из companies.js есть здесь — только те, у кого есть купонные подарки:

```js
{
  partnerId: 'proclimat',   // должен совпадать с id в companies.js
  name: 'ПроКлимат',
  color: '#00d4ff',
  items: [
    { id: 'pcl-1', title: '...', condition: '...' },
    ...
  ]
}
```

---

## Страницы партнёров

### Два типа страниц

**1. Универсальная** — `CompanyPage.jsx`

Большинство партнёров. Рендерит любого партнёра по объекту `company`. Показывает фото, подарки, контакты, кнопки, сертификат.

**2. Кастомные** — отдельный файл на каждого

Используются когда нужен уникальный дизайн или структура блоков:

| Файл | Партнёр | Особенность |
|------|---------|-------------|
| SmdPage.jsx | СМД | Кастомная вёрстка, галерея |
| SibmebelPage.jsx | СибМебель | Несколько галерей по категориям |
| NeirobanyaPage.jsx | Нейробаня | Тёмная тема, слайдер |
| ProclimatPage.jsx | ПроКлимат | Светлый фон, 3 карточки подарков |

---

## Сертификат

Компонент `Certificate.jsx` — модальное окно поверх страницы (через `createPortal`).

Шаги:
1. Форма (фамилия, имя, телефон, дата)
2. Отправка через Web3Forms → письмо на `neirobanya@mail.ru`
3. Показ сертификата с кодом (`GNS-XXX-2026`)
4. Кнопка «Скриншот» → анимация + второе письмо через Web3Forms

Ключ Web3Forms захардкожен в `Certificate.jsx` как `WEB3FORMS_KEY`.

---

## PHP-скрипт (send-lead.php)

Лежит на хостинге в `public_html/send-lead.php`. Принимает POST-запрос от `ContactButtons.jsx` / `ActivateModal.jsx` и отправляет письмо через PHP `mail()` на email партнёра.

```
Клиент → POST /send-lead.php → php mail() → email партнёра
```

Маппинг company.id → email хранится прямо в скрипте (массив `$partnerEmails`). Логирует каждый запрос в `leads.log` на сервере.

---

## Хранилище на клиенте

- **localStorage** — заявки, которые попадают в `AdminPage`. Ключ: `gid_activations`.
- **sessionStorage** — имитированный счётчик онлайн (`gid_visitors`). Значение случайное, зависит от времени суток.

---

## PWA

Настроен через `vite-plugin-pwa` (режим `generateSW`). Service Worker кэширует статику. PHP-файлы и `.log` из кэша исключены. Манифест в `vite.config.js`.

---

## Деплой

```
npm run build  →  dist/
                    ↓
          FTP → SprintHost /public_html
          или
          Git push → Vercel (автодеплой)
```

`deploy-ftp.js` — Node.js скрипт (vinyl-ftp). Загружает `dist/` на FTP.
`deploy.sh` — bash обёртка для `lftp`, принимает переменные окружения.

---

## Изображения

```
public/
  partners/
    <partner-id>/
      logo.jpeg       — логотип (используется в GiftBox, Certificate, CompanyPage)
      1.jpeg, 2.jpeg… — фото работ (числовая нумерация)
  smd/                — старая папка СМД (дублирует partners/smd/, не используется)
  site-logo.png       — логотип сайта
```

---

## Внешние зависимости

| Сервис | Для чего | Где настроен |
|--------|----------|--------------|
| Web3Forms | Email при активации сертификата | Certificate.jsx (ключ захардкожен) |
| SprintHost FTP | Деплой | deploy-ftp.js / deploy.sh |
| Google Fonts (Montserrat, Inter, Playfair Display) | Шрифты | index.html |
| Yandex Maps | Кнопка «Маршрут» | ссылки в компонентах партнёров |
| MAX мессенджер | Кнопка «Написать» у некоторых партнёров | ссылки в компонентах |
