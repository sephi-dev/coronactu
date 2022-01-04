import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const proxyOptions = [
    {
      target: process.env.COUNTRIES_API_URL,
      pathRewrite: [
        {
          patternStr: "/api/v1/countries",
          replaceStr: "",
        },
      ],
      changeOrigin: true,
    },
    {
      target: process.env.RESTRICTIONS_API_URL,
      pathRewrite: [
        {
          patternStr: "/api/v1/country",
          replaceStr: "",
        },
      ],
      changeOrigin: true,
    },
  ];
  const proxyOption = proxyOptions.find(({ pathRewrite }) => {
    return pathRewrite.some(({ patternStr }) =>
      RegExp(patternStr).test(<string>req?.url)
    );
  });

  if (proxyOption) {
    return httpProxyMiddleware(req, res, proxyOption);
  } else {
    return res.status(404).send(null);
  }
};
