import { Block } from 'payload'

export const ImageTextBlock: Block = {
  slug: 'ImageTextBlock',
  labels: {
    singular: 'Image & Text',
    plural: 'Image & Texts',
  },
  fields: [
    {
      name: 'blockId',
      type: 'text',
      label: 'Block ID (for linking)',
      admin: {
        description: 'Add a unique ID to reference this block in navigation links.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Reverse Layout (image on right)',
    },
  ],
}
