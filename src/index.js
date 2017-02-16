import marked from 'marked';
import slug from 'slug';
import RouterLayout from './RouterLayout';
import ColorListComponent from './ColorList';
import TypeListComponent from './TypeList';
import Viewer from './Viewer';

export { RouterLayout as RouterLayout };
export { Viewer as Viewer };

let PropTypes;
const components = [];

const defaultVariations = [{
  name: 'Basic',
  props: {}
}];

function getVariations(variations, defaultProps) {
  const hasVariations = variations && variations.length;

  return (
    hasVariations ? variations : defaultVariations
  ).map( v => Object.assign({}, v, {
    props: Object.assign({}, defaultProps, v.props),
    description: marked(v.description || ''),
    slug: slug(v.name)
  }))
}

function matchPropTypes(userPropTypes) {
  if (!userPropTypes || !PropTypes) return {};
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

export function init(context, propTypes) {
  PropTypes = propTypes;
  context.keys().forEach(context);
}

export function register(Component, readme, variations, defaultProps, Wrapper) {
  const name = Component.displayName || Component.name;

  components.push({
    name: name,
    slug: slug(name),
    readme: marked(readme || ''),
    propTypes: matchPropTypes(Component.propTypes),
    variations: getVariations(variations, defaultProps),
    singlePane: !!Component.noStyleGuideVariations,
    Component, Wrapper
  })
}

export const action = (message) => function() {
  console.log('[ACTION]', message, arguments)
};

export function list() { return components };

export function get(componentSlug, variation) {
  const component = components.find( c => c.slug === componentSlug);
  if (!component) return {};

  const variations = variation
          ? [component.variations.find( v => v.slug === variation)]
          : component.variations

  return { component, variations };
};

export function ColorList(colors) {
  const Component = ColorListComponent.bind(null, colors);
  Component.displayName = "Colors",
  Component.noStyleGuideVariations = true;

  return Component;
}

export function TypeList(typeVariations) {
  const Component = TypeListComponent.bind(null, typeVariations);
  Component.displayName = "Typography",
  Component.noStyleGuideVariations = true;

  return Component;
}
