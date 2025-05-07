// we are gonna pick the color of the shirt from this component

import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'


const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
       {/* this is the color picker component from react-color library  */}
      <SketchPicker 
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex} // this is the color that we are gonna use to change the color of the shirt
        presetColors={[
          '#ccc', '#000000', '#FF0000', '#FFFF00', '#FFA500', '#800080', '#FFFFFF', '#A52A2A', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF', '#008B8B'
        ]}
      /> 
    </div>
  )
}

export default ColorPicker
