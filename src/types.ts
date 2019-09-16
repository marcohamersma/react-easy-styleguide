export interface WrapperElementProps {
  /** The Component class that should be rendered for this variation */
  Component: React.ComponentClass | React.FunctionComponent
  /**
   * The props that should be passed to the Component in order to properly
   * display this variation
   */
  componentProps: ComponentProps
}

export type WrapperElementFactory = (
  props: WrapperElementProps,
) => React.ReactElement

export type WrapperProp =
  | React.ReactElement<WrapperElementProps>
  | WrapperElementFactory

export interface ComponentDefinition {
  Component: React.ReactElement<WrapperElementProps>
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
export interface VariationDefinition {
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
