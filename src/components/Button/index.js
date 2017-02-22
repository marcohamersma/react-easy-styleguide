import React from 'react';

function Button(props) {
  const classNames = ['btn', 'btn-' + props.type];

  if (props.size) classNames.push('btn-' + props.size);

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classNames.join(' ')}
    >
      {props.label}
    </button>
  )
}

Button.defaultProps = {
  type: 'default'
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  size: React.PropTypes.oneOf(['lg', 'sm', 'xs']),
  type: React.PropTypes.string
}

export default Button;
