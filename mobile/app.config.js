export default {
expo: {
name: "mobile",
slug: "mobile",
version: "1.0.0",
orientation: "portrait",
icon: "./assets/icon.png",

```
userInterfaceStyle: "light",

ios: {
  supportsTablet: true,
},

android: {

  permissions: [
    "ACCESS_FINE_LOCATION",
    "ACCESS_COARSE_LOCATION",
  ],

  config: {
    googleMaps: {
      apiKey:
        process.env
          .EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },

  adaptiveIcon: {
    backgroundColor: "#E6F4FE",

    foregroundImage:
      "./assets/android-icon-foreground.png",

    backgroundImage:
      "./assets/android-icon-background.png",

    monochromeImage:
      "./assets/android-icon-monochrome.png",
  },

  package: "com.anonymous.mobile",
},

web: {
  favicon: "./assets/favicon.png",
},

plugins: [
  "expo-web-browser",
],

extra: {
  eas: {
    projectId:
      "c2b34c3d-abe9-4313-80b3-d41b984f574a",
  },
},
```

},
};
