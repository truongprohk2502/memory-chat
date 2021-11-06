import axios from 'axios';
import { stringifyUrl } from 'query-string';
import { Action } from 'redux';
import { call, put } from 'redux-saga/effects';

interface IParam {
  name: string;
  value: string;
}

interface ICallApiProps {
  method: 'get' | 'post' | 'put' | 'delete';
  urlTemplate: string;
  queries?: IParam[];
  params?: IParam[];
  data?: object;
  formData?: FormData;
}

interface IResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
}

export const axiosCallApi = ({
  method,
  urlTemplate,
  queries = [],
  params = [],
  data,
  formData,
}: ICallApiProps) => {
  let query = {};
  queries.forEach(({ name, value }) => {
    query[name] = value;
  });
  const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;
  let url = API_ENDPOINT + urlTemplate;
  params.forEach(({ name, value }) => {
    url = url.replace(`:${name}`, value);
  });
  url = stringifyUrl({ url, query });

  if (data) {
    return axios({
      method,
      url,
      data,
    });
  } else if (formData) {
    return axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method,
      url,
      data: formData,
    });
  } else {
    return axios({ method, url });
  }
};

export function* sagaLayoutFunction(
  callApiProps: ICallApiProps,
  successFunction: (response: IResponse) => void,
  failureAction: (error: string) => Action,
  failureFunction?: (response: IResponse) => void,
) {
  try {
    const response = yield call(axiosCallApi, callApiProps);
    yield successFunction(response.data.data);
  } catch (error) {
    if (failureFunction) {
      yield failureFunction(error.response);
    }
    yield put(failureAction(error.response.data.message));
  }
}
