# Tailwind Nextjs Notes app

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/timlrx)](https://github.com/sponsors/thekamalkashyap/)

This is a [Next.js 13](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and [Postgres](https://www.postgresql.org/) note taking app. Probably the most feature-rich Next.js based note taking app with all new next.js features. Easily configurable and customizable.


## Motivation

I wanted to learn next.js 13 app router and server functions. Hence 
decided to make a full fledge note taking web app using postgreSQL as database. It's awesome how you can write backend and frontend in same 
file.


## Features

- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- Lightweight
- Mobile-friendly view
- Uses mantine hooks out of the box
- Check or uncheck notes
- Timestamp
- switch themes by making update to `tailwind.config.js` (see daisyUI docs)
- SEO friendly
- blazingly fast
- uses [daisyUI](https://daisyui.com/) for components

## Quick Start Guide


1. Clone
```bash
git clone https://github.com/thekamalkashyap/notepad.git
```
2. Personalize `config.json` (site related information)
3. Modify the content security policy in `next.config.js` if you want to use
   any analytics provider or a commenting solution other than giscus.
4. Create postgres database notes (or whatever you want to name it)
5. Execute `db.sql`
6. Create `.env.local` with postgres url and jwt salt, see `.env.test`
8. Deploy

## Installation

```bash
npm install
```

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Support

Support this effort by giving a star on GitHub or consider sponsoring [sponsor](https://github.com/sponsors/thekamalkashyap).
