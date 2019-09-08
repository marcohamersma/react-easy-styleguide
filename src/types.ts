export interface ComponentDefinition {
  Component: React.ReactElement
  Wrapper?: React.ReactElement
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

export interface VariationInfo {
  description?: string
  name: string
  props: ComponentProps
  slug: string
}

export interface ComponentToShow {
  variation: string
  component: string
}
