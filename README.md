# Portfolio

This is my personal portfolio website. It shows my projects, skills and general information about me. The site also has an admin panel where I can manage all the content without touching the code directly.

https://tomaszjaworski.dev

## How it works

The frontend is built with **React 19** and **TypeScript**, using **Vite** as the build tool. For styling I used **Tailwind CSS** together with **Radix UI** components and **Framer Motion** for animations. Routing is handled by **React Router 7**.

The backend is an **ASP.NET Core** REST API written in **C#**. It connects to a **PostgreSQL** database using **Entity Framework Core**. The whole stack runs in **Docker** with Docker Compose.

## What you can do

The public part of the site shows my profile, a list of projects and the technologies I work with. There is also a GitHub activity calendar integrated directly on the page.

The admin panel is protected by token based authentication. After logging in I can update my profile information, add or remove projects and manage the technology categories. There is also basic analytics to see visitor activity.

## Tech stack

**Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion, React Router 7, Axios

**Backend**: ASP.NET Core, C#, Entity Framework Core, PostgreSQL

**Infrastructure**: Docker, Docker Compose

## Running locally

Make sure you have Docker installed. Then just run:

```
docker compose up
```

The app will be available at `http://localhost` and the API runs on port `5087`.
