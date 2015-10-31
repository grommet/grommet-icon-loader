// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import builder from 'xmlbuilder';

let xmldec = {
  version: '1.0',
  standalone: true,
  encoding: 'UTF-8'
};

let svgAttributes = {
  version: "1.1",
  viewBox: "0 0 48 48",
  width: "48px",
  height: "48px",
  className: "{classes.join(' ')}"
};

function traverse(tags, root) {
  for(var i in tags) {
    let item = root.ele(tags[i]['#name'], tags[i]['$']);
    if (tags[i].$$) traverse(tags[i].$$, item);
  }
}

export default function(json, fileName, copyright, context) {

  if (json.svg.$.viewBox) {
    svgAttributes.viewBox = json.svg.$.viewBox;
  }

  svgAttributes['aria-labelledby'] = '{this.props.a11yTitleId}';

  var root = builder.create('svg', xmldec, null, {
    headless: true
  });

  Object.keys(svgAttributes).map(function(at) {
    root.att(at, svgAttributes[at]);
  });

  root.ele('title', {
    id: '{this.props.a11yTitleId}'
  }, '{a11yTitle}');

  // for (var i in json.svg.$) root.att(i, json.svg.$[i]);
  traverse(json.svg.$$, root);

  return {
    svg: root.end().replace(/"{/g, '{').replace(/}"/g, '}'),
    fileName: fileName,
    copyright: copyright ? '// ' + copyright : '',
    context: context || 'grommet/'
  };
}
