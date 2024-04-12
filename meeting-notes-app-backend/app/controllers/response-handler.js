export const setResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

//Error Handling
export const setError = (err, response) => {
  console.log(err);
  response.status(500);
  response.json({
    error: {
      code: 'InternalServerError',
      mesasage: 'Error occured while processing the request',
    },
  });
};
