curl --location 'https://api.theb.ai/v1/chat/completions' \
# curl --location 'https://api.baizhi.ai/v1/chat/completions' \
--header 'Authorization: Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY' \
--header 'Content-Type: application/json' \
--data '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "Hello, World!"
    }
  ],
  "stream": true
}'
