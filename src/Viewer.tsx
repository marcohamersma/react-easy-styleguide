import React from 'react'
import map from 'lodash/map'
import { get } from './index'
import { Variation } from './Variation'

import bemHelper from 'react-bem-helper'
import { ComponentToShow } from './types'
const BEMClassName = new bemHelper('styleGuideViewer')

function stringifyProp(prop) {
  return JSON.stringify(prop, null, 2)
}

const EmptyState = () => (
  <div className="styleGuide-element styleGuide__panel">
    Select a component from the menu
  </div>
)

const NotFound = () => (
  <div className="styleGuide-element styleGuide__panel">
    The component you selected does not seem to exist
  </div>
)

const PropTypeRow = (propType, propName, selectedVariation) => {
  const stringifiedProp =
    selectedVariation && stringifyProp(selectedVariation.props[propName])
  const valueToDisplay = stringifiedProp || propType.defaultValue

  return (
    <tr key={propName}>
      <td>
        <strong>{propName}:</strong>
      </td>
      <td>
        <code>
          {propType.name}
          {propType.isRequired ? ' (required)' : null}
        </code>
      </td>

      {valueToDisplay ? (
        <td className="sg-current" title={valueToDisplay}>
          {valueToDisplay === propType.defaultValue && (
            <span className="sc">default&nbsp;</span>
          )}
          <code>{valueToDisplay}</code>
        </td>
      ) : (
        <td />
      )}
    </tr>
  )
}

export const Viewer = (props: ComponentToShow) => {
  if (!props.component) return EmptyState()
  const { component, variations } = get(props.component, props.variation)
  if (!component) return NotFound()

  const { singlePane } = component
  const selectedVariation = props.variation && variations![0]

  const description =
    selectedVariation && selectedVariation.description
      ? selectedVariation.description
      : component.readme

  return (
    <div {...BEMClassName()}>
      <section className="styleGuide__panel">
        <div className="styleGuide-element">
          <h1>
            {component.name}
            {selectedVariation ? ' — ' + selectedVariation.name : null}
          </h1>

          <div
            {...BEMClassName('description')}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {component.propTypes && Object.keys(component.propTypes).length ? (
            <table {...BEMClassName('propTypes')}>
              <caption>
                <h2>
                  PropTypes
                  {selectedVariation ? ' & props' : null}
                </h2>
              </caption>
              <tbody>
                {map(component.propTypes, (t, n) =>
                  PropTypeRow(t, n, selectedVariation),
                )}
              </tbody>
            </table>
          ) : null}
        </div>
      </section>

      {!singlePane ? (
        <div className="styleGuide-element">
          <h2 {...BEMClassName('variationsHeader')}>
            {selectedVariation ? 'Output' : 'Variations'}:
          </h2>
        </div>
      ) : null}

      {variations!.map(v =>
        Variation(v, component, !!selectedVariation || singlePane),
      )}
    </div>
  )
}
