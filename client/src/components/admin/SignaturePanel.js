import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SignaturePad from 'signature_pad';
import trimCanvas from 'trim-canvas';

export default class SignaturePanel extends Component {
    static propTypes = {
      velocityFilterWeight: PropTypes.number,
      minWidth: PropTypes.number,
      maxWidth: PropTypes.number,
      minDistance: PropTypes.number,
      dotSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      penColor: PropTypes.string,
      throttle: PropTypes.number,
      onEnd: PropTypes.func,
      onBegin: PropTypes.func,
      canvasProps: PropTypes.object,
      clearOnResize: PropTypes.bool,
    }

    static defaultProps = {
      clearOnResize : true
    }

    _signPad = null

    _excludeProps = () => {
      const { canvasProps, clearOnResize, ...signPadProps } = this.props
      return signPadProps
    }

    componentDidMount () {
      this._signPad = new SignaturePad(this._canvas, this._excludeProps())
      // this._resizeCanvas()
      // this.on()
    }

    componentWillUnmount () {
      this.off()
    }

    componentDidUpdate () {
      Object.assign(this._signPad, this._excludeProps())
    }

    getCanvas = () => {
      return this._canvas
    }

    getTrimmedCanvas = () => {
      // copy the canvas
      const copy = document.createElement('canvas')
      copy.width = this._canvas.width
      copy.height = this._canvas.height
      copy.getContext('2d').drawImage(this._canvas, 0, 0)
      // then trim it
      return trimCanvas(copy)
    }

    getSignaturePad = () => {
      return this._signPad
    }

    render () {
      const { canvasProps } = this.props
    return <canvas ref={(ref) => { this._canvas = ref }} {...canvasProps} />
    }

    clear = () => {
      return this._signPad.clear()
    }
  
    isEmpty = () => {
      return this._signPad.isEmpty()
    }
  
    fromDataURL = (dataURL, options) => {
      return this._signPad.fromDataURL(dataURL, options)
    }
  
    toDataURL = (type, encoderOptions) => {
      return this._signPad.toDataURL(type, encoderOptions)
    }
  
    fromData = (pointGroups) => {
      return this._signPad.fromData(pointGroups)
    }
  
    toData = () => {
      return this._signPad.toData()
    }
    // on = () => {
    //   window.addEventListener('resize', this._checkClearOnResize)
    //   return this._signPad.on()
    // }
  
    off = () => {
      window.removeEventListener('resize', this._checkClearOnResize)
      return this._signPad.off()
    }
}