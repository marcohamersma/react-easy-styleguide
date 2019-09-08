import React from 'react'
import map from 'lodash.map'
import bemHelper from 'react-bem-helper'

const BEMClassName = new bemHelper('styleGuideColorList')

/**
 * Object for displaying colors. The `key` is the human-friendly name, the
 * `value` is the CSS class name that will be applied to display this color
 */
interface ColorArray {
  [colorLabel: string]: string
}

export const ColorList = (colors: ColorArray) => (
  <ul {...BEMClassName({ extra: 'styleGuide-element' })}>
    {map(colors, (className, name) => (
      <li key={name} {...BEMClassName('item')}>
        <div {...BEMClassName('preview', undefined, className)} />
        <div {...BEMClassName('name')}>{name}</div>
        <div {...BEMClassName('className')}>
          <code>{className}</code>
        </div>
      </li>
    ))}
  </ul>
)
