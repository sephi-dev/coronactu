export const api = {
  countries_api: (q?: string) => `/api/v1/countries?q=${q}`,
  restrictions: (from: string, to: string) =>
    `/api/v1/country?origin=${from}&destination=${to}`,
};
