# Firebase Storage Uploader

This script uploads files from a specified directory to a Firebase Storage bucket. It reads environment variables for the Firebase bucket name and directory path. If they are not provided, it prompts the user for them during execution.

## Benefits

- **Bulk Uploading**: This script allows you to upload entire directories, avoiding the need to manually upload files and folders one by one, which saves time and reduces errors.
- **Automatic Handling of Subdirectories**: The script will also upload files located in subdirectories, ensuring the entire folder structure is maintained within Firebase Storage.
- **Error Handling**: Provides basic error handling for missing directories or invalid paths.

## Prerequisites

1. **Node.js** - Make sure you have Node.js installed on your system. If not, download and install it from [here](https://nodejs.org/).

2. **Firebase Admin SDK** - This script uses Firebase Admin SDK to access Firebase Storage. You must have the service account key in JSON format from your Firebase project.

3. **Environment Variables** - Create a `.env` file in the project root directory with the following variables:
    - `FIREBASE_BUCKET_NAME`: Your Firebase Storage bucket name.
    - `FILE_PATH`: The directory path of the files you want to upload.

## Installation

1. Clone the repository or download the script.

2. Install dependencies by running:

```bash
npm install
```

3. Create a `.env` file with your environment variables:

```env
FIREBASE_BUCKET_NAME=<your-firebase-bucket-name>
FILE_PATH=<directory-path-to-upload>
```

Example 

```env
FIREBASE_BUCKET_NAME=test-app-134d6.appspot.com
FILE_PATH=/Users/myUser/test
```

4. Download your Firebase service account key in JSON format and place it in the root directory of the project. Name it `serviceAccountKey.json`.

### How to Obtain the Firebase Service Account Key:

   1. Go to the [Firebase Console](https://console.firebase.google.com/).
   2. Select your project.
   3. In the left-hand menu, navigate to **Project Settings** (click on the gear icon).
   4. Under the **Service Accounts** tab, click on **Generate New Private Key**.
   5. This will download the service account key in JSON format. Move this file into your project directory and name it `serviceAccountKey.json`.

## Usage

To run the script, use the following command:

```bash
node index.js
```

If you have not set the `FIREBASE_BUCKET_NAME` or `FILE_PATH` in the `.env` file, the script will prompt you to enter them during execution.
