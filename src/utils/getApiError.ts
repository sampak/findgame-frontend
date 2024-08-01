export const getApiError = (
  err,
  getLang
) => {
  if (
    err &&
    err.response &&
    err.response.data.message &&
    !!err.response.data.message.length &&
    err.response.data.message !== 'Forbidden resource'
  ) {
    return getLang(`errors.${err.response.data.message}`);
  }

  if (err.response.statusText === 'Forbidden') {
    return getLang(`errors.forbidden`);
  }
  return 'An error occurred, try again later.';
};
