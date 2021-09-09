import axios from 'axios'
import React,{useState} from 'react'
import { Form,Button,Input,Header,Checkbox,Divider } from 'semantic-ui-react'
const ContractForm = () => {
    const [tenantEmail, setTenantEmail] = useState("")

    const sendEmail = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/sendContractForm",
            { tenantEmail },
            config
          );
         console.log(data)
    
        } catch (error) {
        console.log(error)
        }
      };
    return (
        <div>
            <Form>
        
        <Form.Field>
        <label>email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={tenantEmail}
            onChange={(e) => setTenantEmail(e.target.value)}
          />
        </Form.Field>
  
        <Button onClick={sendEmail}>Submit</Button>
    </Form>
        </div>
    )
}

export default ContractForm
