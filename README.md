# EMMA

## Android Emulator:

Make sure you have an emulator listed: `emulator -list-avds`
Start up your emulator: `emulator -avd [avd-name]` (i.e `emulator -avd Pixel_2_API_29`). Note this is a blocking command.
To install apk: `adb install emma-XXX.apk`

## Run build on iOS

```bash
rm -rf emma.app
tar -xzf ~/Downloads/emma-XXX.tar.gz -C .
xcrun simctl install booted emma.app
xcrun simctl launch booted com.emma.app
```

## Licenses

To generate license file: `npm-license-crawler --production --onlyDirectDependencies -json assets/licenses.json`
