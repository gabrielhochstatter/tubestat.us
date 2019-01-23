const React = require('react');
const DefaultLayout = require('./layouts/DefaultLayout')
const Typed = require('typed.js')



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

class App extends React.Component {
  state = {
    element: <span />,
    typed: null,
    shouldShowContent: false
  };

  componentDidMount() {
    const options = {
      strings: ["curl tubestat.us ^1000"],
      typeSpeed: 35,
      showCursor: false,
      onComplete: this.handleEndOfTyping
    };
    const typed = new Typed("#xd", options);
  }

  handleEndOfTyping = () => {
    this.setState({ shouldShowContent: true })
  }

  render() {
    const header = 
    [
    `.███████████.█████..█████.███████████..██████████..█████████..███████████...█████████...███████████....█████..█████..█████████.`,
    `░█░░░███░░░█░░███..░░███.░░███░░░░░███░░███░░░░░█.███░░░░░███░█░░░███░░░█..███░░░░░███.░█░░░███░░░█...░░███..░░███..███░░░░░███`,
    `░...░███..░..░███...░███..░███....░███.░███..█.░.░███....░░░.░...░███..░..░███....░███.░...░███..░.....░███...░███.░███....░░░ `,
    `....░███.....░███...░███..░██████████..░██████...░░█████████.....░███.....░███████████.....░███........░███...░███.░░█████████.`,
    `....░███.....░███...░███..░███░░░░░███.░███░░█....░░░░░░░░███....░███.....░███░░░░░███.....░███........░███...░███..░░░░░░░░███`,
    `....░███.....░███...░███..░███....░███.░███.░...█.███....░███....░███.....░███....░███.....░███........░███...░███..███....░███`,
    `....█████....░░████████...███████████..██████████░░█████████.....█████....█████...█████....█████....██.░░████████..░░█████████ `,
    `....░░░░░......░░░░░░░░...░░░░░░░░░░░..░░░░░░░░░░..░░░░░░░░░.....░░░░░....░░░░░...░░░░░....░░░░░....░░...░░░░░░░░....░░░░░░░░░ `] 

    const headerLines = header.map(line => {
      return <div>{line}</div>
    })
    
    return (
      <div className="App">
        <p>
          $ <span id="xd" />
        </p>
        {this.state.shouldShowContent && <div className='header-ascii'>{headerLines}</div>}
      </div>
    );
  }
}

module.exports = App;