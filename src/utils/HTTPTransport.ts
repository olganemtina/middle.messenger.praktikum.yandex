import { METHODS } from './enums';

interface IOptions {
    timeout: number;
    data: any;
    headers: object;
    method: string;
}

function queryStringify(data: any) {
  const jsonString = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
  return jsonString;
}

class HTTPTransport {
  get = (url: string, options: IOptions) => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  // PUT, POST, DELETE
  put = (url: string, options: IOptions) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post = (url: string, options: IOptions) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  delete = (url: string, options: IOptions) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: IOptions, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET && data) {
        let jsonData = queryStringify(data);
        url += `?${jsonData}`;
      }
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = function () {
        reject(new Error('Отменено'));
      };
      xhr.onerror = function () {
        reject(new Error('Ошибка'));
      };
      xhr.ontimeout = function () {
        reject(new Error('Таймаут'));
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }

      setTimeout(() => {
        reject(new Error('Таймаут'));
      }, timeout);
    });
  };
}
