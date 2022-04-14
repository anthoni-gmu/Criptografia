import React, { useState } from "react";
import FormInput from "../components/layouts/app/FormInput";
import Letter from "../components/layouts/app/Letter";
import { Monograma } from "../types";
import { motion } from 'framer-motion';
import { stagger, fadeInUp, routeAnimation } from '../animations';
const About = () => {

  const [render, setRender] = useState(false)

  const [result, setResult] = useState<Monograma[]>([])
  const [top, setTop] = useState<Monograma[]>([])
  let [total, setTotal] = useState(0)
  let [totalTop, setTotalTop] = useState(0)

  const [formData, setFormData] = useState({
    text: '',
    type: 1,
  });
  const {
    text,
    type,
  } = formData;
  const onChange = (e: (React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>)): void => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });


  const createObjects = (
    item: string,
    cant: number,
  ) => {

    let search
    let newLetter: string = ''
    for (var i = 0; i < item.length; i += cant) {

      cant !== 1 ? newLetter = item.charAt(i) + item.charAt(i + 1) : newLetter = item.charAt(i) // letra: monograma | bigrama

      if (newLetter.length < cant)
        continue

      search = result.find(element => element.letter === newLetter); //buscar letra en el array
      if (search) {
        result.map(element => {
          if (element.letter === newLetter) {
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
    let to=0
    newTop.map(element => { to += element.count })//cantidad total del top
    setTotalTop(to)
    
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

    let resu = text.toLowerCase()
    resu = resu.replace(/\s+/g, '') //Quitar espacios en blanco
    resu = resu.replace(/[^\w\s]/gi, '') //Quitar simbolos
    resu = resu.replace(/_/g, ''); //Quitar guion
    resu = resu.replace(/\d+/g, ''); //Quitar numeros

    type == 1 ? createObjects(resu, 1,) : createObjects(resu, 2,)
    setRender(true)

  };

  return (
    <motion.div variants={routeAnimation} initial="initial" animate="animate" exit="exit" className="bg-skin-fill">
      <div className="bg-gray-50 dark:bg-gray-900  ">
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
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" > {total}</h2>
                </div>

              </div>
            </div>
            {
              result !== []  && render&&
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
                  <h2 className="font-semibold text-xl mx-3 text-skin-base"> {totalTop}</h2>
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

            {/* <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`}  >
              {
                top.map(element => (
                  <li className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                    <Letter item={element} />
                  </li>
                ))
              }
            </ul> */}
          </div>


        </div>
      </div>


    </motion.div>
  );
};

export default About;
