import React, { FunctionComponent } from 'react'
import { Monograma } from '../../../types'

const Letter:FunctionComponent<{
    item:Monograma
}> = ({
    item:{
        count,
        frequency,
        letter
    }
}) => {
  return (
    <div className="shadow border dark:border-gray-700   bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 space-x-3">

    <div className="flex-1 md:pl-7 ">
      <div className="font-bold text-dark  text-skin-base text-5xl uppercase">
        {letter}
      </div>

    </div>
    <div className="flex flex-col space-y-3 ">
      <div className="text-gray-600 text-lg dark:text-gray-200">
        <span>Cantidad: </span>
        <span className="text-skin-base" >{count}</span>

      </div>
      <div className="text-gray-600  text-lg dark:text-gray-200 ">
        <span>Frecuencia: </span>
        <span className="text-skin-base" >{frequency.toFixed(2)}%</span>
      </div>
    </div>


  </div>
  )
}

export default Letter