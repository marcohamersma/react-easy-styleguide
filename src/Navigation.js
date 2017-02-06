import React from 'react';
import { Link, withRouter } from 'react-router';
const url = path => '/styleguide/' + path;

const Navigation = ({ components, name, params }) => (
  <nav className="styleguide__navigation">
    <div className="styleguide__title">
      <Link to={url('')}>{name}</Link>
    </div>
    <ul>
      { components.map( c => (
        <li key={c.slug}>
          <Link to={url(c.slug)}>{c.name}</Link>
          {
            params.component === c.slug
            ? (
                <ul>
                  { c.variations.map(v => (
                    <li key={v.slug}>
                      <Link to={ url(c.slug + '/' + v.slug)} >
                        {v.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            : null
          }
        </li>
      ))}
    </ul>
  </nav>
);

export default withRouter(Navigation);
