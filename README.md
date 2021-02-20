# JSONbin

![Releases](https://img.shields.io/github/v/release/fabasoad/jsonbin-action?include_prereleases) ![Unit Tests](https://github.com/fabasoad/jsonbin-action/workflows/Unit%20Tests/badge.svg) ![Functional Tests](https://github.com/fabasoad/jsonbin-action/workflows/Functional%20Tests/badge.svg) ![YAML Lint](https://github.com/fabasoad/jsonbin-action/workflows/YAML%20Lint/badge.svg) ![Security Tests](https://github.com/fabasoad/jsonbin-action/workflows/Security%20Tests/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/jsonbin-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/jsonbin-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/jsonbin-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/jsonbin-action/context:javascript) [![Maintainability](https://api.codeclimate.com/v1/badges/4fc4a9e5af837a8ce6a9/maintainability)](https://codeclimate.com/github/fabasoad/jsonbin-action/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4fc4a9e5af837a8ce6a9/test_coverage)](https://codeclimate.com/github/fabasoad/jsonbin-action/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/translation-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/translation-action?targetFile=package.json)

This action allows to generate custom HTTP responses using [JSONbin.io](https://jsonbin.io).

## Prerequisites

Sign up to [JSONbin](https://jsonbin.io) official web page. Then go to [API Keys](https://jsonbin.io/api-keys) and copy api key to use it in action.

## Inputs

| Name    | Required | Description                                                                                            | Default  | Possible values              |
|---------|----------|--------------------------------------------------------------------------------------------------------|----------|------------------------------|
| api_key | Yes      | JSONbin API Key                                                                                        |          |_&lt;string&gt;_            |
| body    | No       | Body to send in JSON format. In case you want to CREATE or UPDATE bin.                                 | `null`   | _&lt;json&gt;_              |
| method  | No       | Type of response that you want to send. Possible values are CREATE, UPDATE, DELETE. Default is CREATE. | `CREATE` | `CREATE`, `UPDATE`, `DELETE` |
| bin_id  | No       | In case you want to UPDATE or DELETE bin.                                                              | `null`   |_&lt;string&gt;_             |

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

```shell
Bin ID = 5e93fsb6b08d064dc025e226
URL = https://api.jsonbin.io/b/5e93fsb6b08d064dc025e226
```
