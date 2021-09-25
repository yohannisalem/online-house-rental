import React, { Component } from 'react'
import { Button, Container, Label, TransitionablePortal, Segment, Header, Image } from 'semantic-ui-react'
import SignaturePanel from './SignaturePanel'

class TextPlaceHolder extends Component {
    constructor(props){
        super(props);
        this.state = {
            trimmedDataURL : null,
            open : false    
        }
    }
    signPad = {}
    clear = () => {
        this.signPad.clear()
    }
    trimSignature = () => {
        this.setState({ trimmedDataURL: this.signPad.getTrimmedCanvas()
            .toDataURL('image/svg') })
            this.setState({open:false})
    }
    setOpen = (props) => {
        this.setState({open: !props})
    }
    
    render() {
        const { trimmedDataURL} = this.state
        
        //this.setOpen(false)
        return <Container>
            
            <Label content={'Cick here to sign'} onClick={() => {this.setOpen(this.state.open)}}></Label>
            <TransitionablePortal
                open= {this.state.open}
                transition={{animation:'browse',duration: 500 }}
                >
                    <Segment style={{
                        left: '40%',
                        position: 'fixed',
                        top: '30%',
                        zIndex: 1000,
                    }}  
                    >
                        <Header>Please use the mouse to sign!</Header>
                        <SignaturePanel canvasProps={{width: '100%',height: '100%' }}
                            ref={(ref) => {this.signPad = ref}} />

                        <Button onClick={this.trimSignature}>Save</Button>
                    </Segment>
            </TransitionablePortal>
            {trimmedDataURL 
                ? <Image style={{backgroundSize:' 200px 50px',
                    width: '200px',
                    height: '50px',
                    backgroundColor: 'white'}} src={trimmedDataURL}/>
                : ''}
                {/* {JSON.stringify(this.state.trimmedDataURL)} */}
        </Container>
    }
    
}


export default TextPlaceHolder