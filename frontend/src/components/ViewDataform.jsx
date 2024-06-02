import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../componentscss/ViewDataform.module.css';
import {SERVER_PATH} from '../paths/path';


const ViewDataform = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_PATH}/data/view/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data.data[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
    console.log(data);

    const keysToHide = ['_id', 'submittedUserId', '__v'];

    const renderField = (key, value) => {
        if (keysToHide.includes(key)) {
            return null; // If key is in keysToHide, return null to hide the field
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (value === null) {
                return (
                    <div className={styles.viewfield} key={key}>
                        <p><strong>{key}:</strong> null</p>
                    </div>
                );
            }
            return (
                <div key={key}>
                    <h4>{key}:</h4>
                    <div className={styles.viewnestedobject}>
                        {Object.entries(value).map(([innerKey, innerValue]) => (
                            <div className={styles.viewnestedfield} key={innerKey}>
                                {renderField(innerKey, innerValue)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (Array.isArray(value)) {
            return (
                <div className={styles.viewnestedarray} key={key}>
                    <h4>{key}:</h4>
                    {value.map((item, index) => (
                        <div className={styles.viewarrayitem} key={`${key}-${index}`}>
                            {typeof item === 'object' && item !== null ? (
                                Object.entries(item).map(([itemKey, itemValue]) => (
                                    <div key={`${itemKey}-${index}`} className={styles.viewnestedfield}>
                                        {renderField(itemKey, itemValue)}
                                    </div>
                                ))
                            ) : (
                                renderField(index, item)
                            )}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className={styles.viewfield} key={key}>
                    <p><strong>{key}:</strong> {value !== null && value !== undefined ? value.toString() : 'null'}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.viewcardcontainer}>
                <div className={styles.viewcard}>
                    <div className={styles.viewcardbody}>
                    <h2 className={styles.viewcardtitle}>View Patient Details</h2>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} className={styles.viewformfield}>
                                {renderField(key, value)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewDataform;
