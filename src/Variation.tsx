import React from 'react'
import { ComponentDefinition, VariationInfo } from './types'

const NotFound = () => (
  <div className="styleGuide-element styleGuide__panel" key="404">
    The variation you selected does not seem to exist :(
  </div>
)

const wrappedComponent = (component) => (childProps) => (
  <component.Wrapper
    Component={component.Component}
    componentProps={childProps}
  />
)

function MetaWrapper(variation, component) {
  const { name, description } = variation

  return (
    <div>
      <div className="styleGuide-element">
        <h3>{name}</h3>
        <div
          className="styleGuideViewer__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="styleGuideViewer__item-container">{component}</div>
    </div>
  )
}

interface Props {
  variation: VariationInfo
  component: ComponentDefinition
  hideMeta: boolean
}

interface State {
  hasError: boolean
}

export class Variation extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (!this.props.variation) return NotFound()
    const { component, variation, hideMeta } = this.props

    let Component: any = component.Wrapper
      ? wrappedComponent(component)
      : component.Component

    const { name, description, props } = variation
    return (
      <div key={name} className="styleGuide__panel">
        {this.state.hasError ? (
          MetaWrapper(
            variation,
            <div
              className="styleGuide-element"
              style={{ padding: 20, textAlign: 'center' }}
            >
              ❗️
              <strong style={{ opacity: 0.5 }}>
                <br />
                An error occurred within this component.
                <br />
                Check the developer console for more information.
              </strong>
            </div>,
          )
        ) : variation.Component ? (
          React.createElement(
            component.Wrapper ? (
              <component.Wrapper
                Component={variation.Component}
                componentProps={variation.props}
              >
                {<variation.Component />}
              </component.Wrapper>
            ) : (
              (variation.Component as any)
            ),
            props,
          )
        ) : this.props.hideMeta ? (
          <Component {...props} />
        ) : (
          MetaWrapper(variation, <Component {...props} />)
        )}
      </div>
    )
  }
}
