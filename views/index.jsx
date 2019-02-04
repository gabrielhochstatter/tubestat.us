const React = require('react');
const DefaultLayout = require('./layouts/DefaultLayout')

const colorLineName = (lineName) => {
  switch (lineName) {
      case 'Bakerloo':
          return `#B36305`
      case 'Central':
          return `#E32017`
      case 'Circle':
          return `#FFD300`
      case 'District':
          return `#00782A`
      case 'DLR':
          return `#00A4A7`
      case 'Hammersmith & City':
          return `#F3A9BB`
      case 'Jubilee':
          return `#A0A5A9`
      case 'London Overground':
          return `#EE7C0E`
      case 'Metropolitan':
          return `#9B0056`
      case 'Northern':
          return `#000000`
      case 'Piccadilly':
          return `#003688`
      case 'Victoria':
          return `#0098D4`
      case 'Waterloo & City':
          return `#95CDBA`
      default:
          return `#000000`
  }
}

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
              return (
                <p key={line.name}>
                  <span style={{color: colorLineName(line.name)}}>
                    {line.name}
                  </span>: {statusDescriptionMessage}
                </p>
              )
            })}
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = HomePage;