const got = require('got');

const URL = 'https://api.jsonbin.io/v3/b/';

module.exports = {
  create: (apiKey, body) => {
    return got.post(URL, {
      body: body,
      headers: {
        'X-Bin-Private': true,
        'X-Master-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(({ body }) => {
      const { success, id } = JSON.parse(body);
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
      body: body,
      headers: {
        'X-Bin-Versioning': false,
        'X-Master-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(({ body }) => {
      const { success, parentId } = JSON.parse(body);
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
        'X-Master-Key': apiKey
      }
    }).then(({ body }) => {
      const { success, id } = JSON.parse(body);
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
