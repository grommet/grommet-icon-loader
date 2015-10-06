export default function(resolve) {
  return `${resolve.copyright}

var React = require('react');
var IntlMixin = require('${resolve.context}mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: '${resolve.fileName}-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-${resolve.fileName}';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "${resolve.fileName}");

    return (
      ${resolve.svg}
    );
  }

});

module.exports = Icon;
`;

};
