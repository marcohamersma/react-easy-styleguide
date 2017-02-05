import React from 'react';
import Variation from './variation';

const StyleGuideUI = ({ components }) => (
  <div>
    <h1>My styleguide</h1>
    { components.map( component => (
      <div className="n-vspacing-medium" key={component.name}>
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
    ))}
  </div>
)


const WrappedStyleGuide = ({ styleGuide }) => (
  <StyleGuideUI components={styleGuide.get()} />
)

export default WrappedStyleGuide;
