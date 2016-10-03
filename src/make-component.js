// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import pascalCase from 'pascal-case';

export default function(resolve) {
  return `${resolve.copyright}

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from '${resolve.context}components/FormattedMessage';
import CSSClassnames from '${resolve.context}utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      \`\${CLASS_ROOT}-${resolve.fileName}\`,
      className,
      {
        [\`\${CLASS_ROOT}--\${size}\`]: size,
        [\`\${CLASS_ROOT}--responsive\`]: responsive,
        [\`\${COLOR_INDEX}-\${colorIndex}\`]: colorIndex
      }
    );

    a11yTitle = a11yTitle ||
      <FormattedMessage id="${resolve.fileName}" defaultMessage="${resolve.fileName}" />;

    return ${resolve.svg};
  }
};

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

Icon.defaultProps = {
  responsive: true
};

Icon.icon = true;

Icon.displayName = '${pascalCase(resolve.fileName)}';

`;

};
