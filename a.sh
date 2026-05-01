#!/usr/bin/env sh

jq -cn \
  --arg mk "${JSONBIN_MASTER_KEY}" \
  --arg ak "${JSONBIN_ACCESS_KEY}" \
  '{"X-Master-Key": $mk, "X-Access-Key": $ak, "X-Bin-Meta": "true", "Accept": "application/json"}'
