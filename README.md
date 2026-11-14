Two versions of the description, ENG/RUS; the first is above, the second is below. \ Два варианта описания, ENG\RUS, первый выше второй ниже 

Versel :  https://neon-vr-rental.vercel.app/
________________________________________________________________________________________________________________________________________________
# 🥽 NEONVR — Платформа бронирования VR-мероприятий и аренды оборудования

Full-stack веб-приложение для бронирования VR-игр, мероприятий и аренды гарнитур в Таллине, Эстония. Включает проверку доступности временных слотов в реальном времени, мультиязычный интерфейс и автоматическую синхронизацию заявок с CRM через Baserow.

## 🚀 Технологический стек
* **Фреймворк:** Next.js (App Router) + React
* **Язык:** TypeScript
* **Бэкенд / База данных:** Baserow REST API и Next.js Server Actions
* **Стилизация:** Tailwind CSS / Custom CSS

## ✨ Основные возможности
* **Система бронирования в реальном времени:** Интерактивный выбор даты и временных слотов (`10:00` – `20:00`) с живой проверкой занятости для исключения накладок и двойного бронирования.
* **Server Actions и интеграция с CRM:** Безопасная серверная обработка форм (`actions.ts`), напрямую связанная с таблицами базы данных Baserow для управления заявками и участниками.
* **Мультиязычность:** Встроенная поддержка эстонского (`et`), русского (`ru`) и английского (`en`) языков.
* **Обработка ошибок и валидация:** Нормализация входных данных, защита от некорректных запросов и кастомные страницы `not-found`.

## 🛠 Запуск локально

1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/toxaman55-crypto/neon-vr-rental.git](https://github.com/toxaman55-crypto/neon-vr-rental.git)
   ________________________________________________________________________________________________________________________________________________
   # 🥽 NEONVR — VR Events & Booking Platform

Full-stack web application for booking VR gaming sessions and equipment rentals in Tallinn, Estonia. Features real-time slot availability checking, multilingual support, and automated CRM synchronization via Baserow.

## 🚀 Tech Stack
* **Framework:** Next.js (App Router) + React
* **Language:** TypeScript
* **Backend / Database:** Baserow REST API & Next.js Server Actions
* **Styling:** Tailwind CSS / Custom CSS

## ✨ Key Features
* **Real-Time Booking System:** Interactive date and time slot selection (`10:00` – `20:00`) with live availability validation to prevent double-booking.
* **Server Actions & CRM Sync:** Secure server-side form handling (`actions.ts`) integrated directly with Baserow database tables to manage bookings and participant data.
* **Multilingual Interface:** Built-in support for Estonian (`et`), Russian (`ru`), and English (`en`).
* **Robust Error Handling:** Dedicated error boundaries and custom `not-found` pages.

## 🛠 Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/toxaman55-crypto/neon-vr-rental.git](https://github.com/toxaman55-crypto/neon-vr-rental.git)
