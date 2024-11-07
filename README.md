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

Retrieve the device name and run the following command to reverse the port to the device.

```bash
adb -s device_name reverse tcp:8080 tcp:8080 
```

### Building the application (Android only supported)

```bash
eas build --profile development --platform android  
```

### Start server in production

```bash
pnpm start
```
