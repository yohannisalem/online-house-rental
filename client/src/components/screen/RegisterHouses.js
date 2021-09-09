import React, { useState } from 'react';
import storage from "../../firebase";
const RegisterHouses = () => {
  const [housedata,setHouseData]= useState(null)
/*   */
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [video, setVideo] = useState(null);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setHouseData({ ...housedata, [e.target.name]: value });
  // };
  const handleChangeForImg= (e)=>{
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setFiles((prevState) => [...prevState, newImage]);
      console.log(files)
    }

  }
  
  /* const createHouse = async (housedata) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("http://localhost:5000/api/multipleFiles", housedata,config); 
      console.log(res) 
    } catch (err) {
      console.log(err)
    }
  };
 */
 /*  const upload = (items) => {
    items.forEach((item) => {
      var uploadTask = null;
      console.log(item.files)
      
      const fileName = new Date().getTime() + item.label + item.file.name;
      uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            
            setHouseData((prev) => {
              return [ ...prev,url ];
            });
          });
        }
      );
    });
  
  }; */
  const handleUpload = () => {
    const promises = [];
    const uploadTaskTwo = storage.ref(`images/${video.name}`).put(video)
    uploadTaskTwo.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref("images")
          .child(video.name)
          .getDownloadURL()
          .then((urls) => {
            setVideoUrls((prevState) => [...prevState, urls]);
          });
      }
    );
    files.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setImageUrls((prevState) => [...prevState, urls]);
            });
        }
      );
      
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));

      console.log(imageUrls)
      console.log(videoUrls)
  };
  /* const handleUpload = (e) => {
    e.preventDefault();
    var uploadTask = null;
    const promises = [];
    files.map((image) => {
      uploadTask = storage.ref(`files/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setHouseData((prev) => {
              return { ...prev, [image]: url };
            });
            });
        }
      );
    });
      uploadTask = storage.ref(`files/${video.name}`).put(video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setHouseData((prev) => {
              return {...prev, [video]:url};
            });
          });
        }
      );
    console.log(housedata)
    createHouse(housedata);
  }; */

    return (      
    <div>
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        {/* <div className="addProductItem">
          <label>House Name</label>
          <input
            type="text"
            placeholder="housename"
            name="housename"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Fee per Month</label>
          <input
            type="number"
            placeholder="feepermonth"
            name="feepermonth"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="number"
            placeholder="size"
            name="size"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Number of Beds</label>
          <input
            type="number"
            placeholder="numberofbeds"
            name="numberofbeds"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>propertytype</label>
          <input
            type="text"
            placeholder="propertytype"
            name="propertytype"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Available?</label>
          <select name="available" id="available" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div> */}
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleChangeForImg}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
      </form>
    </div>
    )
}

export default RegisterHouses
