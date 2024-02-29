export const getResStringify = (reqType: string, data: unknown, id = 0): string => {
  const str = JSON.stringify({
    type: reqType,
    data: JSON.stringify(data),
    id,
  });
  return str;
};
