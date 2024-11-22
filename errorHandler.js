export const errorHandler = (res, status, error) => {
  let msg = "An unexpected error occurred.";
  if (process.env.NODE_ENV === "development" && error) {
    console.log({ error: error });
  }
  if (status === 500) {
    msg = "Internal server error";
  }
  if (status === 404) {
    msg = "Data Not Found";
  }
  return res.status(status).json({ error: msg });
};
