import { defineConfig, Modules } from '@medusajs/utils'

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      adminCors: process.env.MEDUSA_ADMIN_CORS || 'http://localhost:9000',
      storeCors: process.env.MEDUSA_STORE_CORS || 'http://localhost:3000',
      authCors: process.env.MEDUSA_AUTH_CORS || 'http://localhost:3000,http://localhost:9000',
      jwtSecret: process.env.MEDUSA_JWT_SECRET || 'supersecret',
      cookieSecret: process.env.MEDUSA_COOKIE_SECRET || 'supersecret',
    },
  },

  modules: [
    // Stripe Payment
    {
      resolve: '@medusajs/medusa-payment-stripe',
      options: {
        apiKey: process.env.STRIPE_API_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },

    // S3 File Storage (Scaleway)
    {
      resolve: 'medusa-file-s3',
      options: {
        s3_url: process.env.S3_ENDPOINT,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      },
    },

    // Email via SMTP
    {
      resolve: 'medusa-plugin-sendgrid',
      options: {
        api_key: 'not-used',
        from: process.env.SMTP_FROM,
        order_placed_template: 'order_placed',
        smtp: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      },
    },
  ],
})
