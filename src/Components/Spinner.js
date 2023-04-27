import React, { Component } from 'react'
import Plant from './Plant.gif'

export default class Spinner extends Component {
  render() {
    return (
        <div className='text-center'>
            <img src={Plant} alt="Loading" />
        </div>
    )
  }
}
