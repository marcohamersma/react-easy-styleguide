import React from 'react';
import bemHelper from 'react-bem-helper';
import { componentPath as url } from './index';
import Link from './NavigationLink';

const BEMClassName = new bemHelper('styleGuideNav');

const Variations = (variations, parentSlug) => {
  if (variations.length < 2) return null;
  return (
    <ul {...BEMClassName('variationsList')}>
      { variations.map(v => (
        <li key={v.slug} {...BEMClassName('list-item', 'sub')}>
          <Link
            to={ url(parentSlug + '/' + v.slug)}
            activeClassName="sg-active"
            {...BEMClassName('component', 'sub')}
          >
            {v.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const ListItem = ({ slug, name, variations, singlePane }, currentItem) => (
  <li key={slug} {...BEMClassName('list-item')}>
    <Link
      to={variations.length === 1 ? url([slug, variations[0].slug].join('/')) : url(slug)}
      activeClassName="sg-active"
      {...BEMClassName('component')}
    >{name}</Link>

    {
      currentItem === slug && !singlePane
      ? Variations(variations, slug)
      : null
    }
  </li>
)

const Navigation = ({ components, name, current }) => (
  <nav {...BEMClassName({ extra: 'styleGuide-element' })}>
    <Link to={url('')} {...BEMClassName('title')}>{name}</Link>

    <ul {...BEMClassName('list')}>
      { components.map( c => ListItem(c, current)) }
    </ul>
  </nav>
);

export default Navigation;
