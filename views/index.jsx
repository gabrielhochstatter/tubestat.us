const React = require('react');
const DefaultLayout = require('./layouts/DefaultLayout')

class HomePage extends React.Component {
  render() {
    const time = new Date().toLocaleTimeString()
    const date = new Date().toDateString()
    return (
      <DefaultLayout>
        <div>
          <p>
            <pre>
              {this.props.bigHeader}
            </pre>
          </p>
          <p>
            <strong>
              Line status @ {time} on {date}
            </strong>
          </p>
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