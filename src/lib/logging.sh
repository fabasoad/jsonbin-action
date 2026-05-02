#!/usr/bin/env sh

# Printing log to the console.
# Parameters:
# 1. (Required) Log level. Options: debug, info, warning, error.
# 2. (Required) Message.
log() {
  header="jsonbin-action"
  printf "[%s] [%s] %s %s\n" "${1}" "${header}" "$(date +'%Y-%m-%d %T')" "${2}" 1>&2
}

log_debug() {
  if [ "${JSONBIN_LOG_LEVEL}" = "debug" ]; then
    log "debug" "${1}"
  fi
}

log_info() {
  if [ "${JSONBIN_LOG_LEVEL}" = "debug" ] || [ "${JSONBIN_LOG_LEVEL}" = "info" ]; then
    log "info" "${1}"
  fi
}

log_warning() {
  if [ "${JSONBIN_LOG_LEVEL}" = "debug" ] || [ "${JSONBIN_LOG_LEVEL}" = "info" ] || [ "${JSONBIN_LOG_LEVEL}" = "warning" ]; then
    log "warning" "${1}"
  fi
}

log_error() {
  log "error" "${1}"
}
