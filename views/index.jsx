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
          return `#808080`
      case 'Piccadilly':
          return `#003688`
      case 'Victoria':
          return `#0098D4`
      case 'Waterloo & City':
          return `#95CDBA`
      default:
          return `#FFFFFF`
  }
}

const colorByStatusSeverity = (statusSeverity) => {
  if (statusSeverity < 9) {
    return '#FF0000'
  } else if (statusSeverity === 9) {
    return '#FFFF00'
  } else if (statusSeverity === 10 ) {
    return '#32CD32'
  }
}

class HomePage extends React.Component {
  render() {
    const time = new Date().toLocaleTimeString()
    const date = new Date().toDateString()
    return (
      <DefaultLayout>
        <div style={{ paddingLeft: '20px' }}>
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
          <table style={{
            borderCollapse: 'collapse',
            border: '1px solid white',
            textAlign: 'left'
          }}>
            <tr style={{ border: '1px solid white' }}>
              <th style={{ border: '1px solid white', padding: '10px' }}>Line</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Status</th>
            </tr>
            {this.props.list.map(line => {
              const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
              return (
                <tr key={line.name}>
                  <td style={{
                    color: colorLineName(line.name),
                    border: '1px solid white',
                    padding: '10px'
                  }}>
                    {line.name}
                  </td>
                  <td style={{
                    color: colorByStatusSeverity(line.lineStatuses[0].statusSeverity),
                    border: '1px solid white',
                    padding: '10px'
                  }}>
                    {statusDescriptionMessage}
                  </td>
                </tr>
              )
            })}
          </table>
          <p>
            <a href='https://github.com/gabrielhochstatter/tubestat.us' style={{color: '#555555'}}>GitHub</a>
            <span>{' '}</span>
            <a href='http://gabrielhochstatter.com' style={{color: '#555555'}}>GabrielHochstatter.com</a>
          </p>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = HomePage;