# JSONbin
![](https://img.shields.io/github/v/release/fabasoad/jsonbin-action?include_prereleases) ![YAML Lint](https://github.com/fabasoad/jsonbin-action/workflows/YAML%20Lint/badge.svg)

This action allows to generate custom HTTP responses using JSONbin service.

## Prerequisites
Sign up to [JSONbin](https://jsonbin.io) official web page. Then go to [API Keys](https://jsonbin.io/api-keys) and copy api key to use it in action.

## Inputs
1. `api_key` - _[Required]_ JSONbin API Key. 
2. `body` - _[Required]_ Body to send in JSON format.
3. `method` - _[Optional]_ Type of response that you want to send. Possible values are `CREATE`, `UPDATE`, `DELETE`. Default is `CREATE`.
4. `bin_id` - _[Optional]_ In case you want to `UPDATE` or `DELETE` bin.

## Outputs
1. `bin_id` - ID of a bin that has been created, updated or deleted.
2. `url` - Access URL to a bin.

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
      - uses: actions/checkout@v1
      - uses: fabasoad/jsonbin-action@v1.0.0
        id: jsonbin1
        with:
          body: '{"workflow": "${{ github.workflow }}", "author": "${{ github.actor }}", "number": "${{ github.run_number }}"}'
          method: 'CREATE'
          api_key: ${{ secrets.API_KEY }}
      - name: Check bin_id
        run: echo "Bin ID = ${{ steps.jsonbin1.outputs.bin_id }}"
      - uses: fjogeleit/http-request-action@master
        id: http1
        with:
          url: '${{ steps.jsonbin1.outputs.url }}'
          method: 'GET'
      - name: Check response
        run: echo "${{ steps.http1.outputs.response }}"
      - uses: fabasoad/jsonbin-action@v1.0.0
        id: jsonbin2
        with:
          body: '{"workflow": "${{ github.workflow }}-updated", "author": "${{ github.actor }}-updated", "number": "${{ github.run_number }}-updated"}'
          method: 'UPDATE'
          bin_id: '${{ steps.jsonbin1.outputs.bin_id }}'
          api_key: ${{ secrets.API_KEY }}
      - uses: fjogeleit/http-request-action@master
        id: http2
        with:
          url: '${{ steps.jsonbin2.outputs.url }}'
          method: 'GET'
      - name: Check response
        run: echo "${{ steps.http2.outputs.response }}"
      - uses: fabasoad/jsonbin-action@v1.0.0
        id: jsonbin3
        with:
          bin_id: '${{ steps.jsonbin2.outputs.bin_id }}'
          method: 'DELETE'
          api_key: ${{ secrets.API_KEY }}
      - uses: fjogeleit/http-request-action@master
        id: http3
        with:
          url: '${{ steps.jsonbin3.outputs.url }}'
          method: 'GET'
      - name: Check response
        run: echo "${{ steps.http3.outputs.response }}"
```

### Result
![Result](https://raw.githubusercontent.com/fabasoad/jsonbin-action/master/screenshot.png)