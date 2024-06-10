from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client.dashboard
collection = db.insights

@app.route('/api/filter/<field>', methods=['GET'])
def get_data_sector(field):
    fieldData = {}
    othersData = {'others': 0}
    for d in collection.find():
        if field in d:
            fieldName = d[field]
            if fieldName == '':
                fieldName = 'Unknown'
            if fieldName in fieldData:
                fieldData[fieldName] += 1
            else:
                fieldData[fieldName] = 1
    fieldDataList = []
    for key, value in fieldData.items():
        if value == 1:
            othersData['others'] += 1
        else:
            fieldDataList.append({"label": key, "value": value})
    if othersData['others'] > 0:
        fieldDataList.append({"label": 'others', "value": othersData['others']})
    return dumps(fieldDataList)


@app.route('/api/filter/<filter>/<field>', methods=['GET'])
def filter_data(filter, field):
    if field == 'Unknown':
        field = ''
    filterData = {
        'intensity': [],
        'relevance' :[],
        'likelihood':[],
        'title':[]
        }
    intensity = {}
    relevance = {}
    likelihood = {}
    for d in collection.find():
        if d[filter] == field:
            if (d['intensity']) in intensity:
                intensity[(d['intensity'])] += 1
            else:
                intensity[(d['intensity'])] = 1
            if d['relevance'] in relevance:
                relevance[d['relevance']] += 1
            else:
                relevance[d['relevance']] = 1
            if d['likelihood'] in likelihood:
                likelihood[d['likelihood']] += 1
            else:
                likelihood[d['likelihood']] = 1
            filterData['title'].append(d['title'])
    for key , value in intensity.items():
        filterData['intensity'].append({"label": key, "value": value})
    for key , value in relevance.items():
        filterData['relevance'].append({"label": key, "value": value})
    for key , value in likelihood.items():
        filterData['likelihood'].append({"label": key, "value": value})

    return dumps(filterData)
        

@app.route('/api/topic/<filter>/<field>', methods=['GET'])
def first5Topic(filter, field):
    if field == 'Unknown':
        field = ''
    topics = {}
    for d in collection.find():
        if d[filter] == field:
            if d['topic'] in topics:
                topics[d['topic']] += 1
            else:
                topics[d['topic']] = 1

    # Sort topics by frequency in descending order and take the top 5
    sorted_topics = sorted(topics.items(), key=lambda item: item[1], reverse=True)[:5]

    result = [{'label': label, 'value': value} for label, value in sorted_topics]

    return jsonify(result)
    

@app.route('/api/datacard/<filter>/<field>', methods=['GET'])
def dataCard(filter, field):
    if field == 'Unknown':
        field = ''
    maxIntensity = float('-inf')
    minIntensity = float('inf')
    maxRelevance = float('-inf')
    minRelevance = float('inf')
    maxLikelihood = float('-inf')
    minLikelihood = float('inf')

    for d in collection.find({filter: field}):
        if 'intensity' in d:
            if isinstance(d['intensity'], int):
                maxIntensity = max(maxIntensity,  d['intensity'])
                minIntensity = min(minIntensity,  d['intensity'])

        if 'relevance' in d:
            if isinstance(d['relevance'], int):
                maxRelevance = max(maxRelevance, d['relevance'])
                minRelevance = min(minRelevance, d['relevance'])

        if 'likelihood' in d:
            likelihood = 0
            if isinstance(d['likelihood'], int):
                maxLikelihood = max(maxLikelihood, d['likelihood'])
                minLikelihood = min(minLikelihood, d['likelihood'])

    return jsonify({
        'maxIntensity': maxIntensity if maxIntensity != float('-inf') else '-',
        'minIntensity': minIntensity if minIntensity != float('inf') else '-',
        'maxRelevance': maxRelevance if maxRelevance != float('-inf') else '-',
        'minRelevance': minRelevance if minRelevance != float('inf') else '-',
        'maxLikelihood': maxLikelihood if maxLikelihood != float('-inf') else '-',
        'minLikelihood': minLikelihood if minLikelihood != float('inf') else '-'
    })




if __name__ == 'main':
    app.run(debug=True)

