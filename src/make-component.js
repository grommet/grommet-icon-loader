// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

export default function(resolve) {
  return `${resolve.copyright}

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '${resolve.context}components/FormattedMessage';

const CLASS_ROOT = "control-icon";

class Icon extends Component {

  render () {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-${resolve.fileName}'];
    if (this.props.size) {
      classes.push(CLASS_ROOT + \"--\" + this.props.size);
    } else if (this.props.large) {
      classes.push(CLASS_ROOT + \"--large\");
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

}

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  colorIndex: PropTypes.string,
  large: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Icon.defaultProps = {
  a11yTitleId: '" + resolve.fileName + "-title'
};

module.exports = Icon;
`;

};
