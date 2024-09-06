import React, { useEffect, useState } from 'react';
import Navbar from '../User/Navbar';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../Auth/firebase';

const UserDashboard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(database, 'users/'); // Assuming images are stored under 'users/'
      const snapshot = await get(imagesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const imageList = Object.values(data).map((item) => item.imageUrl);
        setImages(imageList);
      }
    };

    fetchImages();
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };
  return (
    <div>
      <Navbar onLogout={handleLogout}/>
      <div style={styles.container}>
        <h1 style={styles.heading}>User Dashboard</h1>
        <p style={styles.text}>Welcome, User! Here you can view your profile, manage your orders, and explore new services.</p>
        <div style={styles.cardContainer}>
        {images.map((imageUrl, index) => (
          <div key={index} style={styles.card}>
            <img src={imageUrl} alt={`Image ${index + 1}`} style={styles.image} />
            <p>Image {index + 1}</p>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    paddingTop: '80px', // Adjusted for the fixed navbar height
    backgroundColor: '#e9ecef',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '30px',
  },

  container: {
    padding: '20px',
  },
  heading: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

export default UserDashboard;
