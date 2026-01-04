// src/sanity/schemaTypes/product.ts
import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        }
      ],
      description: 'The first image will be the primary thumbnail used on the home page.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (USD)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'allowCustomization',
      type: 'boolean',
      title: 'Allow Custom Text?',
      description: 'Check this if the customer should provide text for engraving/printing',
      initialValue: false,
    }),
  ],
})