// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import pascalCase from 'pascal-case';

export default function(resolve) {
  return `${resolve.copyright}

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from '${resolve.context}components/FormattedMessage';

const CLASS_ROOT = 'control-icon';

export default class Icon extends Component {
  render () {
    const { a11yTitleId, className, colorIndex, large } = this.props;
    let { a11yTitle, size } = this.props;

    if (!size && large) {
      size = 'large';
    }

    const classes = classnames(
      CLASS_ROOT,
      \`\${CLASS_ROOT}-${resolve.fileName}\`,
      className,
      {
        [\`\${CLASS_ROOT}--\${size}\`]: size,
        [\`color-index-\${colorIndex}\`]: colorIndex
      }
    );

    a11yTitle = a11yTitle ||
      <FormattedMessage id="${resolve.fileName}" defaultMessage="${resolve.fileName}" />;

    return ${resolve.svg};
  }
};

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  colorIndex: PropTypes.string,
  large: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: '${resolve.fileName}-title'
};

Icon.icon = true;

Icon.displayName = '${pascalCase(resolve.fileName)}';

`;

};
