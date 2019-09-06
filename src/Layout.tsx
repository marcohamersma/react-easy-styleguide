/** @prettier */
import React from 'react'
import * as styleGuide from './index'
import bemHelper from 'react-bem-helper'
import './styles/styles.scss'
import Navigation from './Navigation'
import Viewer from './Viewer'
import PropTypes from 'prop-types'

const BEMClassName = new bemHelper('styleGuide')

const Layout = layoutProps => {
  const components = styleGuide.list()

  // If we're being passed a `match` prop from react-router, use that
  // to select the component + prop variables
  let props = layoutProps
  if (layoutProps.match) props = layoutProps.match.params
  if (layoutProps.params) props = layoutProps.params
  const { variation, component } = props

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

export default Layout
