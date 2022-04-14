import React, { FunctionComponent } from 'react'
import { Monograma } from '../../../types'
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../../animations';
const Letter: FunctionComponent<{
  item: Monograma
}> = ({
  item: {
    count,
    frequency,
    letter
  }
}) => {
    return (
      <motion.div variants={stagger} initial="initial" animate="animate" className="shadow border dark:border-gray-700   bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 space-x-3">

        <motion.div variants={fadeInUp} initial={"initial"} animate={"animate"}  className="flex-1 md:pl-7 ">
          <div className="font-bold text-dark  text-skin-base text-5xl uppercase">
            {letter}
          </div>

        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col space-y-3 ">
          <div className="text-gray-600 text-lg dark:text-gray-200">
            <span>Cantidad: </span>
            <span className="text-skin-base" >{count}</span>

          </div>
          <div className="text-gray-600  text-lg dark:text-gray-200 ">
            <span>Frecuencia: </span>
            <span className="text-skin-base" >{frequency.toFixed(2)}%</span>
          </div>
        </motion.div>


      </motion.div>
    )
  }

export default Letter