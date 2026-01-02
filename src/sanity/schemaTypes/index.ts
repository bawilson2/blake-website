import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './product' // Import your new schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType],
}
