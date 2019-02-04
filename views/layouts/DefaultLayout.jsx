const React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>tubestat.us</title>
        </head>
        <body style={{ fontFamily: 'courier', color: 'white', backgroundColor: 'black' }}>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;