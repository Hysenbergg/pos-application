import React from 'react'

const AuthCarousel = ({title, description, image}) => {
  return (
    <div className='!flex flex-col justify-center items-center h-full mb-10'>
        <img src={image} alt='' className='w-[600px] h-[500px]' />
        <h3 className='text-4xl text-white text-center font-bold'>{title}</h3>
        <p className='mt-5 text-2xl text-white text-center'>{description}</p>
    </div>
  )
}

export default AuthCarousel