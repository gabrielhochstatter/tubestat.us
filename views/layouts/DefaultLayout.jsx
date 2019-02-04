const React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>tubestat.us</title>
        </head>
        <body style={{ fontFamily: 'courier', color: 'black', backgroundColor: 'white' }}>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;