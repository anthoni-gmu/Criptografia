import React, { FunctionComponent } from 'react'
import { TypesFrequency } from '../../../data'
const FormInput: FunctionComponent<{
    text: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.SyntheticEvent) => void;
    type: number;
    clearForm: () => void;
    render: boolean
}> = ({
    text,
    onChange,
    onSubmit,
    type,
    clearForm,
    render
}) => {
        return (
            <form onSubmit={onSubmit} className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <h1 className="text-skin-base text-center mb-5 uppercase text tracking-widest" >Criptografía</h1>
                <div className="">
                    <label className="text-gray-700 " htmlFor="name">
                        <textarea
                            className="flex-1 h-96
                        appearance-none border 
                        border-gray-300 w-full py-2 px-4 
                        bg-white text-gray-700 placeholder-gray-400 
                        rounded-lg text-base focus:outline-none focus:ring-2 
                        focus:ring-yellow-500 focus:border-transparent"
                            value={text}
                            onChange={onChange}
                            placeholder="Ingresar texto"
                            name="text"
                            rows={5}
                            cols={40}>
                        </textarea>

                    </label>

                </div>
                <div className="flex justify-between mt-2  ">
                    <div onClick={clearForm} className='bg-white  py-2 px-3 rounded-lg shadow-lg border-2 border-yellow-600 hover:bg-skin-fill text-skin-base hover:text-white' >
                        <span className="font-semibold text-lg  ">
                            Limpiar
                        </span>
                    </div>
                    <div className='flex space-x-5'>
                        {
                            TypesFrequency.map((item) => (
                                <div className="mt-2" key={item.id} >
                                    <div className="flex items-center justify-between w-full dark:bg-skin-dark bg-skin- rounded-md border-2  p-4 focus:outline-none">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio h-5 w-5  radio"
                                                onChange={e => onChange(e)}
                                                value={item.id}
                                                name='type'
                                                required
                                            />

                                            <span className="ml-2 text-lg font-semibold dark:text-skin-base text-skin-inverted ">{item.name}</span>
                                        </label>


                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button type="submit" className='bg-skin-fill py-2 px-3 rounded-lg shadow-lg border-2 border-gray-700 hover:bg-yellow-600 text-white ' >
                        <span className="font-semibold text-lg flex justify-center">
                            Calcular

                        </span>
                    </button>


                </div>
            </form >
        )
    }

export default FormInput