// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

export function hyphenToCamel(name) {
  return name.replace(/-([a-z])/g, g => g[1].toUpperCase());
}
