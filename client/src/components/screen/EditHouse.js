import React, { useState } from 'react'
import { TextArea,Progress, Form, Grid, Input, Segment } from 'semantic-ui-react'
import storage from '../../firebase'
import axios from 'axios'
import { useParams,useHistory} from 'react-router-dom';
const EditHouse = ({house}) => {
    const history = useHistory()
    let params = useParams()
    const [housename, setHousename] = useState('')
    const [description, setDescription] = useState('')
    const [numberofbeds, setNumberOfBeds] = useState(0)
    const [district, setDistrict] = useState('')
    const [sefer, setSefer] = useState('')
    const [feepermonth, setFeeperMonth] = useState(0)
    const [size, setSize] = useState(0)
    const [available, setAvailable] = useState(false)
    const [propertytype, setPropertytype] = useState('')
    const [video, setVideo] = useState(null)
    const [imageUrls, setImageUrls] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.name)
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setFiles((prevState) => [...prevState, newImage]);
        }
    };
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
            const res = await axios.put(`http://localhost:5000/api/updateHouse/613a46b3075a6bf2db49cfee`, housedata, config);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    };
    const handleMultipleFileSubmit = async (id) => {
        const formData = new FormData();
        formData.append('housename', housename);
        formData.append('description', description);
        formData.append('district', district);
        formData.append('sefer', sefer);
        formData.append('numberofbeds', numberofbeds);
        formData.append('size', size);
        formData.append('feepermonth', feepermonth);
        formData.append('available', available);
        formData.append('propertytype', propertytype);
        formData.append('video', videoUrls);
        for (let i = 0; i < imageUrls.length; i++) {
            formData.append('files', imageUrls[i]);
        }
        await updateHouse(formData);
        console.log(formData)
        history.push('/managelisting')

    }
    const handleUpload = () => {
        const promises = [];
        const uploadTaskTwo = storage.ref(`images/${video.name}`).put(video)
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
                const urls = await storage.ref("images").child(video.name).getDownloadURL()
                setVideoUrls((prevState) => [...prevState, urls]);
                console.log("this is a video part", urls)

            }

        )

        files.map((image) => {
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
                () => alert("All images uploaded")
            ).then()
            .catch((err) => console.log(err));

    };
    
    return (
        <div>
            <Grid>
                <Grid.Column textAlign='center'>
                    <Form>
                        <Segment raised >
                            <Progress percent={progress} success progress />
                            {houseId}
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
                                control={Input}
                                type="file"
                                name="files"
                                multiple
                                label='Photos of the House'
                                icon='upload'
                                onChange={handleChange}
                            />
                            <Form.Field
                                required
                                id='form-input-control-last-name'
                                control={Input}
                                type="file"
                                name="video"
                                label='Videos about the house'
                                onChange={handleVideoChange}

                            />

                            <select name="available" id="available" onChange={handleAvailableChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                            <button onClick={handleUpload}>confirm Update</button>
                            <button onClick={handleMultipleFileSubmit}>Update</button>

                        </Segment>
                    </Form>
                </Grid.Column>

            </Grid>
        </div>
    )
}

export default EditHouse
