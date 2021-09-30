# Import required packages and modules
import pymongo
import requests
from bs4 import BeautifulSoup
import os

# Connect to MongoDB Atlas and get the database and collection
# https://askubuntu.com/questions/58814/how-do-i-add-environment-variables
client = pymongo.MongoClient(os.environ['GOCODE_URI'])
db = client.get_database('GoCode')
coll = db.ProblemSet

# Fetch list of problems from the URL for problemset API
url = "https://www.codeforces.com/api/problemset.problems?"
response = requests.get(url)
json_response = response.json()
plist = json_response['result']['problems']

# Iterate through the problem list based the on the number of problems required and its range
# Scrape the problem statement and sample cases and insert the appropriate data into the database
for i in range(1):
    contest_id = plist[i]['contestId']
    index = plist[i]['index']
    name = plist[i]['name']
    tags = plist[i]['tags']
    rating = plist[i]['rating']
    url = f"https://www.codeforces.com/problemset/problem/{contest_id}/{index}"
    response = requests.get(url).text
    soup = BeautifulSoup(response, 'html.parser')
    statement = (soup.find(class_ = "problem-statement").find_all("p"))
    statement_str = ""
    for p in statement:
        statement_str += p.text + "\n"

    sample_cases = soup.find_all("pre")
    input_cases = []
    output_cases = []
    for j in range(len(sample_cases)):
        if j % 2 == 0:
            input_cases.append(sample_cases[j].text)
        else:
            output_cases.append(sample_cases[j].text)
    problem = {
        'name':name,
        'tags':tags,
        'statement':statement_str,
        'input':input_cases,
        'output':output_cases,
        'rating':rating,
        'platform':"codeforces"
        }
    coll.insert_one(problem)
    print(f"Added problem {i}")