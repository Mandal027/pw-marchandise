import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import {download, logoShirt } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [ prompt, setPrompt ] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState({
    // logoShirt: true,
    // stylishShirt: false,
  })
  
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });


  // show tab content depending on the active tab
  const generateTabContent = ()=> {
    switch(activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />

      case "filepicker":
        return <FilePicker 
          file={file} 
          setFile={setFile} 
          readFile = {readFile}
        />

      // case "aipicker":
      //   return <AIPicker 
            
      //       prompt={prompt}
      //       setPrompt={setPrompt}
      //       generatingImg={generatingImg}
      //       handleSubmit = {handleSubmit}
      //   />
      default:
          return null;
    }
  }

  const handleSubmit = async (type) => {

    if(!prompt) return alert('Please enter a prompt');

    try {
      // call our backend to generate an AI image 
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/dalle', {
        method: 'POST',
        header: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
          prompt,
        })
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);

    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }


  }


  
  const handleDecals = (type, result) => {
    const DecalType = DecalTypes[type];

    state[DecalType. stateProperty] = result;

    if(!activeFilterTab[DecalType.filterTab]) {
      handleActiveFilterTab(DecalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isfullTexture = !activeFilterTab(tabName);
      default:
        state.isLogoTexture = true;
        state.isfullTexture = false;
    }

    // after setting the state we are gonna set the active filter tab to true or false i.e. activeFilterTab is updated.
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })
  }


  // which is used to read the file and set the decal type 
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab('');
      })
  }


  return (
    <AnimatePresence>
      { !snap.intro && (
        <>

          {/* this div is to create adjustment tabs in the left at middle height of the screen */}
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          
          {/* this div is to create BACK button in the left top of the screen */}
          <motion.div 
            className='absolute z-20 bottom-7 right-8 md:right-20'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back' 
              handleClick={()=> state.intro = true }
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>


          {/* this div is to create toggle button for t-shirt in the bottom */}
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={()=> {handleActiveFilterTab(tab.name)}}
                  />
            ))}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
