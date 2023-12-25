function safeJSON(
  data: string,
  fallback: { [key: string]: any },
): { [key: string]: any } {
  try {
    return JSON.parse(data);
  } catch (err) {
    return fallback;
  }
}

export { safeJSON };
