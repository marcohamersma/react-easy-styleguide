import React from 'react';

const NotFound = () => (
  <div className="styleGuide__panel" key="404">
    The variation you selected does not seem to exist :(
  </div>
);

export default function Variation(variation, Component, hideMeta) {
  if (!variation) return NotFound();

  const { name, description, props } = variation;
  return (
    <div key={name} className="styleGuide__panel">
      { !hideMeta
        ? (
          <div>
            <h3>{name}</h3>
            <div
              className="styleGuideViewer__description"
              dangerouslySetInnerHTML={{__html: description}}
            />
          </div>
        ) : null
      }

      <div className="styleGuideViewer__item-container">
        <Component {...props} />
      </div>
    </div>
  );
}
