import React, {Component, PropTypes} from 'react';

export default class Table extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            {this.props.columns.map(column =>
              <th key={column.key}>{column.title}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((tableRow, key) =>
            <tr key={key}>
              {this.props.columns.map((column, index) =>
                <td key={index}>{tableRow[column.key]}</td>
              )}
            </tr>
          )}
        </tbody>
    </table>
    )
  }

}
