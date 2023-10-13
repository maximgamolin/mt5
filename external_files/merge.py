import json


def distance(lat1, lon1, lat2, lon2):
    return (lat1 - lat2) ** 2 + (lon1 - lon2) ** 2


with open('atms.json', 'r') as f:
    data1 = json.load(f)

with open('offices.json', 'r') as f:
    data2 = json.load(f)

merged_data = []


for item1 in data1['atms']:
    closest_item2 = None
    min_distance = float('inf')

    for item2 in data2:
        dist = distance(item1["latitude"], item1["longitude"], item2["latitude"], item2["longitude"])
        if dist < min_distance:
            min_distance = dist
            closest_item2 = item2

    merged_item = {**item1, **closest_item2}
    merged_data.append(merged_item)

# Save the merged data to a new JSON file
with open('merged_data.json', 'w') as f:
    json.dump(merged_data, f, indent=4)
