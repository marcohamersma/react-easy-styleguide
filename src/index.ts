import path from 'path'
import marked from 'marked'
import isPlainObject from 'lodash/isPlainObject'
import slug from 'slug'
import { Layout, RouterLayout } from './Layout'
import { ColorList as ColorListComponent } from './ColorList'
import { TypeList as TypeListComponent } from './TypeList'
import { Viewer } from './Viewer'
import { setRouter as linkSetRouter } from './NavigationLink'
import {
  ComponentDefinition,
  VariationInfo,
  ComponentProps,
  VariationDefinition,
  WrapperProp,
} from './types'

export { Layout }
export { Viewer }

const components: ComponentDefinition[] = []

interface InitProps {
  /** Title shown in the UI */
  name: string
  /**
   * Passing `ReactRouter.NavLink` will use those React Router for navigating
   * between components
   */
  routerLink?: any
  /**
   * Pass through your application's version of the `prop-types` package.
   * This allows for the (limited) detection of PropTypes for your components.
   */
  propTypes?: any
  /**
   * Define at what path in the URL the styleguide will be mounted, defaults to
   * `/styleguide/`
   */
  path?: string
}

let styleguideProps: InitProps = {
  name: 'Your Easy Styleguide',
  propTypes: {},
}

const defaultVariations: VariationInfo[] = [
  {
    name: 'Default',
    slug: 'default',
    props: {},
  },
]

let timeout
let componentWarnings: string[] = []

function displayComponentWarnings() {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    if (!componentWarnings.length) return
    console.warn(
      `The components ${componentWarnings.join(
        ', ',
      )} do not have a name or displayName, which might result components names becoming unrecognisable in minified/mangled production code.\nEither add a displayName to the component or pass the name to the register function.`,
    )
    componentWarnings = []
  }, 100)
}

function componentNameWarning(name) {
  componentWarnings.push(name)
}

function getVariations(
  variations?: VariationDefinition[],
  defaultProps?: ComponentProps | null,
): VariationInfo[] {
  return (typeof variations !== 'undefined' && variations.length > 0
    ? variations
    : defaultVariations
  ).map(v =>
    Object.assign({}, v, {
      props: Object.assign({}, defaultProps || {}, v.props),
      description: marked(v.description || ''),
      slug: slug(v.name),
    }),
  )
}

function matchPropTypes(component) {
  const userPropTypes = component.propTypes
  const defaultProps = component.getDefaultProps
    ? component.getDefaultProps()
    : {}

  if (!userPropTypes || !styleguideProps.propTypes) return {}
  const proptypeList = Object.keys(styleguideProps.propTypes)

  return Object.keys(userPropTypes).reduce((matches, key) => {
    const value = userPropTypes[key]
    let matchedProp

    for (var i = 0; i < proptypeList.length; i++) {
      let propName = proptypeList[i]
      let reactPropType = styleguideProps.propTypes[propName]

      if (reactPropType === value) {
        matchedProp = { name: propName }
        break
      } else if (reactPropType.isRequired === value) {
        matchedProp = { name: propName, isRequired: true }
        break
      }
    }

    matches[key] = matchedProp || { name: 'unknown' }
    matches[key].defaultValue = defaultProps[key]
      ? JSON.stringify(defaultProps[key])
      : undefined

    return matches
  }, {})
}

export function init(context, props: InitProps = styleguideProps) {
  Object.assign(styleguideProps, props)

  context.keys().forEach(context)
  if (props.routerLink) linkSetRouter(props.routerLink)
}

export function create(context, props: InitProps): unknown {
  init(context, props)
  return props.routerLink ? RouterLayout : Layout
}

interface ComponentRegisterProps {
  name?: string
  Component: React.ComponentType
  propTypesComponent?: React.ComponentType
  component?: React.ComponentType
}

/** Registers a component for use in the styleguide */
export function register<C = React.ComponentType>(
  /** The React Class to add to the styleguide, or an object defining it */
  componentProps: React.ComponentType | ComponentRegisterProps,
  /** Description to show on this component's page */
  readme: string | null | undefined,
  /**
   * An array of different variations of this component and each of their props
   */
  variations?: VariationDefinition<C>[],
  /**
   * Default props for each variation (will be merged with each variation's
   * props)
   */
  defaultProps?: ComponentProps | null,
  /**
   * Sometimes you might want to wrap a styleguide component in another
   * component to make sure the dataflow is correct (for example with
   * redux providers). You can pass a React Component or a function
   * here that takes a `Component` and `componentProps`:
   */
  Wrapper?: WrapperProp,
) {
  const component = (isPlainObject(componentProps)
    ? componentProps
    : {
        Component: componentProps,
        propTypesComponent: componentProps,
      }) as ComponentRegisterProps

  // Handle some common user errors
  component.propTypesComponent =
    component.propTypesComponent || component.Component
  component.Component = component.Component || component.component

  const realComponent = component.propTypesComponent as any
  component.name =
    component.name || realComponent.displayName || realComponent.name

  if (component.name === realComponent.name) {
    componentNameWarning(component.name)
  }

  components.push({
    name: component.name!,
    slug: slug(component.name),
    readme: marked(readme || ''),
    propTypes: matchPropTypes(realComponent),
    variations: getVariations(variations, defaultProps),
    singlePane: (!!component.Component as any).noStyleGuideVariations,
    Component: component.Component,
    Wrapper,
  })
}

export const action = message =>
  function(...args) {
    console.log('[ACTION]', message, args)
  }

export function list() {
  displayComponentWarnings()
  return components
}

export function get(componentSlug: string, variation: string) {
  const component = components.find(c => c.slug === componentSlug)
  if (!component) return {}

  const variations = variation
    ? [component.variations.find(v => v.slug === variation)!]
    : component.variations

  return { component, variations }
}

export function getName() {
  return styleguideProps.name
}

export function ColorList(colors) {
  const Component = ColorListComponent.bind(null, colors) as any
  Component.displayName = 'Colors'
  Component.noStyleGuideVariations = true

  return Component
}

export function TypeList(typeVariations) {
  const Component = TypeListComponent.bind(null, typeVariations) as any
  Component.displayName = 'Typography'
  Component.noStyleGuideVariations = true

  return Component
}

export function componentPath(slug) {
  return path.join('/', styleguideProps.path || '/styleguide', slug)
}
