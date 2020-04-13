# JSONbin
![](https://img.shields.io/github/v/release/fabasoad/jsonbin-action?include_prereleases) ![CI (latest)](https://github.com/fabasoad/jsonbin-action/workflows/CI%20(latest)/badge.svg) ![CI (master)](https://github.com/fabasoad/jsonbin-action/workflows/CI%20(master)/badge.svg) ![YAML Lint](https://github.com/fabasoad/jsonbin-action/workflows/YAML%20Lint/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/jsonbin-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/jsonbin-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/jsonbin-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/jsonbin-action/context:javascript) [![Maintainability](https://api.codeclimate.com/v1/badges/4fc4a9e5af837a8ce6a9/maintainability)](https://codeclimate.com/github/fabasoad/jsonbin-action/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/translation-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/translation-action?targetFile=package.json)

This action allows to generate custom HTTP responses using [JSONbin.io](https://jsonbin.io).

## Prerequisites
Sign up to [JSONbin](https://jsonbin.io) official web page. Then go to [API Keys](https://jsonbin.io/api-keys) and copy api key to use it in action.

## Inputs
| Name    | Required | Description                                                                                            | Default | Possible values        |
|---------|----------|--------------------------------------------------------------------------------------------------------|---------|------------------------|
| api_key | Yes      | JSONbin API Key                                                                                        |         | <string>               |
| body    | No       | Body to send in JSON format. In case you want to CREATE or UPDATE bin.                                 | null    | <json>                 |
| method  | No       | Type of response that you want to send. Possible values are CREATE, UPDATE, DELETE. Default is CREATE. | CREATE  | CREATE, UPDATE, DELETE |
| bin_id  | No       | In case you want to UPDATE or DELETE bin.                                                              | null    | <string>               |

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
      - uses: actions/checkout@v2.1.0
      - uses: fabasoad/jsonbin-action@master
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
![Result](https://raw.githubusercontent.com/fabasoad/jsonbin-action/master/screenshot.png)