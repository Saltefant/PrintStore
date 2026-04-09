# Directus CMS

This directory contains Directus configuration for PrintStore.

## Collections

### pages
- `slug` (string, unique)
- `status` (string, enum: published/draft)
- `translations` (o2m → pages_translations)
  - `languages_code` (string)
  - `title` (string)
  - `body` (text)

### seo
- `slug` (string, unique)
- `og_image` (image)
- `translations` (o2m → seo_translations)
  - `languages_code` (string)
  - `meta_title` (string)
  - `meta_description` (text)

## Setup

1. Start Directus via Docker Compose
2. Log in at http://localhost:8055 with admin credentials from `.env`
3. Create collections manually or apply the snapshot:

```bash
npx directus schema apply ./snapshot.yaml
```

## Languages

- `da-DK` (Danish — default)
- `en-US` (English)
