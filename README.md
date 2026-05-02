# JSONbin

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![Releases](https://img.shields.io/github/v/release/fabasoad/jsonbin-action?include_prereleases)
![functional-tests](https://github.com/fabasoad/jsonbin-action/actions/workflows/functional-tests.yml/badge.svg)
![linting](https://github.com/fabasoad/jsonbin-action/actions/workflows/linting.yml/badge.svg)
![security](https://github.com/fabasoad/jsonbin-action/actions/workflows/security.yml/badge.svg)

This action allows to generate custom HTTP responses using [JSONbin.io](https://jsonbin.io).

## Prerequisites

Sign up to [JSONbin](https://jsonbin.io) official web page. Then go to [API Keys](https://jsonbin.io/api-keys)
and copy api key to use it in action.

## Inputs

<!-- prettier-ignore-start -->
| Name       | Required | Description                                                           | Default | Possible values                     |
|------------|----------|-----------------------------------------------------------------------|---------|-------------------------------------|
| master-key | Yes      | JSONbin Master Key                                                    |         | _&lt;string&gt;_                    |
| access-key | Yes      | JSONbin Access Key                                                    |         | _&lt;string&gt;_                    |
| body       | No       | Body to send in JSON format. In case you want to CREATE or UPDATE bin | `""`    | _&lt;json&gt;_                      |
| method     | No       | Type of response that you want to send                                | `GET`   | `GET`, `CREATE`, `UPDATE`, `DELETE` |
| bin-id     | No       | In case you want to GET, UPDATE or DELETE bin                         | `""`    | _&lt;string&gt;_                    |
<!-- prettier-ignore-end -->

## Outputs

<!-- prettier-ignore-start -->
| Name   | Required | Description                                           |
|--------|----------|-------------------------------------------------------|
| bin-id | Yes      | ID of a bin that has been created, updated or deleted |
| url    | Yes      | Access URL to a bin                                   |
<!-- prettier-ignore-end -->

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
      - uses: actions/checkout@v6
      - uses: fabasoad/jsonbin-action@v3
        id: jsonbin
        with:
          body: '{"workflow": "${{ github.workflow }}", "author": "${{ github.actor }}", "number": "${{ github.run_number }}"}'
          method: "CREATE"
          master-key: "${{ secrets.JSONBIN_MASTER_KEY }}"
          access-key: "${{ secrets.JSONBIN_ACCESS_KEY }}"
      - name: Check bin-id
        run: |
          echo "Bin ID = ${{ steps.jsonbin.outputs.bin-id }}"
          echo "URL = ${{ steps.jsonbin.outputs.url }}"
```

### Result

```text
Bin ID = 5e93fsb6b08d064dc025e226
URL = https://api.jsonbin.io/b/5e93fsb6b08d064dc025e226
```

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/16ab3ef254bccc6e06141ca75f349053776e522d.svg "Repobeats analytics image")
