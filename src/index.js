import path from 'path';
import marked from 'marked';
import isPlainObject from 'lodash.isPlainObject';
import slug from 'slug';
import RouterLayout from './RouterLayout';
import ColorListComponent from './ColorList';
import TypeListComponent from './TypeList';
import Viewer from './Viewer';

export { RouterLayout };
export { Viewer };

const components = [];

let styleguideProps = {
  name: 'Your Easy Styleguide',
  propTypes: {}
}

const defaultVariations = [{
  name: 'Default',
  props: {}
}];

let timeout;
let componentWarnings = [];

function displayComponentWarnings() {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    if (!componentWarnings.length) return;
    console.warn(`The components ${componentWarnings.join(', ')} do not have a name or displayName, which might result components names becoming unrecognisable in minified/mangled production code.\nEither add a displayName to the component or pass the name to the register function.`);
    componentWarnings = [];
  }, 100);
}

function componentNameWarning(name) {
  componentWarnings.push(name);
}

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
  if (!userPropTypes || !styleguideProps.propTypes) return {};
  const proptypeList = Object.keys(styleguideProps.propTypes);

  return Object.keys(userPropTypes).reduce( (matches, key) => {
    const value = userPropTypes[key];
    let matchedProp;

    for (var i = 0; i < proptypeList.length; i++) {
      let propName = proptypeList[i];
      let reactPropType = styleguideProps.propTypes[propName];

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

export function init(context, props = {}) {
  Object.assign(styleguideProps, props);

  context.keys().forEach(context);
}

export function register(componentProps, readme, variations, defaultProps, Wrapper) {
  const component = isPlainObject(componentProps) ? componentProps : {
    Component: componentProps,
    propTypesComponent: componentProps
  };

  // Handle some common user errors
  component.propTypesComponent = component.propTypesComponent || component.Component;
  component.Component = component.Component || component.component;

  const realComponent = component.propTypesComponent;
  component.name =  component.name || realComponent.displayName || realComponent.name;

  if (component.name === realComponent.name) {
    componentNameWarning(component.name);
  }

  components.push({
    name: component.name,
    slug: slug(component.name),
    readme: marked(readme || ''),
    propTypes: matchPropTypes(realComponent.propTypes),
    variations: getVariations(variations, defaultProps),
    singlePane: !!component.Component.noStyleGuideVariations,
    Component: component.Component,
    Wrapper
  })
}

export const action = (message) => function() {
  console.log('[ACTION]', message, arguments)
};

export function list() {
  displayComponentWarnings();
  return components;
};

export function get(componentSlug, variation) {
  const component = components.find( c => c.slug === componentSlug);
  if (!component) return {};

  const variations = variation
          ? [component.variations.find( v => v.slug === variation)]
          : component.variations

  return { component, variations };
};

export function getName() {
  return styleguideProps.name;
}

export function ColorList(colors) {
  const Component = ColorListComponent.bind(null, colors);
  Component.displayName = "Colors";
  Component.noStyleGuideVariations = true;

  return Component;
}

export function TypeList(typeVariations) {
  const Component = TypeListComponent.bind(null, typeVariations);
  Component.displayName = "Typography";
  Component.noStyleGuideVariations = true;

  return Component;
}

export function componentPath(slug) {
  return path.join(
    '/',
    styleguideProps.path || '/styleguide',
    slug
  );
}
