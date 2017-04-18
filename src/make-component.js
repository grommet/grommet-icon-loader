// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import pascalCase from 'pascal-case';

export default function(resolve) {
  return `${resolve.copyright}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '${resolve.context}utils/CSSClassnames';
import Intl from '${resolve.context}utils/Intl';
import Props from '${resolve.context}utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

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

    a11yTitle = a11yTitle || Intl.getMessage(intl, '${resolve.fileName}');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return ${resolve.svg};
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = '${pascalCase(resolve.fileName)}';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

`;

};
