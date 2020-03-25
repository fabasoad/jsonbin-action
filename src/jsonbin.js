const got = require('got');

const URL = 'https://api.jsonbin.io/b/';

module.exports = {
  create: (apiKey, body) => {
    return got.post(URL, {
      body: JSON.stringify(body),
      headers: {
        'secret-key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(({ success, id }) => {
      if (success) {
        return {
          url: URL + id,
          id: id
        };
      } else {
        throw new Error(`POST ${URL} failed.`);
      }
    });
  },
  update: (apiKey, binId, body) => {
    return got.put(URL + binId, {
      body: JSON.stringify(body),
      headers: {
        'secret-key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(({ success, parentId }) => {
      if (success) {
        return {
          url: URL + parentId,
          id: parentId
        };
      } else {
        throw new Error(`PUT ${URL}/${binId} failed.`);
      }
    });
  },
  delete: (apiKey, binId) => {
    return got.delete(URL + binId, {
      headers: {
        'secret-key': apiKey
      }
    }).then(({ success, id }) => {
      if (success) {
        return {
          url: URL + id,
          id: id
        };
      } else {
        throw new Error(`DELETE ${URL}/${binId} failed.`);
      }
    });
  }
};