import { HTTPMETHODS } from "./enums";

interface IOptions {
  timeout: number;
  data: any;
  headers: object;
  method: HTTPMETHODS;
}

function queryStringify(data: any) {
  const jsonString = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&");
  return jsonString;
}

class HTTPTransport {
  get = (url: string, options: IOptions) =>
    this.request(url, { ...options, method: HTTPMETHODS.GET }, options.timeout);

  // PUT, POST, DELETE
  put = (url: string, options: IOptions) =>
    this.request(url, { ...options, method: HTTPMETHODS.PUT }, options.timeout);

  post = (url: string, options: IOptions) =>
    this.request(
      url,
      { ...options, method: HTTPMETHODS.POST },
      options.timeout
    );

  delete = (url: string, options: IOptions) =>
    this.request(
      url,
      { ...options, method: HTTPMETHODS.DELETE },
      options.timeout
    );

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: IOptions, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === HTTPMETHODS.GET && data) {
        let jsonData = queryStringify(data);
        url += `?${jsonData}`;
      }
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = function () {
        reject(new Error("Отменено"));
      };
      xhr.onerror = function () {
        reject(new Error("Ошибка"));
      };
      xhr.ontimeout = function () {
        setTimeout(() => {
          reject(new Error("Таймаут"));
        }, timeout);
      };

      if (method === HTTPMETHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
