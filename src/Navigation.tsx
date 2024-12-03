import React from 'react'
import bemHelper from 'react-bem-helper'
import { componentPath as url } from './index'
import Link from './NavigationLink'
import { ComponentDefinition, ComponentGroup } from './types'
const BEMClassName = new bemHelper('styleGuideNav')

const Variations = (variations, parentSlug?: string) => {
  // if (variations.length < 2) return null
  return (
    <ul {...BEMClassName('variationsList')}>
      {variations.map((v) => {
        let to = v.slug
        if (v.variations) {
          to = v.variations[0].slug
        }
        return (
          <li key={v.slug} {...BEMClassName('list-item', 'sub')}>
            <Link
              to={url(to)}
              activeClassName="sg-active"
              {...BEMClassName('component', 'sub')}
            >
              {v.name}
            </Link>
            {v.variations && Variations(v.variations)}
          </li>
        )
      })}
    </ul>
  )
}

const isComponentGroup = (
  item: ComponentDefinition | ComponentGroup,
): item is ComponentGroup => {
  return Object.prototype.hasOwnProperty.call(item, 'children')
}

const ListItem: React.FC<{
  component: ComponentDefinition | ComponentGroup
  currentItem: string
}> = (props) => {
  const { slug, name } = props.component
  const isCurrentItem = props.currentItem.split('/')[0] === slug
  const [isExpanded, setIsExpanded] = React.useState(isCurrentItem)
  const shouldShowVariations = isCurrentItem || isExpanded

  const handleGroupToggle = React.useCallback(
    () =>
      setIsExpanded((current) => {
        return !current
      }),
    [],
  )

  if (isComponentGroup(props.component)) {
    return (
      <li key={slug} {...BEMClassName('list-item')}>
        <div {...BEMClassName('component')} onClick={handleGroupToggle}>
          {name}
        </div>

        {shouldShowVariations ? Variations(props.component.children) : null}
      </li>
    )
  } else {
    const { slug, name, variations, singlePane } = props.component
    return (
      <li key={slug} {...BEMClassName('list-item')}>
        <Link
          to={
            variations && variations.length === 1
              ? url(variations[0].slug)
              : url(slug)
          }
          activeClassName="sg-active"
          {...BEMClassName('component')}
        >
          {name}
        </Link>

        {shouldShowVariations && !singlePane
          ? Variations(variations, slug)
          : null}
      </li>
    )
  }
}

interface NavigationProps {
  components: (ComponentDefinition | ComponentGroup)[]
  path: string
  name: string
}

type TopLevelItems = Array<ComponentDefinition>

const Navigation = ({ components, name, path }: NavigationProps) => {
  const topLevel: TopLevelItems = []

  // components.forEach(c => {
  //   if (c.group) {
  //     if (groups[c.group]) {
  //       groups[c.group].items.push(c)
  //     } else {
  //       groups[c.group] = { name: c.group, items: [c] }
  //       topLevel.push(groups[c.group])
  //     }
  //   } else {
  //     topLevel.push(c)
  //   }
  // })

  return (
    <nav {...BEMClassName({ extra: 'styleGuide-element' })}>
      <Link to={url('')} {...BEMClassName('title')}>
        {name}
      </Link>

      <ul {...BEMClassName('list')}>
        {components.map((c) => (
          <ListItem component={c} currentItem={path} key={c.slug} />
        ))}
        {/* {topLevel.map((i: any) => {
          if (i.variations) {
            // A.K.A. is it a single one?
            return ListItem(i, current)
          } else if (i.children) {
            ;<li key={i.name} {...BEMClassName('list-item')}>
              {i.name}
            </li>
          } else {
            const firstItem = i.items[0]
            return (
              <li key={i.name} {...BEMClassName('list-item')}>
                <Link
                  to={
                    firstItem.variations.length === 1
                      ? url(
                          [firstItem.slug, firstItem.variations[0].slug].join(
                            '/',
                          ),
                        )
                      : url(firstItem.slug)
                  }
                  activeClassName="sg-active"
                  {...BEMClassName('component')}
                >
                  {i.name}
                </Link>
              </li>
            )
          }
        })} */}
      </ul>
    </nav>
  )
}

export default Navigation
