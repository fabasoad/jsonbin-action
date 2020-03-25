const core = require('@actions/core');
const jsonbin = require('./jsonbin');

(async () => {
  let result;
  const method = core.getInput('method');
  switch (method) {
    case 'CREATE':
      result = await jsonbin.create(
        core.getInput('api_key'),
        core.getInput('body')
      );
      break;
    case 'UPDATE':
      result = await jsonbin.update(
        core.getInput('api_key'),
        core.getInput('bin_id'),
        core.getInput('body')
      );
      break;
    case 'DELETE':
      result = await jsonbin.delete(
        core.getInput('api_key'),
        core.getInput('bin_id')
      );
      break;
    default:
      core.setFailed(`${method} method is not supported.`);
      return;
  }
  core.setOutput('bin_id', result.id);
  core.setOutput('url', result.url);
})();