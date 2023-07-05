const { override, useBabelRc } = require("customize-cra");
const path = require("path");

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
