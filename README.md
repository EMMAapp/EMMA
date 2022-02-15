# EMMA

![logo](assets/images/logo.png)

Built using React Native on Expo

## Android

Run `yarn android` to debug, `yarn build-android` for a production build and `yarn upload-anrdoid` to publish a new version to Play Store.

### Emulator

Make sure you have an emulator listed: `emulator -list-avds`
Start up your emulator: `emulator -avd [avd-name]` (i.e `emulator -avd Pixel_2_API_29`). Note this is a blocking command.
To install apk: `adb install emma-XXX.apk`

## iOS

Run `yarn ios` to debug, `yarn-build-ios` to create app to run in simulator and `yarn build-ios-prod` to create a production app.

## Run build on iOS

To install app on simulator:

```bash
rm -rf emma.app
tar -xzf ~/Downloads/emma-XXX.tar.gz -C .
xcrun simctl install booted emma.app
xcrun simctl launch booted com.emma.app
```
