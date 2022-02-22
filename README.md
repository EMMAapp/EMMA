# EMMA

![logo](assets/images/logo.png)

Fertility treatments can be rather challenging, mentally and physically.

Let’s make fertility treatments easier!

Emma is a free app, specially designed to assist women with organizing their fertility journey: protocols, injection times, lab results, follicles size, trigger shots – follow up is challenging! Emma app is here to help with organizing and saving the medical records. 

Built using React Native on Expo

<img src="https://i.imgur.com/lAiBgCH.png" height="400px">

<img src="https://i.imgur.com/UQdgdNqm.png" height="400px">

## Talented developers - your help is needed!

The year is 2022, and women still run their fertility follow up on papers. Our team of volunteers created a free app dedicated to assist women undergoing fertility treatments with managing their treatment.

We still have a few open issues where your help would be greatly appreciated. The application is designed in React Native (javascript) powered by Expo. Among the subjects: debugging, implementation of a tutorial screens, development of a new feature. 

### About us

Emma app was founded by a team of volunteers led by a physician, in order to help women and families to go through fertility treatments without getting lost down the road, between all the paperwork and tests.  After finding out that most of the people track their treatment on paper, we believed it was time for a change.  
To make this great cause take shape, four professional women have undertaken the challenge: Eynav Senior UX/UI designer; Liri Sokol, an end to end developer; Ortal Avraham, an illustrator and UX/UI designer, and Jen, a medical intern and founder. To the creation of the project contributed:  Dr. Hershko- Klement Anat, head of IVF unit, Hadassah medical center; Maya Ash, a lawyer. 

## Development

### Android

Run `yarn android` to debug, `yarn build-android` for a production build and `yarn upload-anrdoid` to publish a new version to Play Store.

#### Emulator

Make sure you have an emulator listed: `emulator -list-avds`

Start up your emulator: `emulator -avd [avd-name]` (i.e `emulator -avd Pixel_2_API_29`). Note this is a blocking command.

To install apk: `adb install emma-XXX.apk`

### iOS

Run `yarn ios` to debug, `yarn-build-ios` to create app to run in simulator and `yarn build-ios-prod` to create a production app.

#### Simulator

To install app on simulator:

```bash
rm -rf emma.app
tar -xzf ~/Downloads/emma-XXX.tar.gz -C .
xcrun simctl install booted emma.app
xcrun simctl launch booted com.emma.app
```
