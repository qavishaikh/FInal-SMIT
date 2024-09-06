// src/components/ImageUpload.js
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from './firebase';
import { ref as dbRef, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'; // for unique image IDs

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image first');

    const imageId = uuidv4(); // Unique identifier for the image
    const imageRef = ref(storage, `images/${imageId}`);

    try {
      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, image);

      // Get the download URL and store it in Firebase Realtime Database
      const url = await getDownloadURL(imageRef);

      // Store the image URL in the database under a specific user or globally
      await set(dbRef(database, 'users/' + imageId), {
        imageUrl: url,
      });

      setImageUrl(url);
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image: ', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {imageUrl && (
        <div>
          <p>Image Uploaded:</p>
          <img src={imageUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
