## UploadFileInput Component

The `UploadFileInput` component allows users to capture photos with the camera and select images from the gallery. It
also includes standard error validation via form.

---

## Installation

To use the `UploadFileInput` component, ensure you have the following dependency installed in your project:

```
pnpm add react-native-image-picker
```

For iOS, install the required CocoaPods:

```
cd ios && pod install && cd ..
```

---

### Features

- Capture photos using the device's camera.
- Select images from the device's gallery.
- Display thumbnails for images.
- Callbacks for create, edit, and delete actions.
- Standard error validation via form.

---

### Permissions Setup

To use the `UploadFileInput` component, you need to configure the required permissions for both Android and iOS.

#### **1. Android Permissions**

No permissions are required for using the `UploadFileInput` component.

#### Important Notes:

1. **Manifest.permission.CAMERA**:

   - This component does not require `Manifest.permission.CAMERA`.
   - However, if your app declares the `CAMERA` permission in the manifest, you must explicitly obtain the permission
     before using the `launchCamera` method.

2. **Targeting Android API Levels Below 30**:

   - If your app's `minSdkVersion` is set to below 30 and does not already include or depend on
     `androidx.activity:activity:1.9.+` or a newer version, you need to add the following line to the `dependencies`
     section of your `app/build.gradle` file:

     ```gradle
     dependencies {
         ...
         implementation("androidx.activity:activity:1.9.+")
         ...
     }
     ```

   - Additionally, you may need to update your `AndroidManifest.xml` to trigger the installation of the backported
     AndroidX Photo Picker. For reference, you can check the example app's configuration in
     `example/android/app/src/main/AndroidManifest.xml` and `example/android/app/build.gradle`.

   - For more details, consult the
     [Android documentation on AndroidX Photo Picker](https://developer.android.com/training/data-storage/shared/photopicker).

---

#### **2. iOS Permissions**

Add the following permissions to your `Info.plist` file to request access to the camera and photo library:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to upload images.</string>
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos.</string>
```

---

### Future Enhancements

Currently, the `UploadFileInput` component supports only picking an image or taking a photo. In the future, we may
include the ability to pick files.
