import React from 'react';

export default function Variation({ name, description, props }, Component) {
  return (
    <div key={name} className="styleGuide__panel">
      <h3>{name}</h3>
      <div
        className="styleGuideViewer__description"
        dangerouslySetInnerHTML={{__html: description}}
      />

      <div className="styleGuideViewer__item-container">
        <Component {...props} />
      </div>
    </div>
  );
}
