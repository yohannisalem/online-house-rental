import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Feed, Grid } from 'semantic-ui-react'
const date = '3 days ago'
const summary = 'Laura Faucet created a post'
const extraText = "Have you seen what's going on in Israel? Can you believe it."
const Reports = () => {
    const [multipleFiles, setMultipleFiles] = useState([]);
    const getMultipleFiles = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/report/getreport');
            return data;
        } catch (error) {
            throw error;
        }
    }
    const getMultipleFilesList = async () => {
        try {
            const fileslist = await getMultipleFiles();
            setMultipleFiles(fileslist);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMultipleFilesList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div style={{ height: "100vh"}}>
            {
                multipleFiles.map((house, index) =>
                    <Grid>
                        <Grid.Column width="5"></Grid.Column>
                        <Grid.Column width="11" textAlign="right" verticalAlign="middle">
                        <Feed>
                            <Feed.Event
                                date={house.createdAt}
                                summary={house.description}
                                extraText={extraText}
                            />

                        </Feed>
                        </Grid.Column>
                        
                    </Grid>



                )}
        </div>
    )
}

export default Reports
