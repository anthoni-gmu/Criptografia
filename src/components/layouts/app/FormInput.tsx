import React, { FunctionComponent } from 'react'

const FormInput: FunctionComponent<{
    text: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.SyntheticEvent) => void;
}> = ({
    text,
    onChange,
    onSubmit,
}) => {
        return (
            <form onSubmit={onSubmit} className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <h1 className="text-skin-base text-center mb-5 uppercase text tracking-widest" >Criptografía</h1>
                <div className="">
                    <label className="text-gray-700 " htmlFor="name">
                        <textarea
                            className="flex-1 
                        appearance-none border 
                        border-gray-300 w-full py-2 px-4 
                        bg-white text-gray-700 placeholder-gray-400 
                        rounded-lg text-base focus:outline-none focus:ring-2 
                        focus:ring-yellow-500 focus:border-transparent"
                            id="comment"
                            value={text}
                            onChange={onChange}
                            placeholder="Ingresar texto"
                            name="text"
                            rows={5}
                            cols={40}>
                        </textarea>

                    </label>

                </div>
                <div className="flex justify-end mt-2 space-x-10 ">
                    <button  className='bg-white py-2 px-3 rounded-lg shadow-lg border-2 border-yellow-600 hover:bg-skin-fill text-skin-base hover:text-white' >
                        <span className="font-semibold text-lg  flex justify-center">
                            Limpiar
                        </span>

                    </button>
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