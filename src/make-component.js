// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import pascalCase from 'pascal-case';

export default function(resolve) {
  return `${resolve.copyright}

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from '${resolve.context}components/FormattedMessage';

const CLASS_ROOT = 'control-icon';

const Icon = props => {
  let { a11yTitle, a11yTitleId, className, colorIndex, large, size } = props;

  if (!size && large) {
    size = 'large';
  }

  let classes = classnames(
    CLASS_ROOT,
    \`\${CLASS_ROOT}-${resolve.fileName}\`,
    className,
    {
      [\`\${CLASS_ROOT}--\${size}\`]: size,
      [\`color-index-\${colorIndex}\`]: colorIndex
    }
  );

  let titleLabel = a11yTitle || '${resolve.fileName}';
  a11yTitle = <FormattedMessage id={titleLabel} defaultMessage={titleLabel} />;

  return ${resolve.svg};
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

export default Icon;
`;

};
