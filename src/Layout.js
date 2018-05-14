import React from 'react';
import * as styleGuide from './index';
import bemHelper from 'react-bem-helper';
import './styles/styles.scss';
import Navigation from './Navigation';
import Viewer from './Viewer';
import PropTypes from 'prop-types';

const BEMClassName = new bemHelper('styleGuide');

export default class Layout extends React.PureComponent {
  render() {
    const components = styleGuide.list();
    const { variation, component } = this.props;

    const name = styleGuide.getName();

    return (
      <div {...BEMClassName() }>
        <Navigation components={components} name={name} current={component}/>
        <div {...BEMClassName('contents') }>
          {!components.length
            ? (
              <div {...BEMClassName('panel') }>
                Install successfull, now go add some <code>component.info.js</code> files
                </div>
            )
            : <Viewer component={component} variation={variation} />
          }
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  variation: PropTypes.string,
  component: PropTypes.string
}
