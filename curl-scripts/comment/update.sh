API="http://localhost:4741"
URL_PATH="/queries"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "response": "'"${R}"'"
    }
  }'

echo
