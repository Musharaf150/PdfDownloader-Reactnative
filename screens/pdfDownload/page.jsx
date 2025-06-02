import { getAuth, signOut } from '@react-native-firebase/auth';
import React from 'react';
import { View, Button, Alert, Platform, PermissionsAndroid, TouchableOpacity, Text } from 'react-native';
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

const PdfDownload = () => {
    const handleSignOut = () => {
        // Implement sign-out logic here, e.g., using Firebase auth
        console.log('Sign out pressed');
        signOut(getAuth())
            .then(() => console.log('User signed out!'))
            .catch(error => console.error('Sign out error:', error));
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <TouchableOpacity onPress={handleSignOut}
            style={{ position: 'absolute', top: 20, right: 20, 
            backgroundColor: 'blue', borderRadius: 5, padding: 5 }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Sign out</Text>
            </TouchableOpacity>
            <Button title="Download PDF" onPress={downloadPdf} />
        </View>
    );
};

export default PdfDownload
