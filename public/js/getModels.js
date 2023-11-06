import requests
url = "https://api.theb.ai/v1/models"
# url = "https://api.baizhi.ai/v1/models"
headers = {
  'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'
}
response = requests.request("GET", url, headers=headers)
print(response.json())
