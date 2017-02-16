import React from 'react';

const NotFound = () => (
  <div className="styleGuide-element styleGuide__panel" key="404">
    The variation you selected does not seem to exist :(
  </div>
);

const wrappedComponent = component => childProps => (
  <component.Wrapper Component={component.Component} componentProps={childProps} />
)

function MetaWrapper(variation, component) {
  const { name, description } = variation;

  return (
    <div>
      <div className="styleGuide-element">
        <h3>{name}</h3>
        <div
          className="styleGuideViewer__description"
          dangerouslySetInnerHTML={{__html: description}}
        />
      </div>

      <div className="styleGuideViewer__item-container">
        { component }
      </div>
    </div>
  );
}

export default function Variation(variation, component, hideMeta) {
  if (!variation) return NotFound();

  let Component = component.Wrapper
                    ? wrappedComponent(component)
                    : component.Component;

  const { name, description, props } = variation;
  return (
    <div key={name} className="styleGuide__panel">
      { hideMeta
        ? <Component {...props} />
        : MetaWrapper(variation, <Component {...props} />)
      }
    </div>
  );
}
