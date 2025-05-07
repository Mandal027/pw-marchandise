// we're gonna use this to switch between tabs such as ColorPicker, FilePicker and AIPicker

import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'


const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab ? {backgroundColor: snap.color, opacity: 0.5} : {backgroundColor: 'transparent', opacity: 1}

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`w-1/2 h-1/2 ${isFilterTab ? 'object-contain' : 'object-cover'}`}
       />
      
    </div>
  )
}

export default Tab
