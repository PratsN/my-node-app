function isUpper(str) {
  return /[A-Z]/.test(str);
}

function isLower(str) {
  return /[a-z]/.test(str);
}

module.exports = { isUpper, isLower };
