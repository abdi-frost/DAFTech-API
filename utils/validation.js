// utils/validation.js
function validateEmail(email) {
    // Implement email validation logic
  }
  
  function isMissingField(obj, ...fields) {
    return fields.some(field => !obj[field]);
  }
  
  module.exports = {
    validateEmail,
    isMissingField,
  };
  