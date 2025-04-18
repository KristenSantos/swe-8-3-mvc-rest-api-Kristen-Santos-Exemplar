const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(
        `Fetch failed. ${response.status} ${response.statusText}`
      );

    const contentType = response.headers.get("content-type");
    if (contentType !== null && contentType.includes("application/json")) {
      const jsonData = await response.json();
      return [jsonData, null];
    } else {
      const textData = await response.text();
      return [textData, null];
    }
  } catch (error) {
    console.error(error.message);
    return [null, error];
  }
};

module.exports = fetchData;
