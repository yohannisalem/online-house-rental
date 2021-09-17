import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, GridColumn, GridRow, Image } from 'semantic-ui-react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


SwiperCore.use([Navigation, Pagination, Scrollbar]);
const RelatedHouses = ({ sefer }) => {
  const [houseData, setHouseData] = useState([])
  const apiUrl = `http://localhost:5000/api/getFilesBySefer/${sefer}`;
  const getMultipleFilesList = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setHouseData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseData])
  return (
    <div>
      <Grid>
        <GridRow columns={3}>

          {houseData.map((element, index) =>

            <GridColumn>
              <Swiper
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
              >
                {element.files.map((url, index) =>
                  <div className="col-6">
                    <SwiperSlide key={index} style={{ height: "40vh" }}>
                      <Image src={url} wrapped alt="img" style={{objectFit:"contain"}}/>
                    </SwiperSlide>
                  </div>
                )}
              </Swiper>
            </GridColumn>

          )}
        </GridRow>
      </Grid>

    </div>
  )
}

export default RelatedHouses
