import { getInput, setFailed, setOutput } from '@actions/core'
import JsonBinClient, { JsonBinResponse } from './JsonBinClient'

async function run() {
  let result: JsonBinResponse
  const method = getInput('method');
  const client = new JsonBinClient(getInput('api_key'))
  try {
    switch (method) {
    case 'CREATE': {
      const body = JSON.parse(getInput('body'))
      result = await client.create<typeof body>(body)
      break;
    }
    case 'UPDATE': {
      const body = JSON.parse(getInput('body'))
      result = await client.update<typeof body>(
          getInput('bin_id'), body)
      break;
    }
    case 'DELETE': {
      result = await client.delete(
          getInput('bin_id')
      );
      break;
    }
    default:
      setFailed(`${method} method is not supported.`);
      return;
    }
  } catch (err) {
    setFailed((<Error>err).message);
    return;
  }
  setOutput('bin_id', result.id);
  setOutput('url', result.url);
}

run();
