const got = require('got');

const URL = 'https://api.jsonbin.io/v3/b/';

module.exports = {
  create: async (apiKey, body) => {
    const { body: respBody } = await got.post(URL, {
      body: body,
      headers: {
        'X-Master-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    const { metadata } = JSON.parse(respBody);
    return {
      url: URL + metadata.id,
      id: metadata.id
    };
  },
  update: async (apiKey, binId, body) => {
    const { body: respBody } = await got.put(URL + binId, {
      body: body,
      headers: {
        'X-Master-Key': apiKey,
        'Content-Type': 'application/json',
        'X-Bin-Versioning': false
      }
    });
    const { metadata } = JSON.parse(respBody);
    return {
      url: URL + metadata.parentId,
      id: metadata.parentId
    };
  },
  delete: async (apiKey, binId) => {
    const { body: respBody } = await got.delete(URL + binId, {
      headers: {
        'X-Master-Key': apiKey
      }
    });
    const { metadata } = JSON.parse(respBody);
    return {
      url: URL + metadata.id,
      id: metadata.id
    };
  }
};
