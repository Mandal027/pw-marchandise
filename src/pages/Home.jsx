import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from '../config/motion';
import { CustomButton } from '../components';

const Home = () => {
    const snap = useSnapshot(state);

  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>

                {/* <motion.header {...slideAnimation('down')}>
                    <img src='./PW_Logo.png' alt='logo' className='w-25 h-25 object-contain' />
                </motion.header> */}

                <motion.div className='home-contet mt-20 md:mt-32' {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            WEAR <br className='xl:block hidden' /> YOUR ART.
                        </h1>
                    </motion.div>

                    <motion.div {...headContentAnimation} className='flex flex-col gap-5' {...headContentAnimation}>
                        <p className='max-w-md font-normal text-gray-600 text-base'>Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong> Unleash your imagination</strong>{" "} and define your own style. </p>

                        <CustomButton 
                            type='filled'
                            title='Customize It'
                            handleClick= {() => state.intro = false}
                            customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                        />
                    </motion.div>
                </motion.div>

            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home
