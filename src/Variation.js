import React from 'react';

const NotFound = () => (
  <div className="styleGuide-element styleGuide__panel" key="404">
    The variation you selected does not seem to exist :(
  </div>
);

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

export default function Variation(variation, Component, hideMeta) {
  if (!variation) return NotFound();

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
