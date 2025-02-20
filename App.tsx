import React from 'react';
import { View, Button, Alert, Platform, PermissionsAndroid } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import FileViewer from 'react-native-file-viewer';

const API_URL = "https://your-api-url.com/platform/test-get-user-events-pdf"; // Update with your actual API URL

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
      try {
          if (Platform.Version >= 33) {
              // Android 13+
              const granted = await PermissionsAndroid.requestMultiple([
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
              ]);

              return (
                  granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
                  granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED &&
                  granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
              );
          } else {
              // Android 12 and below
              const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                      title: 'Storage Permission Required',
                      message: 'App needs access to your storage to download files',
                      buttonPositive: 'OK',
                  }
              );

              return granted === PermissionsAndroid.RESULTS.GRANTED;
          }
      } catch (err) {
          console.warn(err);
          return false;
      }
  }
  return true; // iOS does not require these permissions
};

const downloadPdf = async () => {
  try {
      // Ensure permissions before downloading
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
          Alert.alert('Permission Denied', 'You need to grant storage permission to download files.');
          return;
      }

      const { dirs } = RNBlobUtil.fs;
      const path = `${dirs.DownloadDir}/admin-events.pdf`;

      // Start downloading the PDF
      const response = await RNBlobUtil.config({
          fileCache: true,
          path: path, // Save to Downloads folder
          appendExt: 'pdf', // Ensure it's recognized as a PDF
      }).fetch('GET', API_URL, {
          'Accept': 'application/pdf',
      });

      Alert.alert('Download Complete', `File saved at: ${path}`);
      // Open the file
      await FileViewer.open(path);
      console.log('PDF opened successfully');
  } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Download Failed', 'An error occurred while downloading the file.');
  }
};

const App = () => {

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Download PDF" onPress={downloadPdf}  />
      </View>
  );
};

export default App
