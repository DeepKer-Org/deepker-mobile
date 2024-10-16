### Prebuild application

```bash
npx expo prebuild
```

### Running in emulated environment

```bash
npx expo run:ios
npx expo run:android
```


### ENV FILE

This should be a .env file in the root of the project to configure the environment variables to run on the server. By default it runs with the local environment.

```bash
EXPO_PUBLIC_API_BASE_URL=
```


### Retrieving information from backend API for Android

```bash
adb devices
```

```bash
adb -s device_name reverse tcp:8080 tcp:8080 
```