import React from 'react';
import { get } from './index';
import Variation from './Variation';

const Viewer = props => {
  const { component, variations } = get(props.component, props.variation);

  return (
    <div className="n-vspacing-medium styleguide__viewer">
      <h2>{component.name}</h2>
      <div
        className="n-color-mid"
        dangerouslySetInnerHTML={{__html: component.readme}}
      />

      <table className="n-vspacing-small">
        <caption>PropTypes</caption>
        <tbody>
          { Object.keys(component.propTypes).map( propType => (
            <tr key={propType}>
              <td><strong>{propType}:</strong></td>
              <td>
                {component.propTypes[propType].name}
                {
                  component.propTypes[propType].isRequired
                    ? ' (required)'
                    : null
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Variations:</h3>
      { component.variations.map(
        v => Variation(v, component.Component)
      )}
    </div>
  );
}

export default Viewer;
