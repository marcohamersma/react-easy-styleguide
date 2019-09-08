import React from 'react'
import * as styleGuide from './index'
import bemHelper from 'react-bem-helper'
import './styles/styles.scss'
import Navigation from './Navigation'
import { Viewer } from './Viewer'
import PropTypes from 'prop-types'
import { ComponentToShow } from './types'

const BEMClassName = new bemHelper('styleGuide')

interface ReactRouterProps {
  match: {
    params: ComponentToShow
  }
}
interface ReactRouterProps2 {
  params: ComponentToShow
}

/**
 * This is quite unclear at the moment, sorry. I need to fix this when
 * I update to support the newest react-router
 */
type LayoutProps = ComponentToShow | ReactRouterProps | ReactRouterProps2

const isReactRouterProps = (props: LayoutProps): props is ReactRouterProps =>
  props.hasOwnProperty('match')
const isReactRouterProps2 = (props: LayoutProps): props is ReactRouterProps2 =>
  props.hasOwnProperty('params')

export const Layout = (layoutProps: LayoutProps) => {
  const components = styleGuide.list()

  // If we're being passed a `match` prop from react-router, use that
  // to select the component + prop variables
  let props = layoutProps
  if (isReactRouterProps(layoutProps)) props = layoutProps.match.params
  if (isReactRouterProps2(layoutProps)) props = layoutProps.params

  const { variation, component } = props as ComponentToShow

  const name = styleGuide.getName()

  return (
    <div {...BEMClassName()}>
      <Navigation components={components} name={name} current={component} />
      <div {...BEMClassName('contents')}>
        {!components.length ? (
          <div {...BEMClassName('panel')}>
            Install successfull, now go add some <code>component.info.js</code>{' '}
            files
          </div>
        ) : (
          <Viewer component={component} variation={variation} />
        )}
      </div>
    </div>
  )
}

Layout.propTypes = {
  variation: PropTypes.string,
  component: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  params: PropTypes.object,
}
