import React from 'react';

function Table(props) {
  const classNames = ['table'];

  if (props.striped) classNames.push('table-striped')
  if (props.bordered) classNames.push('table-bordered')

  return (
    <table className={classNames.join(' ')}>
      { props.caption
        ? <caption>{props.caption}</caption>
        : null
      }

      { props.thead
        ? ( <thead>
            <tr>
              { props.thead.map( (h,i) => <th key={i}>{h}</th> )}
            </tr>
          </thead>
          ) : null
      }

      <tbody>
        { props.data.map( (r, ri) => (
          <tr key={ri}>
            { r.map( (c, ci) => <td key={ci}>{c}</td> ) }
          </tr>
        ))}
      </tbody>
  </table>
  )
}

Table.propTypes = {
  caption: React.PropTypes.string,
  thead: React.PropTypes.arrayOf(React.PropTypes.string),
  striped: React.PropTypes.bool,
  data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired
}

export default Table;
