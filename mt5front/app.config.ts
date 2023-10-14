import { type ExpoConfig } from "@expo/config-types";
import { withAppDelegate, type ConfigPlugin } from "expo/config-plugins";

const config: ExpoConfig = {
  name: "mt5",
  slug: "example-app",
  version: "1.0.0",
  plugins: [
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
  ],
  android: {
    permissions: ["ACCESS_FINE_LOCATION"],
    package: "com.anonymous.exampleapp",
  },
  ios: {
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "This app uses your location to provide you with location-based services.",
    },
    bundleIdentifier: "com.anonymous.exampleapp",
  },
  extra: {
    mapKitApiKey: process.env.EXPO_PUBLIC_YAMAPS_API_KEY,
  },
};

const withYandexMaps: ConfigPlugin = (config) => {
  return withAppDelegate(config, async (config) => {
    const appDelegate = config.modResults;

    // Add import
    if (
      !appDelegate.contents.includes(
        "#import <YandexMapsMobile/YMKMapKitFactory.h>"
      )
    ) {
      // Replace the first line with the intercom import
      appDelegate.contents = appDelegate.contents.replace(
        /#import "AppDelegate.h"/g,
        `#import "AppDelegate.h"\n#import <YandexMapsMobile/YMKMapKitFactory.h>`
      );
    }

    const mapKitMethodInvocations = [
      `[YMKMapKit setApiKey:@"${config.extra?.mapKitApiKey}"];`,
      `[YMKMapKit setLocale:@"ru_RU"];`,
      `[YMKMapKit mapKit];`,
    ]
      .map((line) => `\t${line}`)
      .join("\n");

    // Add invocation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!appDelegate.contents.includes(mapKitMethodInvocations)) {
      appDelegate.contents = appDelegate.contents.replace(
        /\s+return YES;/g,
        `\n\n${mapKitMethodInvocations}\n\n\treturn YES;`
      );
    }

    return config;
  });
};

export default withYandexMaps(config);
