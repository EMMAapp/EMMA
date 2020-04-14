import json

with open('app.json', 'r') as f:
     app_json = json.load(f)

current_version = app_json["expo"]["android"]["versionCode"]
print(f"Bumping version from 0.0.{current_version} to 0.0.{current_version + 1}")
current_version += 1
app_json["expo"]["android"]["versionCode"] = current_version
app_json["expo"]["version"] = f"0.0.{current_version}"
app_json["expo"]["ios"]["buildNumber"] = f"0.0.{current_version}"

with open('app.json', 'w') as f:
    json.dump(app_json, f, indent=2)
