#!/usr/bin/env sh

SCRIPT_PATH=$(realpath "$0")
SRC_DIR_PATH=$(dirname "$SCRIPT_PATH")
LIB_DIR_PATH="${SRC_DIR_PATH}/lib"

. "${LIB_DIR_PATH}/logging.sh"

http_get() {
  url="https://api.jsonbin.io/v3/b/${3}"
  log_debug "Request url: ${url}"
  resp=$(
    curl -s \
      -X "GET" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Meta: true" \
      -H "Accept: application/json" \
      "${url}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

http_post() {
  body="${3}"
  url="https://api.jsonbin.io/v3/b"
  log_debug "Request url: ${url}"
  log_debug "Request body: ${body}"
  resp=$(
    curl -s \
      -X "POST" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Private: true" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "${body}" \
      "${url}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

http_put() {
  body="${4}"
  url="https://api.jsonbin.io/v3/b/${3}"
  log_debug "Request url: ${url}"
  log_debug "Request body: ${body}"
  resp=$(
    curl -s \
      -X "PUT" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Versioning: false" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "${body}" \
      "${url}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.parentId'
}

http_delete() {
  url="https://api.jsonbin.io/v3/b/${3}"
  log_debug "Request url: ${url}"
  resp=$(
    curl -s \
      -X "DELETE" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "Accept: application/json" \
      "${url}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

main() {
  method="${1}"
  master_key="${2}"
  access_key="${3}"
  bin_id="${4}"
  body="${5}"

  case "${method}" in
    "GET")
      http_get "${master_key}" "${access_key}" "${bin_id}"
      ;;
    "CREATE")
      http_post "${master_key}" "${access_key}" "${body}"
      ;;
    "UPDATE")
      http_put "${master_key}" "${access_key}" "${bin_id}" "${body}"
      ;;
    "DELETE")
      http_delete "${master_key}" "${access_key}" "${bin_id}"
      ;;
  esac
}

main "$@"
