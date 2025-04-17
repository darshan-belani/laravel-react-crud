# Laravel + React CRUD Application

This project is a full-stack CRUD (Create, Read, Update, Delete) web application built using Laravel on the backend and React (via Inertia.js) on the frontend. It provides a seamless, modern single-page application (SPA) experience with server-side routing and powerful state management.

## Installation
Need to PHP version 8.2 or above, laravel version 11 or above  

1. Clone the repository:
    ```bash
    git clone https://github.com/darshan-belani/laravel-react-crud.git
    cd laravel-react-crud
    ```

2. Install dependencies:
    ```bash
    composer install
    npm install
    ```

3. Set up your environment file:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Configure your database in the `.env` file:
    ```env
    DB_CONNECTION=
    DB_HOST=
    DB_PORT=
    DB_DATABASE=
    DB_USERNAME=
    DB_PASSWORD=
    ```

5. Run migrations:
    ```bash
    php artisan migrate
    ```

### Running the Application

- **Start laravel Backend:**
    ```bash
    php artisan serve
    ```

- **Start the Frontend:**
    ```bash
    npm run dev
    ```

- **Open your browser and navigate to:**
    ```
    http://127.0.0.1:8000/
    ```