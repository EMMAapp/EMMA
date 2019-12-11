# EMMA

## Android Emulator:

Make sure you have an emulator listed: `emulator -list-avds`
Start up your emulator: `emulator -avd [avd-name]` (i.e `emulator -avd Pixel_2_API_29`). Note this is a blocking command.

```json
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.emma.app",
      "config": {
        "googleSignIn": {
          "reservedClientId": "com.googleusercontent.apps.1091629470495-bojd6ud8nfu85ku7b0vkng1uam23isl1"
        }
      }
    },
    "android": {
      "package": "com.emma.app",
      "googleServicesFile": "./google-services.json"
    },
```