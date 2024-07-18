import React from 'react';

const Drug = ({ formData, setFormData, index }) => {
    const handleChange = (e) => {
        
        // console.log(formData.ClinicalPrescriptions)
        const { name, value } = e.target;
        
        // Create a copy of the current ClinicalPrescriptions
        const updatedPrescriptions = [...formData.ClinicalPrescriptions];

        // Update the specific index using index prop
        updatedPrescriptions[index] = {
            ...updatedPrescriptions[index],
            [name]: value
        };

        // Update the formData state
        setFormData({
            ...formData,
            ClinicalPrescriptions: updatedPrescriptions
        });
    };

    return (
        <div>
            <label htmlFor={`DrugName-${index}`}>Drug Name</label>
            <input type="text" name="DrugName" id={`DrugName-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugName || ''} onChange={handleChange} />

            <label htmlFor={`DrugRoute-${index}`}>Drug Route</label>
            <select name="DrugRoute" id={`DrugRoute-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugRoute || 'N/A'} onChange={handleChange} required>
                <option value="N/A">---</option>
                <option value="Oral">Oral</option>
                <option value="Intravenous">Intravenous</option>
                <option value="Intramuscular">Intramuscular</option>
            </select>

            <label htmlFor={`DrugNumberUnit-${index}`}>Drug Number Unit</label>
            <input type="text" name="DrugNumberUnit" id={`DrugNumberUnit-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugNumberUnit || ''} onChange={handleChange} />

            <label htmlFor={`DrugFrequency-${index}`}>Drug Frequency</label>
            <input type="text" name="DrugFrequency" id={`DrugFrequency-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugFrequency || ''} onChange={handleChange} />

            <label htmlFor={`DrugDose-${index}`}>Dose</label>
            <input type="number" name="DrugDose" id={`DrugDose-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugDose || ''} onChange={handleChange} />

            <label htmlFor={`DrugStartDate-${index}`}>Drug Start Date</label>
            <input type="date" name="DrugStartDate" id={`DrugStartDate-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugStartDate || ''} onChange={handleChange} />

            <label htmlFor={`DrugOtherInstructions-${index}`}>Other Instructions</label>
            <input type="text" name="DrugOtherInstructions" id={`DrugOtherInstructions-${index}`} value={formData.ClinicalPrescriptions[index]?.DrugOtherInstructions || ''} onChange={handleChange} />

        </div>
    );
};

export default Drug;

