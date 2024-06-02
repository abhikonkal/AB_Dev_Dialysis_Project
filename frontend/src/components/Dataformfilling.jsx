import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../componentscss/Dataformfilling.module.css';
import Drug from './Drug';
import {SERVER_PATH,CLIENT_PATH} from '../paths/path';;

const Dataformfilling = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        submittedUserId: id,
        name: '',
        age: '',
        crno: '',
        gender: '',
        race: '',
        height: '',
        datinithemodia: '',
        sessiondate: '',
        primarydisease: '',
        // laboratory investigation part
        Hemoglobin: '',
        Hematocrit: '',
        Plateletcount: '',
        Reticulocytecount: '',
        Serumtotalprotein: '',
        Serumalbumin: '',
        ALP: '',
        SerumSodium: '',
        SerumPotassium: '',
        SerumCalcium: '',
        SerumPhosphate: '',
        SerumiPTH: '',
        SerumFerritin: '',
        SerumIron: '',
        SerumTIBC: '',
        BNP: '',
        CRP: '',
        //drugs
        ClinicalPrescriptions: [], //array of objects
        //Clinical Evaluation Details
        Pulmonarycongestion: '',
        PleuralEffusion: '',
        OxygenAdminsitration: '',
        Edema: '',
        PreDialyticHypotension: '',
        PreDialyticHypertension: '',
        FrequencyOfDialysis: '',
        MembraneAreaofDialyzer: '',
        DialysisSessionKtvAchieved: '',
        FluxofDialyzer: '',
        BloodFlowRate: '',
        DialysateFlowrate: '',
        DialysateSodium: '',
        DialysateTemperature: '',
        ResidualUrineVolume: '',
        InjectableGiven: '',
        InterdialyticWeightGain: '',
        UltrafiltrationAchieved: '',
        DurationOfDialysis: '',
        UltrafiltrationRate: '',
        CardiothoracicRatio: '',
        SystolicBPpreDialysis: '',
        DiastolicBPpreDialysis: '',
        PulseRate: '',
        BodyTemp: '',
        OxygenSaturation: '',
        IntradialyticHypertension: '',
        Nausea: '',
        Vomiting: '',
        Headache: '',
        MuscleCramps: '',
        OtherComplication: '',
        //ECHO CARDIO
        AorticRootdiameter: '',
        IVCdiameter: '',
        LAdiameter: '',
        LAVi: '',
        LVEDD: '',
        LVESD: '',
        LVEDVi: '',
        LVESVi: '',
        LVMI: '',
        LVOTdiameter: '',
        LVEjectionFraction: '',
        IVCcollapsibility: '',
        RAsurface: '',
        RVbasediameter: '',
        //BIO IMPEDANCE
        PreDialyticOverhydration: '',
        PostDialyticOverhydration: '',
        LeanTissueIndex: '',
        FatTissueIndex: '',
        Totalbodywater: '',
        ExtracellularWater: '',
        IntracellularWater: '',
        ECWICW: '',
        //ULTRASOUND
        USGBlinescore: '',
        DryWeight: '',
        VascularAccess: [],
        Serostatus: []
    });


    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPermission = async () => {
            try {
                const response = await fetch(`${SERVER_PATH}/dataformfilling/${id}`);
                if (response.status === 200) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                    setError('You do not have permission to access this form.');
                }
            } catch (error) {
                setIsAuthorized(false);
                setError('Error checking permissions.');
            }
        };
        fetchPermission();
    }, [id]);

    const [numDrugs, setNumDrugs] = useState(1); // State to keep track of the number of drugs
    
    const handleAddDrug = () => {
        setNumDrugs(numDrugs + 1); // Increment the number of drugs
    };


    const handleChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;
        if (type === 'select-multiple') {
            const values = Array.from(selectedOptions).map(option => option.value);
            setFormData({
                ...formData,
                [name]: values
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const response = await fetch(`${SERVER_PATH}/dataformfilling/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const res=await response.json();
            if (res.statuscode === 200) {
                // Handle successful submission
                window.location.href = `/userdashboard/${id}`;
            } else {
                // Handle submission error
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    if (!isAuthorized) {
        return (
            <div>
                <div className={styles.container}>
                    <p>{error}</p>
                </div>
            </div>
        );
    }


    return (
        <div>
            <Header />
            <div>
                <form className={styles.signinform} onSubmit={handleSubmit}>
                    <h2>Welcome, Please fill the below form</h2>

                    <label htmlFor="name">Name</label>
                    <input type="text" required id="name" name="name" value={formData.name} onChange={handleChange} autoFocus />

                    <label htmlFor="age">Age</label>
                    <input type="number" required id="age" name="age" value={formData.age} onChange={handleChange} />

                    <label htmlFor="crNum">CR No.</label>
                    <input type="number" required id="crNum" name="crno" value={formData.crno} onChange={handleChange} />

                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Male" id="Male">Male</option>
                        <option value="Female" id="Female">Female</option>
                        <option value="Transgender" id="Transgender">Transgender</option>
                    </select>

                    <br />
                    <label className={styles.attselect}>Race</label>
                    <select name="race" id="race" value={formData.race} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Indian" id="Indian">Indian</option>
                        <option value="American Indian">American Indian</option>
                        <option value="Alaskan Native">Alaskan Native</option>
                        <option value="Asian">Asian</option>
                        <option value="Black">Black</option>
                        <option value="African American">African American</option>
                        <option value="Hispanic" id="Hispanic">Hispanic</option>
                        <option value="Latino" id="Latino">Latino</option>
                        <option value="Native Hawaiian" id="Native Hawaiian">Native Hawaiian</option>
                        <option value="pacific islander" id="pacific islander">Pacific Islander</option>
                        <option value="white" id="white">White</option>
                    </select>

                    <label htmlFor="height">Height (in cm)</label>
                    <input name="height" type="number" id="height" value={formData.height} onChange={handleChange} required />

                    <label htmlFor="DOI">Date of initiation of hemodialysis</label>
                    <input type="date" name="datinithemodia" id="DOI" value={formData.datinithemodia} onChange={handleChange} />

                    <label htmlFor='sessiondate'>Session date</label>
                    <input type="date" name="sessiondate" id="sessiondate" value={formData.sessiondate} onChange={handleChange} />

                    <label htmlFor="disease">Name of the primary disease</label>
                    <input type="text" name="primarydisease" id="disease" value={formData.primarydisease} onChange={handleChange} />

                    <h2>Laboratory investigation</h2>
                    <label htmlFor="Hemoglobin">Hemoglobin</label>
                    <input type="number" step="0.01" name="Hemoglobin" id="Hemoglobin" value={formData.Hemoglobin} onChange={handleChange} />

                    <label htmlFor="Hematocrit">Hematocrit</label>
                    <input type="number" step="0.01" name="Hematocrit" id="Hematocrit" value={formData.Hematocrit} onChange={handleChange} />

                    <label htmlFor="PlateletCount">Platelet count</label>
                    <input type="number" step="0.01" name="Plateletcount" id="PlateletCount" value={formData.Plateletcount} onChange={handleChange} />

                    <label htmlFor="ReticulocyteCount">Reticulocyte count</label>
                    <input type="number" step="0.01" name="Reticulocytecount" id="ReticulocyteCount" value={formData.Reticulocytecount} onChange={handleChange} />

                    <label htmlFor="SerumTotalProtein">Serum total protein</label>
                    <input type="number" step="0.01" name="Serumtotalprotein" id="SerumTotalProtein" value={formData.Serumtotalprotein} onChange={handleChange} />

                    <label htmlFor="SerumAlbumin">Serum albumin</label>
                    <input type="number" step="0.01" name="Serumalbumin" id="SerumAlbumin" value={formData.Serumalbumin} onChange={handleChange} />

                    <label htmlFor="ALP">ALP</label>
                    <input type="number" step="0.01" name="ALP" id="ALP" value={formData.ALP} onChange={handleChange} />

                    <label htmlFor="SerumSodium">Serum Sodium</label>
                    <input type="number" step="0.01" name="SerumSodium" id="SerumSodium" value={formData.SerumSodium} onChange={handleChange} />

                    <label htmlFor="SerumPotassium">Serum Potassium</label>
                    <input type="number" step="0.01" name="SerumPotassium" id="SerumPotassium" value={formData.SerumPotassium} onChange={handleChange} />

                    <label htmlFor="SerumCalcium">Serum Calcium</label>
                    <input type="number" step="0.01" name="SerumCalcium" id="SerumCalcium" value={formData.SerumCalcium} onChange={handleChange} />

                    <label htmlFor="SerumPhosphate">Serum Phosphate</label>
                    <input type="number" step="0.01" name="SerumPhosphate" id="SerumPhosphate" value={formData.SerumPhosphate} onChange={handleChange} />

                    <label htmlFor="SerumiPTH">Serum iPTH</label>
                    <input type="number" step="0.01" name="SerumiPTH" id="SerumiPTH" value={formData.SerumiPTH} onChange={handleChange} />

                    <label htmlFor="SerumFerritin">Serum Ferritin</label>
                    <input type="number" step="0.01" name="SerumFerritin" id="SerumFerritin" value={formData.SerumFerritin} onChange={handleChange} />

                    <label htmlFor="SerumIron">Serum Iron</label>
                    <input type="number" step="0.01" name="SerumIron" id="SerumIron" value={formData.SerumIron} onChange={handleChange} />

                    <label htmlFor="SerumTIBC">Serum TIBC</label>
                    <input type="number" step="0.01" name="SerumTIBC" id="SerumTIBC" value={formData.SerumTIBC} onChange={handleChange} />

                    <label htmlFor="BNP">BNP</label>
                    <input type="number" step="0.01" name="BNP" id="BNP" value={formData.BNP} onChange={handleChange} />

                    <label htmlFor="CRP">CRP</label>
                    <input type="number" step="0.01" name="CRP" id="CRP" value={formData.CRP} onChange={handleChange} />

                    <h2>Clinical prescription</h2>
                    {[...Array(numDrugs)].map((_, index) => ( // Render Drug components based on numDrugs
                        <Drug key={index} formData={formData} setFormData={setFormData} index={index} count={numDrugs-1}/>
                    ))}
                    <button onClick={handleAddDrug}>Add Drug</button>


                    <h2>Clinical EValuation Details</h2>
                    <label htmlFor="Pulmonarycongestion">Pulmonary congestion</label>
                    <select name="Pulmonarycongestion" id="Pulmonarycongestion" value={formData.Pulmonarycongestion} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="PleuralEffusion">Pleural effusion</label>
                    <select name="PleuralEffusion" id="PleuralEffusion" value={formData.PleuralEffusion} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>


                    <label htmlFor="OxygenAdminsitration">Oxygen administration</label>
                    <select name="OxygenAdminsitration" id="OxygenAdminsitration" value={formData.OxygenAdminsitration} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>


                    <label htmlFor="Edema">Edema</label>
                    <select name="Edema" id="Edema" value={formData.Edema} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>


                    <label htmlFor="PreDialyticHypotension">Pre-dialytic hypotension</label>
                    <select name='PreDialyticHypotension' id='PreDialyticHypotension' value={formData.PreDialyticHypotension} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>


                    <label htmlFor="PreDialyticHypertension">Pre-dialytic hypertension</label>
                    <select name='PreDialyticHypertension' id='PreDialyticHypertension' value={formData.PreDialyticHypertension} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>


                    <h2>Details of dialysis Record</h2>
                    <label htmlFor="FrequencyOfDialysis">Frequency of dialysis</label>
                    <select name='FrequencyOfDialysis' id="FrequencyOfDialysis" value={formData.FrequencyOfDialysis} onChange={handleChange}>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Daily" id="Daily">Daily</option>
                        <option value="Alternate days" id="Alternate days">Alternate days</option>
                        <option value="Twice a week" id="Twice a week">Twice a week</option>
                        <option value="Thrice a week" id="Thrice a week">Thrice a week</option>
                    </select>


                    <label htmlFor="MembraneAreaofDialyzer">Membrane area of dialyzer</label>
                    <input type="text" name="MembraneAreaofDialyzer" id="MembraneAreaofDialyzer" value={formData.MembraneAreaofDialyzer} onChange={handleChange} />

                    <label htmlFor="DialysisSessionKtvAchieved">Dialysis session Kt/V achieved</label>
                    <input type="text" name="DialysisSessionKtvAchieved" id="DialysisSessionKtvAchieved" value={formData.DialysisSessionKtvAchieved} onChange={handleChange} />

                    <label htmlFor="FluxofDialyzer">Flux of dialyzer</label>
                    <input type="text" name="FluxofDialyzer" id="FluxofDialyzer" value={formData.FluxofDialyzer} onChange={handleChange} />

                    <label htmlFor="BloodFlowRate">Blood flow rate</label>
                    <input type="text" name="BloodFlowRate" id="BloodFlowRate" value={formData.BloodFlowRate} onChange={handleChange} />

                    <label htmlFor="DialysateFlowrate">Dialysate flow rate</label>
                    <input type="text" name="DialysateFlowrate" id="DialysateFlowrate" value={formData.DialysateFlowrate} onChange={handleChange} />

                    <label htmlFor="DialysateSodium">Dialysate Sodium</label>
                    <input type="text" name="DialysateSodium" id="DialysateSodium" value={formData.DialysateSodium} onChange={handleChange} />

                    <label htmlFor="DialysateTemperature">Dialysate temp</label>
                    <input type="number" step="0.01" name="DialysateTemperature" id="DialysateTemperature" value={formData.DialysateTemperature} onChange={handleChange} />

                    <label htmlFor="ResidualUrineVolume">Residual urine volume</label>
                    <input type="text" name="ResidualUrineVolume" id="ResidualUrineVolume" value={formData.ResidualUrineVolume} onChange={handleChange} />

                    <label htmlFor="InjectableGiven">Injectable given</label>
                    <input type="text" name="InjectableGiven" id="InjectableGiven" value={formData.InjectableGiven} onChange={handleChange} />

                    <label htmlFor="InterdialyticWeightGain">Interdialytic weight gain</label>
                    <input type="number" step="0.01" name="InterdialyticWeightGain" id="InterdialyticWeightGain" value={formData.InterdialyticWeightGain} onChange={handleChange} />

                    <label htmlFor="UltrafiltrationAchieved">Ultrafiltration achieved</label>
                    <input type="text" name="UltrafiltrationAchieved" id="UltrafiltrationAchieved" value={formData.UltrafiltrationAchieved} onChange={handleChange} />

                    <label htmlFor="DurationOfDialysis">Duration of dialysis</label>
                    <input type="text" name="DurationOfDialysis" id="DurationOfDialysis" value={formData.DurationOfDialysis} onChange={handleChange} />

                    <label htmlFor="UltrafiltrationRate">Ultrafiltration rate</label>
                    <input type="text" name="UltrafiltrationRate" id="UltrafiltrationRate" value={formData.UltrafiltrationRate} onChange={handleChange} />

                    <label htmlFor="CardiothoracicRatio">Cardiothoracic ratio</label>
                    <input type="text" name="CardiothoracicRatio" id="CardiothoracicRatio" value={formData.CardiothoracicRatio} onChange={handleChange} />

                    <label htmlFor="SystolicBPpreDialysis">Systolic BP pre-dialysis</label>
                    <input type="text" name="SystolicBPpreDialysis" id="SystolicBPpreDialysis" value={formData.SystolicBPpreDialysis} onChange={handleChange} />

                    <label htmlFor="DiastolicBPpreDialysis">Diastolic BP pre-dialysis</label>
                    <input type="text" name="DiastolicBPpreDialysis" id="DiastolicBPpreDialysis" value={formData.DiastolicBPpreDialysis} onChange={handleChange} />

                    <label htmlFor="PulseRate">Pulse rate</label>
                    <input type="text" name="PulseRate" id="PulseRate" value={formData.PulseRate} onChange={handleChange} />

                    <label htmlFor="BodyTemp">Body temp</label>
                    <input type="number" step="0.01" name="BodyTemp" id="BodyTemp" value={formData.BodyTemp} onChange={handleChange} />

                    <label htmlFor="OxygenSaturation">Oxygen saturation</label>
                    <input type="number" step="0.01" name="OxygenSaturation" id="OxygenSaturation" value={formData.OxygenSaturation} onChange={handleChange} />

                    <label htmlFor="IntradialyticHypertension">Intradialytic hypertension</label>
                    <select name="IntradialyticHypertension" id="IntradialyticHypertension" value={formData.IntradialyticHypertension} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="Nausea">Nausea</label>
                    <select name="Nausea" id="Nausea" value={formData.Nausea} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="Vomiting">Vomiting</label>
                    <select name="Vomiting" id="Vomiting" value={formData.Vomiting} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="Headache">Headache</label>
                    <select name="Headache" id="Headache" value={formData.Headache} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="MuscleCramps">Muscle cramps</label>
                    <select name="MuscleCramps" id="MuscleCramps" value={formData.MuscleCramps} onChange={handleChange} required>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Yes" id="Yes">Yes</option>
                        <option value="No" id="No">No</option>
                    </select>

                    <label htmlFor="OtherComplication">Other complication</label>
                    <input type="text" name="OtherComplication" id="OtherComplication" value={formData.OtherComplication} onChange={handleChange} />

                    <h2>Echocardiography</h2>
                    <label htmlFor="AorticRootdiameter">Aortic root diameter</label>
                    <input type="number" step="0.01" name="AorticRootdiameter" id="AorticRootdiameter" value={formData.AorticRootdiameter} onChange={handleChange} />

                    <label htmlFor="IVCdiameter">IVC diameter</label>
                    <input type="number" step="0.01" name="IVCdiameter" id="IVCdiameter" value={formData.IVCdiameter} onChange={handleChange} />

                    <label htmlFor="LAdiameter">LA diameter</label>
                    <input type="number" step="0.01" name="LAdiameter" id="LAdiameter" value={formData.LAdiameter} onChange={handleChange} />

                    <label htmlFor="LAVi">LA Vi</label>
                    <input type="number" step="0.01" name="LAVi" id="LAVi" value={formData.LAVi} onChange={handleChange} />

                    <label htmlFor="LVEDD">LVEDD</label>
                    <input type="number" step="0.01" name="LVEDD" id="LVEDD" value={formData.LVEDD} onChange={handleChange} />

                    <label htmlFor="LVESD">LVESD</label>
                    <input type="number" step="0.01" name="LVESD" id="LVESD" value={formData.LVESD} onChange={handleChange} />

                    <label htmlFor="LVEDVi">LVEDVi</label>
                    <input type="number" step="0.01" name="LVEDVi" id="LVEDVi" value={formData.LVEDVi} onChange={handleChange} />

                    <label htmlFor="LVESVi">LVESVi</label>
                    <input type="number" step="0.01" name="LVESVi" id="LVESVi" value={formData.LVESVi} onChange={handleChange} />

                    <label htmlFor="LVMI">LVMI</label>
                    <input type="number" step="0.01" name="LVMI" id="LVMI" value={formData.LVMI} onChange={handleChange} />

                    <label htmlFor="LVOTdiameter">LVOT diameter</label>
                    <input type="number" step="0.01" name="LVOTdiameter" id="LVOTdiameter" value={formData.LVOTdiameter} onChange={handleChange} />

                    <label htmlFor="LVEjectionFraction">LV Ejection fraction</label>
                    <input type="number" step="0.01" name="LVEjectionFraction" id="LVEjectionFraction" value={formData.LVEjectionFraction} onChange={handleChange} />

                    <label htmlFor="IVCcollapsibility">IVC collapsibility</label>
                    <input type="number" step="0.01" name="IVCcollapsibility" id="IVCcollapsibility" value={formData.IVCcollapsibility} onChange={handleChange} />

                    <label htmlFor="RAsurface">RA surface</label>
                    <input type="number" step="0.01" name="RAsurface" id="RAsurface" value={formData.RAsurface} onChange={handleChange} />

                    <label htmlFor="RVbasediameter">RV base diameter</label>
                    <input type="number" step="0.01" name="RVbasediameter" id="RVbasediameter" value={formData.RVbasediameter} onChange={handleChange} />

                    <h2>Bio impendence Analysis</h2>
                    <label htmlFor="PreDialyticOverhydration">Pre-dialytic overhydration</label>
                    <input type="number" step="0.01" name="PreDialyticOverhydration" id="PreDialyticOverhydration" value={formData.PreDialyticOverhydration} onChange={handleChange} />

                    <label htmlFor="PostDialyticOverhydration">Post-dialytic overhydration</label>
                    <input type="number" step="0.01" name="PostDialyticOverhydration" id="PostDialyticOverhydration" value={formData.PostDialyticOverhydration} onChange={handleChange} />

                    <label htmlFor="LeanTissueIndex">Lean tissue index</label>
                    <input type="number" step="0.01" name="LeanTissueIndex" id="LeanTissueIndex" value={formData.LeanTissueIndex} onChange={handleChange} />

                    <label htmlFor="FatTissueIndex">Fat tissue index</label>
                    <input type="number" step="0.01" name="FatTissueIndex" id="FatTissueIndex" value={formData.FatTissueIndex} onChange={handleChange} />

                    <label htmlFor="Totalbodywater">Total body water</label>
                    <input type="number" step="0.01" name="Totalbodywater" id="Totalbodywater" value={formData.Totalbodywater} onChange={handleChange} />

                    <label htmlFor="ExtracellularWater">Extracellular water</label>
                    <input type="number" step="0.01" name="ExtracellularWater" id="ExtracellularWater" value={formData.ExtracellularWater} onChange={handleChange} />

                    <label htmlFor="IntracellularWater">Intracellular water</label>
                    <input type="number" step="0.01" name="IntracellularWater" id="IntracellularWater" value={formData.IntracellularWater} onChange={handleChange} />

                    <label htmlFor="ECWICW">ECW/ICW</label>
                    <input type="number" step="0.01" name="ECWICW" id="ECWICW" value={formData.ECWICW} onChange={handleChange} />

                    <h2>Ultra Sound EValuation</h2>
                    <label htmlFor="USGBlinescore">USG B linescore</label>
                    <input type="number" step="0.01" name="USGBlinescore" id="USGBlinescore" value={formData.USGBlinescore} onChange={handleChange} />

                    <label htmlFor="DryWeight">Dry weight</label>
                    <input type="number" step="0.01" name="DryWeight" id="DryWeight" value={formData.DryWeight} onChange={handleChange} />

                    <h2>Vascular Access</h2>
                    <label htmlFor="VascularAccess">Vascular Access</label>
                    <select name="VascularAccess" id="VascularAccess" value={formData.VascularAccess} onChange={handleChange} required multiple>
                        <option value="N/A" id="N/A">---</option>
                        <option value="Fistula" id="Fistula">Fistula</option>
                        <option value="Graft" id="Graft">Graft</option>
                        <option value="Catheter" id="Catheter">Catheter</option>
                    </select>

                    <h2>Serostatus</h2>
                    <label htmlFor="Serostatus">Serostatus</label>
                    <select name="Serostatus" id="Serostatus" value={formData.Serostatus} onChange={handleChange} required multiple>
                        <option value="N/A" id="N/A">---</option>
                        <option value="HBsAg" id="HBsAg">HBsAg</option>
                        <option value="HCV" id="HCV">HCV</option>
                        <option value="HIV" id="HIV">HIV</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Dataformfilling;
