// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// run other tests
import './deep-filter';

// test for index.js
import test from 'tape';
import sinon from 'sinon';
import loader from '../src/index';

// I don't know why,
// but babel must be require-d
var babel = require('babel');

let svgSourceBasic = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="XMLID_313_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<g id="add">
	<rect id="_x2E_svg_1_" x="0" fill="none" width="24" height="24"/>
	<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M0,12h24 M12,24V0"/>
</g>
</svg>
`;

let svgTargetBasic = `
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from 'grommet/components/FormattedMessage';

const CLASS_ROOT = "control-icon";

class Icon extends Component {

  render () {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-add'];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    } else if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ?
      this.props.a11yTitle : "add";
    var a11yTitle = (
      <FormattedMessage id={titleLabel} defaultMessage={titleLabel} />
    );

    return (
      <svg version="1.1" viewBox="0 0 24 24" width="24px" height="24px" className={classes.join(' ')} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="add"><rect id="_x2E_svg_1_" x="0" fill="none" width="24" height="24"/><path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M0,12h24 M12,24V0"/></g></svg>
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

test('test basic loader output', function(t) {
  t.plan(6);
  let loaderContext = {
    query: '?copyright=(C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP',
    cacheable: sinon.spy(),
    addDependency: sinon.spy(),
    resourcePath: '/fake/path/add.svg',
    async: function() {
      return function(err, result) {
        t.ok(err === null, 'no compilation errors occurred');
        t.ok(result, 'result exists');
        t.equal(result.replace(/\n|\s/g, ''), svgTargetBasic.replace(/\n|\s/g, ''));
        let res = babel.transform(result);
        t.ok(typeof res === 'object', 'babel transformation test');
      };
    }
  };
  loader.apply(loaderContext, [svgSourceBasic]);
  t.ok(loaderContext.addDependency.called, 'loader adds dependency');
  t.ok(loaderContext.cacheable.called, 'loader cached');
});
