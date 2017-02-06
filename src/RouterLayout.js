import React from 'react';
import * as styleGuide from './index';
import Navigation from './Navigation';
import Viewer from './Viewer';

const RouterLayout = (props) => {
  const components = styleGuide.list();
  const { variation, component } = props.params;

  const name = 'Your Simple-Styleguide';
  return (
    <div>
      <Navigation components={components} name={name}/>
      <div className="styleGuide__contents">
        <h1>{name}</h1>

        { !components.length
          ? <div>Install successfull, now go add some <code>component.info.js</code> files</div>
          : <Viewer component={component} variation={variation} />
        }
      </div>
    </div>
  );
}

export default (context, propTypes) => {
  styleGuide.init(context, propTypes);

  return RouterLayout;
}
