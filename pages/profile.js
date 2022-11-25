import styles from "./profile.module.css";
import Image from "next/image";
import Edit from "./edit";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
const Profile = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Employee Profile</h2>
      <main className={styles.main}>
        <Image
          src="/img/profile.jpg"
          width={100}
          height={100}
          className={styles.img}
        />
        <h3 className={styles.name}> {user?.fullName}</h3>
        <p className={styles.position}>{user?.department}</p>
        <div className={styles.box}>
          <div className={styles.box1}>
            <h4 className={styles.header1}>Personal Details</h4>
          </div>

          <div className={styles.listItem}>
            <ul className={styles.list}>
              <li>Email: {user?.email}</li>
              <li>Address: {user?.address}</li>
              <li>PhoneNumber: {user?.phoneNumber}</li>
              <li>Date of Birth: {user?.dateOfBirth}</li>
              <li>Gender: {user?.gender}</li>
            </ul>
          </div>
          <div className={styles.edit}>
            <Edit />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
