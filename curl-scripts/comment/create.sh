
curl "http://localhost:4741/queries/${ID}" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "response": "'"${RESPONSE}"'"
    }
  }'

echo
