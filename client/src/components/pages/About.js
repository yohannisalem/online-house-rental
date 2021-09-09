import React from 'react'

const About = () => {
    const subscribe = async()=>{
        let sw = await navigator.serviceWorker.ready;
        let push = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            'BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U'
        });
        console.log(JSON.stringify(push));
      }

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
          let sw = await navigator.serviceWorker.register('./serviceworker.js');
          console.log(sw);
        });
      }
    return (
        <div style={{marginTop:"30px"}}>
            <h2>About page</h2>
            <button onClick={()=>subscribe()}>subscribe</button>
            <p>
              console.log(fdsh);
              dsgks
              sdfhfksdhf
            </p>
        </div>
    )
}

export default About
