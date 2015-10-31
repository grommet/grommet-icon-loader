// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

export default function(resolve) {
  return `${resolve.copyright}

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = require('${resolve.context}components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      a11yTitleId: '${resolve.fileName}-title'
    };
  },

  render: function() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-${resolve.fileName}'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ?
      this.props.a11yTitle : "${resolve.fileName}";
    var a11yTitle = (
      <FormattedMessage id={titleLabel} defaultMessage={titleLabel} />
    );

    return (
      ${resolve.svg}
    );
  }

});

module.exports = Icon;
`;

};
