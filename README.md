# JSONbin

![Releases](https://img.shields.io/github/v/release/fabasoad/jsonbin-action?include_prereleases)
![Functional Tests](https://github.com/fabasoad/jsonbin-action/workflows/Functional%20Tests/badge.svg)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/fabasoad/jsonbin-action/main.svg)](https://results.pre-commit.ci/latest/github/fabasoad/jsonbin-action/main)

This action allows to generate custom HTTP responses using [JSONbin.io](https://jsonbin.io).

## Prerequisites

### API key

Sign up to [JSONbin](https://jsonbin.io) official web page. Then go to [API Keys](https://jsonbin.io/api-keys)
and copy api key to use it in action.

### Pre-install

The following tools have to be installed for successful work of this GitHub action:
[bash](https://www.gnu.org/software/bash), [jq](https://stedolan.github.io/jq), [curl](https://curl.se).

## Inputs

| Name    | Required | Description                                                                                            | Default  | Possible values              |
|---------|----------|--------------------------------------------------------------------------------------------------------|----------|------------------------------|
| api_key | Yes      | JSONbin API Key                                                                                        |          | _&lt;string&gt;_             |
| body    | No       | Body to send in JSON format. In case you want to CREATE or UPDATE bin.                                 | `null`   | _&lt;json&gt;_               |
| method  | No       | Type of response that you want to send. Possible values are CREATE, UPDATE, DELETE. Default is CREATE. | `CREATE` | `CREATE`, `UPDATE`, `DELETE` |
| bin_id  | No       | In case you want to UPDATE or DELETE bin.                                                              | `null`   | _&lt;string&gt;_             |

## Outputs

| Name   | Required | Description                                           |
|--------|----------|-------------------------------------------------------|
| bin_id | Yes      | ID of a bin that has been created, updated or deleted |
| url    | Yes      | Access URL to a bin                                   |

## Example usage

### Workflow configuration

```yaml
name: JSONbin

on: push

jobs:
  jsonbin:
    name: Test JSONbin
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: fabasoad/jsonbin-action@main
        id: jsonbin
        with:
          body: '{"workflow": "${{ github.workflow }}", "author": "${{ github.actor }}", "number": "${{ github.run_number }}"}'
          method: 'CREATE'
          api_key: ${{ secrets.API_KEY }}
      - name: Check bin_id
        run: |
          echo "Bin ID = ${{ steps.jsonbin.outputs.bin_id }}"
          echo "URL = ${{ steps.jsonbin.outputs.url }}"
```

### Result

```text
Bin ID = 5e93fsb6b08d064dc025e226
URL = https://api.jsonbin.io/b/5e93fsb6b08d064dc025e226
```
