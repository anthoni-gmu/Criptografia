import React, { useEffect, useRef, useState } from "react";
import FormInput from "../components/layouts/app/FormInput";
import Letter from "../components/layouts/app/Letter";
import { Monograma } from "../types";
import { motion } from 'framer-motion';
import { stagger, fadeInUp, routeAnimation } from '../animations';
import Counter from "../components/layouts/frequency/Counter";
const Frequency = () => {
  const [render, setRender] = useState(false)

  const [result, setResult] = useState<Monograma[]>([])
  const [top, setTop] = useState<Monograma[]>([])
  let [total, setTotal] = useState(0)
  let [totalTop, setTotalTop] = useState(0)

  const [formData, setFormData] = useState({
    text: '',
    type: 1,
  });
  let {
    text,
    type,
  } = formData;
  const onChange = (e: (React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>)): void => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });


  const createObjects = (
    parrafo: string,
    cant: number,
  ) => {

    let search
    let newLetter: string = ''

    // parrafo = parrafo.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '').replace(/_/g, '').replace(/\d+/g, '')

    parrafo = parrafo.toLowerCase()
    parrafo = parrafo.replace(/\s+/g, '') //Quitar espacios en blanco
    parrafo = parrafo.replace(/[^\w\s]/gi, '') //Quitar simbolos
    parrafo = parrafo.replace(/_/g, ''); //Quitar guion
    parrafo = parrafo.replace(/\d+/g, ''); //Quitar numeros

    setFormData({ text: parrafo, type: cant })

    for (var i = 0; i < parrafo.length; i += cant) {

      cant !== 1 ? newLetter = parrafo.charAt(i) + parrafo.charAt(i + 1) : newLetter = parrafo.charAt(i) // letra: monograma | bigrama

      if (newLetter.length < cant)
        continue

      search = result.find(element => element.letter == newLetter); //buscar letra en el array
      if (search) {
        result.map(element => {
          if (element.letter == newLetter) {
            element.count += 1
          }
        })
      } else {
        let add: Monograma = {
          letter: newLetter,
          count: 1,
          frequency: 0
        }
        result.push(add)
      }
    }
    setResult(result) //asignamos la data al array

    result.map(element => { total += element.count }) //cantidad total 
    setTotal(total)

    result.map(element => { element.frequency = element.count / total })  //calcular frecuencia
    // setResult(result)
    result.sort((a, b) => { return a.count - b.count }) //ordenar de menor a mayor

    let newTop = result.slice(result.length - 9) //extrar el top
    setTop(newTop.reverse())
    let to = 0
    newTop.map(element => { to += element.count })//cantidad total del top
    setTotalTop(to)


    result.sort((a, b) => {
      let fa = a.letter.toLowerCase(), fb = b.letter.toLowerCase();
      if (fa < fb)
        return -1;
      if (fa > fb)
        return 1;
      return 0;

    });
  }

  const clearForm = () => {
    setRender(false)
    setFormData({ text: '', type: 1 })
    setResult([])
    setTop([])
    setTotal(0)
    setTotalTop(0)
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setRender(false)

    //Limpiar
    result.length = 0
    top.length = 0
    total = 0
    totalTop = 0


    type == 1 ? createObjects(text, 1,) : createObjects(text, 2,)
    setRender(true)

  };

  return (
    <motion.div variants={routeAnimation} initial="initial" animate="animate" exit="exit" className="bg-skin-fill">
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen ">
        <div className="max-w-7xl flex-col mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex  lg:justify-between">
          <FormInput
            text={text}
            onChange={onChange}
            onSubmit={onSubmit}
            type={type}
            clearForm={clearForm}
            render={render}
          />

          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Frecuencias relativas
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" >
                    <Counter from={0} to={total} />
                  </h2>
                </div>

              </div>
            </div>
            {
              result !== [] && render &&
              <motion.ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`} variants={stagger} initial="initial" animate="animate" >
                {
                  result.map(element => (
                    <motion.li variants={fadeInUp} className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                      <Letter item={element} />
                    </motion.li>
                  ))
                }
              </motion.ul>
            }

          </div>
          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Top frecuencias
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" >
                    <Counter from={0} to={totalTop} />
                  </h2>
                </div>

              </div>
            </div>
            {
              render && (
                <motion.ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`} variants={stagger} initial="initial" animate="animate" >
                  {
                    top.map(element => (
                      <motion.li variants={fadeInUp} className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                        <Letter item={element} />
                      </motion.li>
                    ))
                  }
                </motion.ul>
              )
            }

          </div>

        </div>
      </div>


    </motion.div>
  );
};

export default Frequency;
