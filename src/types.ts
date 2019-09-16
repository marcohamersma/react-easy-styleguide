export interface WrapperElementProps {
  /** The Component class that should be rendered for this variation */
  Component: React.ComponentType
  /**
   * The props that should be passed to the Component in order to properly
   * display this variation
   */
  componentProps: ComponentProps
}

export type WrapperProp = React.ElementType<WrapperElementProps>

export interface ComponentDefinition {
  Component: React.ComponentType
  Wrapper?: WrapperProp
  name: string
  propTypes: Partial<React.ReactPropTypes>
  readme: string
  singlePane: boolean
  slug: string
  variations: VariationInfo[]
}

export interface ComponentProps {
  [propName: string]: unknown
}

/** The settings for this particular variation of the component */
export interface VariationDefinition<P = React.ComponentType> {
  name: string
  description?: string
  props?: ComponentProps
}
export interface VariationInfo extends VariationDefinition {
  slug: string
  props: ComponentProps
}

export interface ComponentToShow {
  variation: string
  component: string
}
