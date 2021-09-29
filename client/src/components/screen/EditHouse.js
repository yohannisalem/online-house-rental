import React, { useState, useEffect } from 'react'
import { TextArea, Progress, Form, Container, Input, Segment } from 'semantic-ui-react'
import storage from '../../firebase'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';
const EditHouse = () => {
    let history  = useHistory()
    let params = useParams()
    const [disable, setDisable] = useState(true);
    const [housename, setHousename] = useState('')
    const [description, setDescription] = useState('')
    const [numberofbeds, setNumberOfBeds] = useState(0)
    const [district, setDistrict] = useState('')
    const [sefer, setSefer] = useState('')
    const [termsandcondition, setTermsandcondition] = useState('')
    const [leaseperiod, setLeaseperiod] = useState('')
    const [feepermonth, setFeeperMonth] = useState(0)
    const [size, setSize] = useState(0)
    const [available, setAvailable] = useState(false)
    const [propertytype, setPropertytype] = useState('')
    const [vid, setVideo] = useState(null)
    const [imageUrls, setImageUrls] = useState([]);
    const [videourl, setVideoUrls] = useState([]);
    const [video, setVideos] = useState('')
    const [files,setFile] = useState([])
    const [file, setFiles] = useState([]);

    const [multipleFiles, setMultipleFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const handleVideoChange = (e) => {
        e.preventDefault()
        setVideo(e.target.files[0])

    }
    const handleNameChange = (e) => {
        setHousename(e.target.value)
        console.log(housename)
    }
    const handleDescrptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleDestrictChange = (e) => {
        setDistrict(e.target.value)
    }
    const handleSeferChange = (e) => {
        setSefer(e.target.value)
    }
    const handleTermandConditionChange = (e) => {
        setTermsandcondition(e.target.value)
    }
    const handleLeaseperiodChange = (e) => {
        setLeaseperiod(e.target.value)
    }
    const handleTypeChange = (e) => {
        setPropertytype(e.target.value)
    }
    const handleFeeChange = (e) => {
        setFeeperMonth(e.target.value)
    }
    const handleSizeChange = (e) => {
        setSize(e.target.value)
    }
    const handleAvailableChange = (e) => {
        setAvailable(e.target.value)
    }
    const handleBedChange = (e) => {
        setNumberOfBeds(e.target.value)
    }
    const houseId = params.houseId
    const updateHouse = async (housedata) => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        try {
            alert(video)
            const res = await axios.put(`http://localhost:5000/api/updateHouse/${houseId}`, {
                housename,description,district,sefer,termsandcondition,leaseperiod,numberofbeds,
                size,feepermonth,available,propertytype,video
            }, config);
            console.log(res)
            alert("updated successfully")
            history.push('/managelisting')
        } catch (err) {
            console.log(err)
            alert("failed to update")
        }
    };
    const handleUpload = () => {
        const promises = [];
        const uploadTaskTwo = storage.ref(`images/${vid.name}`).put(vid)
        promises.push(uploadTaskTwo);
        uploadTaskTwo.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                const urls = await storage.ref("images").child(vid.name).getDownloadURL()
                setVideoUrls((prevState) => [...prevState, urls]);
                console.log("this is a video part", urls)

            }

        )

        file.map((image) => {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    const urls = await storage.ref("images").child(image.name).getDownloadURL();
                    setImageUrls((prevState) => [...prevState, urls]);
                    console.log("this is a iamge part", urls)

                }
            );

        });
        Promise.all(promises)
            .then(
                () => {
                    alert("All data is uploaded to the firebase storage")
                    setDisable(false)
                }
            ).then()
            .catch((err) => console.log(err));

    };
    useEffect(() => {
        if (!localStorage.getItem("landlordToken")) {
          history.push("/landlordLogin")
        }
     
      }, [history]);
    
    return (
        <div style={{backgroundColor:"lightGray"}}>
            <Container>

                Build your listing to find the perfect renter — listings with a lot of detail and photos tend to attract the most leads, so don’t be shy! Not sure what to include? Check out our tips and tricks here.
                <Form>

                    <Segment raised >
                        <Progress percent={progress} success progress />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='housename'
                            type='text'
                            label='House Name'
                            placeholder='house name'

                            onChange={handleNameChange}
                        />
                        <Form.Field
                            required
                            id='property type'
                            control={Input}
                            label='Property Type'
                            name='propertytype'
                            placeholder='property type'

                            onChange={handleTypeChange}
                        />

                        <Form.Field
                            required
                            id='district'
                            control={Input}
                            label='District'
                            name='district'
                            placeholder='District or Sub City'

                            onChange={handleDestrictChange}
                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            label='Sefer'
                            name='sefer'
                            placeholder='Sefer or Village'

                            onChange={handleSeferChange}
                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            label='leaseperiod'
                            name='leaseperiod'
                            placeholder='leaseperiod'

                            onChange={handleLeaseperiodChange}
                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={TextArea}
                            label='Terms'
                            name='termsandcondition'
                            placeholder='Termsandcondition'

                            onChange={handleTermandConditionChange}

                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={TextArea}
                            label='Description'
                            name='description'
                            placeholder='House description'

                            onChange={handleDescrptionChange}

                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            type="number"
                            name='size'
                            label='Square Footage'
                            placeholder='Size of a house'

                            onChange={handleSizeChange}

                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            type="number"
                            name='feepermonth'
                            label='Lease Fee'
                            placeholder='Fee'

                            onChange={handleFeeChange}
                        />
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            type="number"
                            name='numberofbeds'
                            label='Number of Beds'
                            placeholder='beds'

                            onChange={handleBedChange}
                        />
                      
                        <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            type="file"
                            label='Videos about the house'
                            onChange={handleVideoChange}

                        />

                        <select name="available" id="available" onChange={handleAvailableChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <select name="video" id="available" onChange={e=>setVideos(e.target.value)}>
                            <option value={videourl}>video</option>
                            
                        </select>
                        <button onClick={handleUpload}>update upload</button>
                        <button onClick={updateHouse} disabled={disable}>update</button>

                    </Segment>


                </Form>
                {/*           {location.loaded ? JSON.stringify(location) : "not loaded correctly"}
*/}
            </Container>
        </div>
    )
}

export default EditHouse
