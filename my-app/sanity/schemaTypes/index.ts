import { type SchemaTypeDefinition } from 'sanity'
import blog from '../schema/blog'
import category from '../schema/category'
import author from '../schema/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog,category,author],
}
