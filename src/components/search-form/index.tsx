import React, { FunctionComponent, useState } from "react";
import { Form, Formik, FormikValues } from "formik";

import { AsyncInputField } from "../async-search-field";
import { api } from "../../constants/api-routes";
import { useRequest } from "../../helpers/use-request";
import { CountryPayload } from "../../models/country";

export const SearchForm: FunctionComponent = () => {
  const [query, setQuery] = useState<{ from?: string; to?: string } | null>(
    null
  );

  const { data: fromData } = useRequest<CountryPayload>(
    query?.from
      ? {
          method: "GET",
          url: api.countries_api(query?.from),
        }
      : null
  );

  const { data: toData } = useRequest<CountryPayload>(
    query?.to
      ? {
          method: "GET",
          url: api.countries_api(query?.to),
        }
      : null
  );

  const handleSubmit = (values: FormikValues) => {
    // make async call to ulysse api with both country code
    console.info(values);
  };

  return (
    <Formik
      initialValues={{
        from: {
          code: "",
          country: "",
        },
        to: {
          code: "",
          country: "",
        },
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form
          className={
            "grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center"
          }
        >
          <div className={""}>
            <AsyncInputField
              label={"Départ"}
              setCountry={(e) => {
                setFieldValue("from", e);
                setQuery({ ...query, from: "" });
              }}
              value={values.from.country}
              name={"from"}
              results={fromData?.data}
              onChange={(event) => {
                setFieldValue("from.country", event.currentTarget.value, false);
                setQuery({ ...query, from: event.currentTarget.value });
              }}
            />
          </div>
          <div className={""}>
            <AsyncInputField
              label={"Arrivée"}
              value={values.to.country}
              setCountry={(e) => {
                setFieldValue("to", e);
                setQuery({ ...query, to: "" });
              }}
              name={"to"}
              results={toData?.data}
              onChange={(event) => {
                setFieldValue("to.country", event.currentTarget.value, false);
                setQuery({ ...query, to: event.currentTarget.value });
              }}
            />
          </div>
          <div
            className={
              "md:col-start-1 md:col-end-3 lg:col-start-3 lg:col-end-3"
            }
          >
            <button
              type={"submit"}
              className={"w-full bg-primary p-5 rounded-sm text-white p-15"}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
