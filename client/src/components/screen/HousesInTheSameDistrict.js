import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Breadcrumb, Image, Card, Segment, Container } from 'semantic-ui-react'
import { useParams,Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
const HousesInTheSameDistrict = ({ match }) => {
  let params = useParams()
  const [multipleFiles, setMultipleFiles] = useState([])
  const housesDistrict = params.district
  const apiUrl = `http://localhost:5000/api/getFilesByDistrict/${housesDistrict}`;


  const getMultipleFilesList = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      console.log(data)
      setMultipleFiles(data);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housesDistrict])
  return (
    <div >

      {multipleFiles.map((element, index) =>
        <Container style={{marginTop:"100px"}}>
          <Segment>
            <Breadcrumb >
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section as={Link} to={`/houseDistrict/${element.district}`}>{element.district}</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{element.sefer}</Breadcrumb.Section>
            </Breadcrumb>
            <Swiper
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {element.files.map((url, index) =>
                <div className="col-6">
                  <SwiperSlide key={index}>
                    <Image src={url} wrapped alt="img" />
                  </SwiperSlide>
                </div>
              )}
            </Swiper>
          </Segment>


        </Container>


      )}

    </div>
  )
}

export default HousesInTheSameDistrict
