import marked from 'marked';
import { PropTypes } from 'react';
import List from './List';

export { List as List };

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
    description: marked(v.description || '')
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
      } else {
        matchedProp = 'unknown';
      }
    }

    matches[key] = matchedProp;

    return matches;
  }, {});
}

export function init(context) {
  context.keys().forEach(context);
}

export function register(component, readme, variations) {
  components.push({
    name: component.displayName || component.name,
    readme: marked(readme),
    propTypes: matchPropTypes(component.propTypes),
    variations: getVariations(variations),
    Component: component,
  })
}

export const action = (message) => function() {
  console.log('[ACTION]', message, arguments)
};

export function get() { return components };
