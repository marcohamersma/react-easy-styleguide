import React from 'react';
import map from 'lodash.map';
import { get } from './index';
import Variation from './Variation';

import bemHelper from 'react-bem-helper';
const BEMClassName = new bemHelper('styleGuideViewer');

function stringifyProp(prop) {
  return JSON.stringify(prop, null, 2);
}

const EmptyState = () => (
  <div className="styleGuide__panel">
    Select a component from the menu
  </div>
);

const NotFound = () => (
  <div className="styleGuide__panel">
    The component you selected does not seem to exist
  </div>
);

const PropTypeRow = (propType, propName, currentVariation)  => {
  const stringifiedProp = currentVariation
                            && stringifyProp(currentVariation.props[propName]);
  return (
    <tr key={propName}>
      <td><strong>{propName}:</strong></td>
      <td>
        <code>
          { propType.name }
          { propType.isRequired ? ' (required)' : null }
        </code>
      </td>

      { stringifiedProp
        ? (
            <td className="sg-current" title={stringifiedProp}>
              <code >{ stringifiedProp }</code>
            </td>
          )
        : null
      }
    </tr>
  )
}

const Viewer = props => {
  if (!props.component) return EmptyState();
  const { component, variations } = get(props.component, props.variation);
  if (!component) return NotFound();

  const currentVariation = props.variation && variations[0];
  const description = currentVariation && currentVariation.description
                        ? currentVariation.description
                        : component.readme;

  return (
    <div {...BEMClassName()}>
      <section className="styleGuide__panel">
        <h1>
          { component.name }
          { currentVariation ? ' — ' + currentVariation.name : null }
        </h1>

        <div
           {...BEMClassName('description')}
          dangerouslySetInnerHTML={{__html: description}}
        />

        <table {...BEMClassName('propTypes')}>
          <caption><h2>
            PropTypes
            { currentVariation ? ' & props' : null }
          </h2></caption>
          <tbody>
            { map(component.propTypes, (t,n) => PropTypeRow(t, n, currentVariation) )}
          </tbody>
        </table>
      </section>

      <h2 {...BEMClassName('variationsHeader')}>
        { currentVariation ? 'Output' : 'Variations' }:
      </h2>


      { variations.map(
        v => Variation(v, component.Component, !!currentVariation)
      )}
    </div>
  );
}

export default Viewer;
