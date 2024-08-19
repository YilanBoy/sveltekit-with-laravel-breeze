# SvelteKit with Laravel Breeze (WIP)

A SvelteKit template project show how to use Laravel Breeze as a backend.

> [!IMPORTANT]
> 
> The authentication use Laravel official package - [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum), this package provides the cookie-based authentication.
> 
> The project is simple at the moment, with only login and route protection. I'm currently using it to develop my blog CMS. Still work in progress.

## Installation

This is a template project, you can click the `Use this template` to fork the project in your account.

Then, clone the project.

```bash
git clone git@github.com:<YOUR_ACCOUNT>/sveltekit-with-laravel-breeze.git
```

Move into the project, and create a new `.env` file.

```bash
cd sveltekit-with-laravel-breeze
cp .env.example .env
```

Install the npm packages.

```bash
npm install
```

Start the local website.

```bash
npm run dev -- --open --port 3000
```

I suggest using 80 or 3000 as the default port.

Because we use the cookie-based authentication, it means request should be **STATEFUL**.
In the Laravel Sanctum default settings, there are only few domains allow to be stateful.

```php
// config/sanctum.php

return [
    // ...

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        Sanctum::currentApplicationUrlWithPort(),
        // Although you can set the FRONTEND_URL, the port is removed here.
        env('FRONTEND_URL')
            ? ','.parse_url(env('FRONTEND_URL'), PHP_URL_HOST)
            : ''
    ))),
    
    // ...
]
```

You can also update the Laravel Sanctum config and make 5173 port be stateful. It's OK.
