/** @prettier */
import React from 'react'
import map from 'lodash.map'
import bemHelper from 'react-bem-helper'

const BEMClassName = new bemHelper('styleGuideTypeList')

/**
 * Object for displaying colors. The `key` is the human-friendly name, the text
 * that will be displayed in the text style, the `value` is the CSS class name
 * that will be applied to display this style
 */
interface TypeArray {
  [displayText: string]: string
}

export const TypeList = (typeStylesArray: TypeArray) => (
  <ul {...BEMClassName()}>
    {map(typeStylesArray, (className, name) => (
      <li key={name} {...BEMClassName('item')}>
        <div {...BEMClassName('preview', undefined, className)}>{name}</div>
        <div {...BEMClassName('className')}>
          <code>{className}</code>
        </div>
      </li>
    ))}
  </ul>
)
