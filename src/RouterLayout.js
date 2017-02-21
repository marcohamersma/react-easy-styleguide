import React from 'react';
import * as styleGuide from './index';
import Navigation from './Navigation';
import Viewer from './Viewer';
import bemHelper from 'react-bem-helper';
import './styles/styles.scss';

const BEMClassName = new bemHelper('styleGuide');

const RouterLayout = (props) => {
  const components = styleGuide.list();
  const { variation, component } = props.params;

  const name = styleGuide.getName();
  return (
    <div {...BEMClassName()}>
      <Navigation components={components} name={name}/>
      <div {...BEMClassName('contents')}>
        { !components.length
          ? (
              <div {...BEMClassName('panel')}>
                Install successfull, now go add some <code>component.info.js</code> files
              </div>
            )
          : <Viewer component={component} variation={variation} />
        }
      </div>
    </div>
  );
}

export default (context, props) => {
  styleGuide.init(context, props);

  return RouterLayout;
}
