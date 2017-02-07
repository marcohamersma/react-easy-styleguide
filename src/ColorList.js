import React from 'react';
import map from 'lodash.map';
import bemHelper from 'react-bem-helper';

const BEMClassName = new bemHelper('styleGuideColorList');

export default colors => (
  <ul {...BEMClassName({ extra: 'styleGuide-element' })}>
    {
      map(colors, (className, name) => (
        <li key={name} {...BEMClassName('item')}>
          <div {...BEMClassName('preview', null, className)}/>
          <div {...BEMClassName('name')}>{ name }</div>
          <div {...BEMClassName('className')}><code>{ className }</code></div>
        </li>
      ))
    }
  </ul>
)
