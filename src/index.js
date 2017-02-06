import marked from 'marked';
import slug from 'slug';
import { PropTypes } from 'react';
import RouterLayout from './RouterLayout';
import Viewer from './Viewer';

export { RouterLayout as RouterLayout };
export { Viewer as Viewer };

const components = [];

const defaultVariations = [{
  name: 'Basic',
  props: {}
}];

function getVariations(variations) {
  const hasVariations = variations && variations.length;

  return (
    hasVariations ? variations : defaultVariations
  ).map( v => Object.assign({}, v, {
    description: marked(v.description || ''),
    slug: slug(v.name)
  }))
}

function matchPropTypes(userPropTypes) {
  if (!userPropTypes) return {};
  const proptypeList = Object.keys(PropTypes);

  return Object.keys(userPropTypes).reduce( (matches, key) => {
    const value = userPropTypes[key];
    let matchedProp;

    for (var i = 0; i < proptypeList.length; i++) {
      let propName = proptypeList[i];
      let reactPropType = PropTypes[propName];

      if (reactPropType === value) {
        matchedProp = { name: propName };
        break;
      } else if (reactPropType.isRequired === value) {
        matchedProp = { name: propName, isRequired: true };
        break;
      }
    }

    matches[key] = matchedProp || { name: 'unknown' };

    return matches;
  }, {});
}

export function init(context) {
  context.keys().forEach(context);
}

export function register(component, readme, variations) {
  const name = component.displayName || component.name;

  components.push({
    name: name,
    slug: slug(name),
    readme: marked(readme),
    propTypes: matchPropTypes(component.propTypes),
    variations: getVariations(variations),
    Component: component,
  })
}

export const action = (message) => function() {
  console.log('[ACTION]', message, arguments)
};

export function list() { return components };

export function get(componentSlug, variation) {
  const component = components.find( c => c.slug === componentSlug);
  const variations = variation
          ? component.variations.find( v => v.slug === variation)
          : component.variations

  return { component, variations };
};
