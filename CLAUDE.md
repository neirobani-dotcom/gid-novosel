# CLAUDE.md — правила для AI-агента

## Постоянное правило

**После каждого изменения кода обновляй соответствующую документацию (README.md, ARCHITECTURE.md, .env.example). Документация всегда должна соответствовать коду.**

---

## Что это за проект

Гид Новосёла (`gidnovosela.ru`) — React SPA, маркетплейс подарков для новосёлов Красноярска. Никакого бэкенда нет. Все данные — статические JS-файлы.

---

## Стек

- React 19, Vite 8, Tailwind CSS 3
- PWA (vite-plugin-pwa)
- Клиентская маршрутизация через `window.history.pushState` — **без React Router**
- Внешние API: Web3Forms (email при сертификате), PHP-скрипт на хостинге (лиды партнёров)

---

## Структура файлов

```
src/
  App.jsx               — все маршруты, вся навигация
  data/
    companies.js        — ОДИН источник правды для всех партнёров
    gifts.js            — подарки для страницы «коробок»
  pages/
    CompanyPage.jsx     — универсальная страница партнёра (большинство)
    SmdPage.jsx         — кастомная страница СМД
    SibmebelPage.jsx    — кастомная страница СибМебель
    NeirobanyaPage.jsx  — кастомная страница Нейробаня
    ProclimatPage.jsx   — кастомная страница ПроКлимат
    GiftsBoxPage.jsx    — страница «коробок» с подарками
    GiftDetailPage.jsx  — детальная страница купонов партнёра
    AdminPage.jsx       — скрытая страница статистики (5 тапов по счётчику)
    GidVoditelya.jsx    — раздел Гид Водителя
    GidEmpty.jsx        — заглушка для разделов без контента
  components/
    Certificate.jsx     — электронный сертификат + форма + Web3Forms
    GiftBox.jsx         — 3D-коробка (SVG) в каталоге подарков
    Lightbox.jsx        — просмотр фото на весь экран
    PartnerNavArrows.jsx — стрелки навигации между партнёрами
    GridCard.jsx        — карточка партнёра в главном каталоге
    ContactButtons.jsx  — кнопки связи (WhatsApp, Telegram, MAX)
    VisitorCounter.jsx  — имитация счётчика онлайн (случайные числа)
    CountdownTimer.jsx  — баннер обратного отсчёта
    PopupWidget.jsx     — всплывающий виджет через 30 сек
    ...остальные — вспомогательные UI-компоненты
public/
  partners/<id>/        — фото и logo.jpeg каждого партнёра
  send-lead.php         — PHP: отправляет лиды на email партнёров
```

---

## Маршруты (App.jsx)

| URL | Страница |
|-----|----------|
| `/` | Главная |
| `/gifts/smd` | SmdPage |
| `/gifts/sibmebel` | SibmebelPage |
| `/gifts/neirobanya` | NeirobanyaPage |
| `/gifts/proclimat` | ProclimatPage |
| `/gid-voditelya` | GidVoditelya |
| `/gid-roditelyam`, `/gid-servis`, `/gid-biznes`, `/gid-zdorovya` | GidEmpty |

Остальные партнёры открываются через `CompanyPage` без отдельного URL.

---

## Данные партнёров

Всё хранится в двух файлах:

- `src/data/companies.js` — полные данные: id, имя, категория, телефоны, фото, подарки, преимущества
- `src/data/gifts.js` — список «купонных» подарков для GiftsBoxPage (не все партнёры)

**Партнёры в companies.js** (11 шт.): akademiya-shtor-tas, olkon, irbis, krasnoyarsk-rassrochka-avto, kafel-emarti, shatura, sibmebel, neirobanya, proclimat, smd, kuhni-shik.

---

## Как добавить нового партнёра

1. Добавить объект в `src/data/companies.js` (обязательные поля: `id`, `name`, `category`, `giftAmount`, `logo`, `images`)
2. Положить фото в `public/partners/<id>/`
3. Если нужна кастомная страница:
   - Создать `src/pages/<Name>Page.jsx`
   - Добавить `import` и все 5 мест в `App.jsx`: `useState init`, `popstate handler`, `navigateToPartner`, `GridCard onClick`, `render block`
4. Если партнёр в «коробках» — добавить в `src/data/gifts.js`

---

## Сертификаты

- Компонент: `src/components/Certificate.jsx`
- Ключ Web3Forms прописан в файле как `WEB3FORMS_KEY` — при добавлении нового партнёра ключ тот же
- Коды формата: `GNS-XXX-2026` (XXX — аббревиатура партнёра)
- При активации письмо уходит на `neirobanya@mail.ru`

---

## Чего НЕ делать

- Не трогать `CompanyPage.jsx` для изменений только одного партнёра — используй кастомную страницу
- Не добавлять React Router — маршрутизация через `pushState`, менять не нужно
- Не коммитить `.env` файлы и `deploy-ftp.js` с реальными паролями
- Не менять `GiftBox.jsx` (SVG-коробка) без необходимости — там сложная геометрия
- Не трогать `VisitorCounter.jsx` — счётчик намеренно имитированный

---

## Деплой

```bash
npm run build
node deploy-ftp.js        # или ./deploy.sh с env-переменными
```

Хостинг: SprintHost, папка `/public_html`. PHP-скрипт остаётся на хостинге и не пересобирается.
