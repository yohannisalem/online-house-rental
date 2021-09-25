
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Input, Progress, Segment, TextArea } from "semantic-ui-react";
import storage from "../../firebase";
import useGeoLocation from "../maps/useGeoLocation";

const publicVapidKey = 'BMffGk0gRxLPOSi-eOlXoR1ahY9Ce7uBY3010C06TeMoRYS_6n1A4ItVeOeNYutDlhPK27WW5UMrdyjBEj_-Pxo';
//register the service worker, register our push api, sedn the notifation

async function send() {
  //register service worker
  const register = await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });

  //register push
  console.log('Registering push...')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  //Send push notification
  await fetch("http://localhost:5000/api/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const FileUp = () => {

  let history = useHistory()
  const [error, setError] = useState("");

  const location = useGeoLocation()
  const [disable, setDisable] = useState(true);
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
    console.log(e.target.name)
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setFiles((prevState) => [...prevState, newImage]);
    }
  };
  const handleVideoChange = (e) => {
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

  

  const createHouse = async (housedata) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    try {
      const res = await axios.post("http://localhost:5000/api/multipleFiles", housedata, config);
      send()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  };
  const handleMultipleFileSubmit = async () => {
    const formData = new FormData();
    formData.append('ownerusername', localStorage.getItem("username"));
    formData.append('owneremail', localStorage.getItem("email"));
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

    await createHouse(formData);
    console.log(formData)

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
        () =>{
         alert("All images uploaded")
         setDisable(false)
        }
          
      ).then()
      .catch((err) => console.log(err));

  };
  useEffect(() => {
    if (!localStorage.getItem("landlordToken")) {
      history.push("/landlordLogin")
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("landlordToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:5000/api/private", config);

      } catch (error) {
        /* localStorage.removeItem("landlordToken"); */
        setError("You are not authorized please login");
      }
    };

    /* fetchPrivateDate(); */
  }, [history]);

  /* handling notification ======================================================================*/
  /* if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
  }

  async function send() {
    //register service worker
    const register = await navigator.serviceWorker.register('/sw.js');

    //register push
    console.log('Registering push...')
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    //Send push notification
    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
  } */
  /* handling notification ======================================================================*/
  return (
    <div>
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
              value={size}
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
            <button onClick={handleUpload}>create upload</button>
            <button onClick={handleMultipleFileSubmit} disabled={disable}>final Upload</button>

          </Segment>
        </Form>
        {/*           {location.loaded ? JSON.stringify(location) : "not loaded correctly"}
 */}
      </Container>
    </div>
  );
}

export default FileUp

/*


*/


