/* eslint react/prop-types:0 */
const React = require('react');

let LinkComponent = props => {
  let className = props.className || '';
  let styles;

  if (props.to === window.location.pathname) {
    className += ' ' + props.activeClassName;
    styles = props.activeStyles;

  }

  return (
    <a
      href={props.to}
      className={className}
      style={styles}
    >{props.children}</a>
  )
};

const LinkWrapper = props => <LinkComponent {...props} />;
LinkWrapper.displayName = "StyleguideLinkWrapper";

export const setRouter = routerLink => {
  console.log('setting router');
  LinkComponent = routerLink;
}

export default LinkWrapper
