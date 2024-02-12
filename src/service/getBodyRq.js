async function getBodyRq(req) {
  const res = await new Promise((res, rej) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      res(Buffer.concat(chunks));
    });

    req.on("error", (err) => rej({ status: 500 }));
  });

  return JSON.parse(res.toString("utf-8"));
}

export { getBodyRq };
