/**
 * Standardize API success response format
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Success message
 * @param {Object} data - Payload data
 */
export const successResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Standardize API error response format (Used primarily in errorHandler)
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 */
export const errorResponse = (res, statusCode = 500, message = 'Server Error') => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};
