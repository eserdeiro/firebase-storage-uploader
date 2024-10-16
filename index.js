// Import dependencies
require('dotenv').config();
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration variables
const serviceAccount = require('./serviceAccountKey.json');
let firebaseBucketName = process.env.FIREBASE_BUCKET_NAME;
let directoryPath = process.env.FILE_PATH;

// Create interface to read input from terminal if needed
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const initialize = async () => {
    // Ask for firebaseBucketName if not defined
    if (!firebaseBucketName) {
        firebaseBucketName = await promptUser('Please enter the Firebase bucket name: ');
    }

    // Ask for directoryPath if not defined
    if (!directoryPath) {
        directoryPath = await promptUser('Please enter the directory path to upload: ');
    }

    // Close readline interface
    rl.close();

    // Initialize Firebase Admin
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: firebaseBucketName,
    });

    // Get the bucket from Firebase Admin
    const bucket = admin.storage().bucket();

    // Verify the provided values
    if (!directoryPath || !firebaseBucketName) {
        console.error('Error: directoryPath or firebaseBucketName is not defined');
        process.exit(1);
    }

    // Run the main function if the directory is valid
    if (fs.existsSync(directoryPath)) {
        uploadFiles(directoryPath, directoryPath, bucket);
    } else {
        console.error('Error: The provided directory does not exist');
        process.exit(1);
    }
};

// Function to upload files to Firebase Storage
const uploadFiles = async (baseDirectory, currentDirectory, bucket) => {
    try {
        const files = fs.readdirSync(currentDirectory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.resolve(currentDirectory, file.name);
            const relativePath = path.relative(baseDirectory, fullPath);

            if (file.isDirectory()) {
                // Recursive call to upload files inside folders
                await uploadFiles(baseDirectory, fullPath, bucket);
            } else if (file.isFile()) {
                await bucket.upload(fullPath, {
                    destination: relativePath,
                });
                console.log(`Uploaded: ${fullPath} to ${relativePath}`);
            }
        }
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};

// Execute the initialization function
initialize();
