import requests
url = "https://api.theb.ai/v1/models"
# url = "https://api.baizhi.ai/v1/models"
headers = {
  'Authorization': 'Bearer $API_KEY'
}
response = requests.request("GET", url, headers=headers)
print(response.json())
