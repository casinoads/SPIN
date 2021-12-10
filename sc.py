import bs4
import requests
from bs4 import BeautifulSoup
import urllib.request  

req = urllib.request.Request('https://aapsite.com/stock1jetsadabetresult.php', headers={'User-Agent': 'Mozilla/5.0'})
url = urllib.request.urlopen(req).read()

def parsePrice():
    r = requests.get(url)
    soup = bs4.BeautifulSoup(r.text, "html.parser")
    # price = soup.find('table', {'class': 'table'}).find('p').text #get current price
    # return price

    data = []
    table = soup.find('table', attrs={'class':'table responsive table-bordered table-sm'})
    table_body = table.find('tbody')

    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        data.append([ele for ele in cols if ele]) # Get rid of empty values
    print(data)
    return data

while True:
    print("The current price is:" +str(parsePrice()))