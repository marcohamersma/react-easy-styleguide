import React from 'react';

export default function Variation({ name, description, props }, Component) {
  return (
    <div key={name} className="n-vspacing-small">
      <h4>{name}</h4>
      <div dangerouslySetInnerHTML={{__html: description}} />
      <Component {...props} />
    </div>
  );
}
