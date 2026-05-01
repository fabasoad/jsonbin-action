#!/usr/bin/env sh

SCRIPT_PATH=$(realpath "$0")
SRC_DIR_PATH=$(dirname "$SCRIPT_PATH")
LIB_DIR_PATH="${SRC_DIR_PATH}/lib"

. "${LIB_DIR_PATH}/logging.sh"

http_get() {
  bin_id="${3}"
  resp=$(
    curl -s \
      -X "GET" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Meta: true" \
      -H "Accept: application/json" \
      "https://api.jsonbin.io/v3/b/${bin_id}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

http_post() {
  body="${3}"
  resp=$(
    curl -s \
      -X "POST" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Private: true" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "${body}" \
      "https://api.jsonbin.io/v3/b"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

http_put() {
  bin_id="${3}"
  body="${4}"
  resp=$(
    curl -s \
      -X "PUT" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "X-Bin-Versioning: false" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "${body}" \
      "https://api.jsonbin.io/v3/b/${bin_id}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.parentId'
}

http_delete() {
  bin_id="${3}"
  resp=$(
    curl -s \
      -X "DELETE" \
      -H "X-Master-Key: ${1}" \
      -H "X-Access-Key: ${2}" \
      -H "Accept: application/json" \
      "https://api.jsonbin.io/v3/b/${bin_id}"
  )
  log_debug "Response: ${resp}"
  echo "${resp}" | jq -r '.metadata.id'
}

main() {
  case "${1}" in
    "GET")
      shift
      http_get "$@"
      ;;
    "CREATE")
      shift
      http_post "$@"
      ;;
    "UPDATE")
      shift
      http_put "$@"
      ;;
    "DELETE")
      shift
      http_delete "$@"
      ;;
  esac
}

main "$@"
