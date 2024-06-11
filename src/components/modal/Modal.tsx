import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'
import './Modal.css'

import { Button } from '@/components/ui/button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, images }) => {
  if (!isOpen) return null

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay max-w-sm mx-auto" onClick={onClose}>
      <div className="modal-content mt-4 text-center">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} />
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
export default Modal
