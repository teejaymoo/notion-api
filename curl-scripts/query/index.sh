#!/bin/sh

API="http://localhost:4741"
URL_PATH="/queries"

curl "${API}${URL_PATH}" \
  --include \
  --request GET 

echo
