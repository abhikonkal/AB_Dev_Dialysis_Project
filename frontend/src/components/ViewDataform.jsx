import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../componentscss/ViewDataform.css';


const ViewDataform = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/data/view/${id}`)
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
                    <div className="view-field" key={key}>
                        <p><strong>{key}:</strong> null</p>
                    </div>
                );
            }
            return (
                <div key={key}>
                    <h4>{key}:</h4>
                    <div className="view-nested-object">
                        {Object.entries(value).map(([innerKey, innerValue]) => (
                            <div className="view-nested-field" key={innerKey}>
                                {renderField(innerKey, innerValue)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (Array.isArray(value)) {
            return (
                <div className="view-nested-array" key={key}>
                    <h4>{key}:</h4>
                    {value.map((item, index) => (
                        <div className="view-array-item" key={`${key}-${index}`}>
                            {typeof item === 'object' && item !== null ? (
                                Object.entries(item).map(([itemKey, itemValue]) => (
                                    <div key={`${itemKey}-${index}`} className="view-nested-field">
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
                <div className="view-field" key={key}>
                    <p><strong>{key}:</strong> {value !== null && value !== undefined ? value.toString() : 'null'}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <Header />
            <div className="view-card-container">
                <div className="view-card">
                    <div className="view-card-body">
                    <h2 className="view-card-title">View Patient Details</h2>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} className="view-form-field">
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
