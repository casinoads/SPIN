import bs4
import requests,time,json,re
from time import sleep
from bs4 import BeautifulSoup
import urllib.request  
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


# req = urllib.request.Request('https://aapsite.com/stock1lottovipresult.php', headers={'User-Agent': 'Mozilla/5.0'})
# url = urllib.request.urlopen(req).read()


cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    "apiKey": "AIzaSyAPqGrvSFcDr18h1zEQIhsusjOtjKanTt4",
    "authDomain": "ufapro889s.firebaseapp.com",
    "databaseURL": "https://ufapro889s-default-rtdb.firebaseio.com",
    "projectId": "ufapro889s",
    "storageBucket": "ufapro889s.appspot.com",
    "messagingSenderId": "351494826911",
    "appId": "1:351494826911:web:f54710e7f72098310a6baa",
    "measurementId": "${config.measurementId}"
})
LOTTO_ref = db.reference('LOTTO')

class lottovip:
    def NextRound():
        r = requests.get('https://aapsite.com/stock1lottovipresult.php')
        soup = bs4.BeautifulSoup(r.content.decode('utf-8'), "html.parser")
        lottoNext = soup.find('div', {'class': 'card-group'}).find('div').text.strip()
        repN = re.sub(r'\D', ' ', lottoNext).strip()
        #print(repN) 
        return repN

    def AllRound():
        r = requests.get('https://aapsite.com/stock1lottovipresult.php')
        soup = bs4.BeautifulSoup(r.content.decode('utf-8'), "html.parser")
        data = []
        table = soup.find('table', attrs={'class':'table responsive table-bordered table-sm'})
        table_body = table.find('tbody')
        rows = table_body.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            cols = [ele.text.strip() for ele in cols]
            data.append([ele for ele in cols if ele])
        #print(data)
        return data

    #while True:
    time.sleep(1)
    RoundNext = re.sub(r"\s+", ",",NextRound())
    AllDataRound = AllRound()
    
    lottovipDATA = db.reference('LOTTO/RoundSET/lottovip')
    ResRound = lottovipDATA.get()['Round']
    print(RoundNext,ResRound)
    
    #print("NextRound lottovip: " , RoundNext)
    if RoundNext == ResRound:
        pass
    else:
        LOTTO_ref.child('RoundSET').update({ 
            'lottovip': {
            'Round': RoundNext
                }
            })
        print("NextRound lottovip: " , RoundNext)
        LOTTO_ref.child('ALLDATA/lottovip').update(AllDataRound)
        print("NEW!Round lottovip",lottovipDATA)
       


        # Round_file = open("Round_file.json", "w")
        # json.dump({'lottovip':RoundNext}, Round_file, indent = 6)
        # Round_file.close()

        # with open('lottovip.json', 'w', encoding ='utf8') as json_file:
        #     json.dump(str(AllRound()), json_file, ensure_ascii = False)

