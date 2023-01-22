export const getErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  return message;
};
