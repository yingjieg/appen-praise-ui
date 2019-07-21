import request from '../utils/request';

export function getPraises(cursor = 0, previous = true, limit = 10) {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/messages',
      method: 'GET',
      params: {
        cursor,
        previous,
      },
    })
      .then(res => {
        resolve(res);
      })
      .catch(reject);
  });
}
