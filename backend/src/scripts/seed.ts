import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from '@medusajs/core-flows'
import { ExecArgs } from '@medusajs/types'

export default async function seed({ container }: ExecArgs) {
  console.log('Seeding database...')

  // Create categories
  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        {
          name: 'Illustrations',
          handle: 'illustrations',
          is_active: true,
          is_internal: false,
        },
        {
          name: 'Photography',
          handle: 'photography',
          is_active: true,
          is_internal: false,
        },
      ],
    },
  })

  const illustrationsCategory = categories.find((c: any) => c.handle === 'illustrations')
  const photographyCategory = categories.find((c: any) => c.handle === 'photography')

  // Create products
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: 'Forest Dream',
          handle: 'forest-dream',
          description: 'A dreamy illustration of a misty forest at dawn.',
          status: 'published' as const,
          thumbnail: 'https://via.placeholder.com/600x600?text=Forest+Dream',
          images: [{ url: 'https://via.placeholder.com/600x600?text=Forest+Dream' }],
          categories: illustrationsCategory ? [{ id: illustrationsCategory.id }] : [],
          variants: [
            {
              title: 'A4',
              sku: 'forest-dream-a4',
              prices: [{ amount: 29900, currency_code: 'dkk' }],
              options: { size: 'A4' },
            },
            {
              title: 'A3',
              sku: 'forest-dream-a3',
              prices: [{ amount: 49900, currency_code: 'dkk' }],
              options: { size: 'A3' },
            },
          ],
          options: [{ title: 'size', values: ['A4', 'A3'] }],
        },
        {
          title: 'Golden Hour',
          handle: 'golden-hour',
          description: 'A photograph capturing the magical golden hour light.',
          status: 'published' as const,
          thumbnail: 'https://via.placeholder.com/600x600?text=Golden+Hour',
          images: [{ url: 'https://via.placeholder.com/600x600?text=Golden+Hour' }],
          categories: photographyCategory ? [{ id: photographyCategory.id }] : [],
          variants: [
            {
              title: 'A4',
              sku: 'golden-hour-a4',
              prices: [{ amount: 34900, currency_code: 'dkk' }],
              options: { size: 'A4' },
            },
            {
              title: 'A3',
              sku: 'golden-hour-a3',
              prices: [{ amount: 54900, currency_code: 'dkk' }],
              options: { size: 'A3' },
            },
          ],
          options: [{ title: 'size', values: ['A4', 'A3'] }],
        },
      ],
    },
  })

  console.log('Seeding complete!')
}
