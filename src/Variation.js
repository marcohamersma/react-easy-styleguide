import React from 'react';

export default function Variation({ name, description, props }, Component, hideMeta) {
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
