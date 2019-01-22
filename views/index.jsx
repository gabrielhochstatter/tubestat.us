const React = require('react');
const DefaultLayout = require('./layouts/DefaultLayout')

class HomePage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div>
          <h1>
            {this.props.header}
          </h1>
          <div>
            {this.props.list.map(line => {
              const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
              return <p key={line.name}>{line.name}: {statusDescriptionMessage}</p>
            })}
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = HomePage;