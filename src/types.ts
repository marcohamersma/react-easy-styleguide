/** @prettier */

export interface ComponentDefinition {
  Component: React.ReactElement
  Wrapper?: React.ReactElement
  name: string
  propTypes: Partial<React.ReactPropTypes>
  readme: string
  singlePane: boolean
  slug: string
  variations: Variation[]
}

export interface ComponentProps {
  [propName: string]: unknown
}

export interface Variation {
  description?: string
  name: string
  props: ComponentProps
  slug: string
}

export interface ComponentToShow {
  variation: string
  component: string
}
