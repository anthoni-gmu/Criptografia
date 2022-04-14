import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FormInput from "../components/layouts/app/FormInput";
import Letter from "../components/layouts/app/Letter";
import { Monograma } from "../types";

const About = () => {

  const [render, setRender] = useState(false)

  const [resultMono, setResultMono] = useState<Monograma[]>([])
  const [topMono, setTopMono] = useState<Monograma[]>([])
  let [totalMono, setTotalMono] = useState(0)


  const [resultBi, setResultBi] = useState<Monograma[]>([])
  const [topBi, setTopBi] = useState<Monograma[]>([])
  let [totalBi, setTotalBi] = useState(0)



  const [formData, setFormData] = useState({
    text: '',
  });
  const {
    text,
  } = formData;
  const onChange = (e: React.FormEvent<HTMLTextAreaElement>): void => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });


  const createObjects = (
    dic: Monograma[],
    item: string,
    cant: number,
    setTotal: (value: number) => void,
    setResult: (value: Monograma[]) => void,
    setTop: (value: Monograma[]) => void,
  ) => {
    console.log("gege");

    let total = 0
    let search
    let newLetter: string = ""
    for (var i = 0; i < item.length; i += cant) {

      cant !== 1 ? newLetter = item.charAt(i) + item.charAt(i + 1) : newLetter = item.charAt(i)
      if (newLetter.length < cant) {
        continue
      }

      search = dic.find(element => element.letter === newLetter);
      if (search) {
        dic.map(element => {
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
        dic.push(add)
      }
    }
    dic.map(element => {
      total += element.count
    })
    setTotal(total)

    dic.map(element => {
      element.frequency = element.count / total
    })
    setResult(dic)

    dic.sort((a, b) => {
      return a.count - b.count
    })
    let newTop = dic.slice(dic.length - 9)
    setTop(newTop.reverse())
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let resu = text.toLowerCase()
    resu = resu.replace(/\s+/g, '')
    resu = resu.replace(/[^\w\s]/gi, '')
    console.log("gege");

    createObjects(resultMono, resu, 1, setTotalMono, setResultMono, setTopMono)
    createObjects(resultBi, resu, 2, setTotalBi, setResultBi, setTopBi)

    setRender(true)

  };

  return (
    <div className="bg-skin-fill">
      <div className="bg-gray-50 dark:bg-gray-900 h-screen ">
        <div className="max-w-7xl flex-col mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex  lg:justify-between">
          <FormInput
            text={text}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Las frecuencias relativas del monograma
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" > {totalMono}</h2>
                </div>

              </div>
            </div>
            <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`}>
              {
                resultMono.map(element => (
                  <li className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                    <Letter item={element} />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Top frecuencias relativas del monograma
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" > {totalMono}</h2>
                </div>

              </div>
            </div>
            <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`}>
              {
                topMono.map(element => (
                  <li className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                    <Letter item={element} />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Las frecuencias relativas del monograma
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" > {totalBi}</h2>
                </div>

              </div>
            </div>
            <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`}>
              {
                resultBi.map(element => (
                  <li className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                    <Letter item={element} />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className={`my-5 ${render ? 'block' : 'hidden'}`}>
            <div className="px-4 py-5 sm:px-6 w-full dark:border-gray-700 border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
              <div className="flex  " >
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-full uppercase">
                  Top frecuencias relativas del monograma
                </h3>

                <div className="w-full flex justify-end items-center">
                  <h2 className="text-xl" >Cantidad: </h2>
                  <h2 className="font-semibold text-xl mx-3 text-skin-base" > {totalBi}</h2>
                </div>

              </div>
            </div>
            <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3`}>
              {
                topBi.map(element => (
                  <li className="border-gray-400 flex flex-row mb-2" key={element.letter}>
                    <Letter item={element} />
                  </li>
                ))
              }
            </ul>
          </div>

        </div>
      </div>


    </div>
  );
};

export default About;
