
from bson.json_util import dumps
from flask import Blueprint

filters = Blueprint('filters', __name__)

@filter.route('/api/filter/country/<country>', methods=['GET'])
def filter_country(country):
    countryData = []
    for d in collection.find():
        if d['country'] == country:
            countryData.append(d)
    return dumps(countryData)


@filter.route('/api/filter/region/<region>', methods=['GET'])
def filter_region(region):
    regionData = []
    for d in collection.find():
        if d['region'] == region:
            regionData.append(d)
    return dumps(regionData)
    
@filter.route('/api/filter/sector/<sector>', methods=['GET'])
def filter_sector(sector):
    sectorData = []
    for d in collection.find():
        if d['sector'] == sector:
            sectorData.append(d)
    return dumps(sectorData)

@filter.route('/api/filter/end_year/<end_year>', methods=['GET'])
def filter_end_year(end_year):
    endYearData = []
    for d in collection.find():
        if d['end_year'] == end_year:
            endYearData.append(d)
    return dumps(endYearData)

@filter.route('/api/filter/topic/<topic>', methods=['GET'])
def filter_topic(topic):
    topicData = []
    for d in collection.find():
        if d['topic'] == topic:
            topicData.append(d)
    return dumps(topicData)

@filter.route('/api/filter/pestle/<pestle>', methods=['GET'])
def filter_pestle(pestle):
    pestleData = []
    for d in collection.find():
        if d['pestle'] == pestle:
            pestleData.append(d)
    return dumps(pestleData)

@filter.route('/api/filter/source/<source>', methods=['GET'])
def filter_source(source):
    sourceData = []
    for d in collection.find():
        if d['source'] == source:
            sourceData.append(d)
    return dumps(sourceData)
