import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
}

const OnboardingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const img = [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400?text=Second+Image',
    'https://via.placeholder.com/600x400?text=Third+Image',
  ]

  return ReactDOM.createPortal(
    <div className="modal-overlay max-w-sm mx-auto" onClick={onClose}>
      <div
        className="modal-content mt-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Slider {...settings}>
          {img.map((image, index) => (
            <div key={index}>
              <Image src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
        <h2 className="text-2xl font-bold">Bem-vindo à empresa...!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Aqui, você encontrará tudo o que precisa para começar sua jornada
          conosco. Vamos dar uma rápida olhada em como navegar:
        </p>

        <div className="flex justify-between mt-6">
          <Button className="bg-gray-200 text-gray-800">Pular</Button>
          <Button className="bg-purple-600 text-white">Continuar</Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default OnboardingModal
