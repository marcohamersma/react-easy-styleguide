const React = require('react');

let LinkComponent = props => {
  return (
    <a
      href={props.to}
      className={props.className}
      children={props.children}
    />
  )
};

export default props => LinkComponent(props);
