const React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>tubestat.us</title>
        </head>
        <body style={{ fontFamily: 'courier', color: 'white', backgroundColor: '#222222' }}>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;