import React from 'react';
import { Link, withRouter } from 'react-router';
import bemHelper from 'react-bem-helper';

const BEMClassName = new bemHelper('styleGuideNav');
const url = path => '/styleguide/' + path;

const Variations = (variations, parentSlug) => {
  if (!variations.length) return null;
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

const ListItem = ({ slug, name, variations}, currentItem) => (
  <li key={slug} {...BEMClassName('list-item')}>
    <Link
      to={url(slug)}
      activeClassName="sg-active"
      {...BEMClassName('component')}
    >{name}</Link>

    { currentItem === slug ? Variations(variations, slug) : null }
  </li>
)

const Navigation = ({ components, name, params }) => (
  <nav {...BEMClassName()}>
    <Link to={url('')} {...BEMClassName('title')}>{name}</Link>

    <ul {...BEMClassName('list')}>
      { components.map( c => ListItem(c, params.component)) }
    </ul>
  </nav>
);

export default withRouter(Navigation);
