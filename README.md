# PrintStore

An art prints web shop built with Nuxt 4, Medusa v2, and Directus.

## Stack

- **Frontend**: Nuxt 4 + Tailwind CSS + Nuxt UI + @nuxtjs/i18n + @nuxt/image
- **Commerce**: Medusa v2 (Stripe, S3, SMTP)
- **CMS**: Directus (self-hosted)
- **Database**: PostgreSQL
- **Storage**: Scaleway Object Storage (S3-compatible)
- **Email**: SMTP via Scaleway

## Local Development with Docker Compose

### Prerequisites

- Docker & Docker Compose installed
- Copy `.env.example` to `.env` and fill in all values

### Start all services

```bash
cp .env.example .env
# Edit .env with your credentials
docker compose up --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Medusa Admin / API**: http://localhost:9000
- **Directus CMS**: http://localhost:8055

### Seed Medusa

```bash
docker compose exec medusa npx medusa seed --seed-file=./src/scripts/seed.ts
```

### Directus Setup

On first run, log in to Directus at http://localhost:8055 with the admin credentials from `.env`.
The `pages` and `seo` collections must be created manually via the Directus UI or using the provided snapshot.

## Project Structure

```
frontend/   Nuxt 4 storefront
backend/    Medusa v2 commerce API
cms/        Directus CMS configuration
```