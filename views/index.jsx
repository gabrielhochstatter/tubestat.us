var React = require('react');

class HomePage extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1>
          {this.props.header}
        </h1>
        <ul>
          {this.props.list.map(line => {
            const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
            return <li>{line.name}: {statusDescriptionMessage}</li>
          })}
        </ul>
      </div>
    );
  }
}

module.exports = HomePage;