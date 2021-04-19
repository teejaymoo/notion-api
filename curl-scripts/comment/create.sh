
curl "http://localhost:4741/queries/${ID}/comments" \
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
