import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { carousel01 } from '@/assets/img/icons'

interface CallBeneficiaryModalProps {
  onClose: () => void
}

const slides = Array(9).fill(null)

const OnBoardingModal = ({ onClose }: CallBeneficiaryModalProps) => {
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-dots mt-6">
        <ul className="flex items-center justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="custom-dots w-3 h-3 bg-gray-100 rounded-full"></div>
    ),
  }

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-full w-[588px] h-[614px] flex flex-col justify-between px-8 pb-8 pt-6 bg-white rounded-xl border-none outline-none"
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <Slider ref={sliderRef} {...settings}>
          {slides.map((_, index) => (
            <div key={index}>
              <DialogHeader className="mb-6">
                <div className="w-[524px] h-[280px] overflow-hidden">
                  <Image
                    src={carousel01}
                    objectFit="cover"
                    width={524}
                    height={280}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </DialogHeader>

              <DialogTitle className="text-center text-2xl font-bold mb-3">
                Bem-vindo à empresa...!
              </DialogTitle>

              <DialogDescription className="text-lg font-medium">
                Aqui, você encontrará tudo o que precisa para começar sua
                jornada conosco. Vamos dar uma rápida olhada em como navegar:
              </DialogDescription>
            </div>
          ))}

          {/* <div>
            <DialogHeader className="mb-6">
              <div className="w-[524px] h-[280px] overflow-hidden">
                <Image
                  src={carousel01}
                  objectFit="cover"
                  width={524}
                  height={280}
                  alt=""
                />
              </div>
            </DialogHeader>

            <DialogTitle className="text-center text-2xl font-bold mb-3">
              Bem-vindo à empresa...!
            </DialogTitle>

            <DialogDescription className="text-lg font-medium">
              Aqui, você encontrará tudo o que precisa para começar sua jornada
              conosco. Vamos dar uma rápida olhada em como navegar:
            </DialogDescription>
          </div>

          <div>
            <DialogHeader className="mb-6">
              <div className="w-[524px] h-[280px] overflow-hidden">
                <Image
                  src={carousel01}
                  objectFit="cover"
                  width={524}
                  height={280}
                  alt=""
                />
              </div>
            </DialogHeader>

            <DialogTitle className="text-center text-2xl font-bold mb-3">
              Bem-vindo à empresa...!
            </DialogTitle>

            <DialogDescription className="text-lg font-medium">
              Aqui, você encontrará tudo o que precisa para começar sua jornada
              conosco. Vamos dar uma rápida olhada em como navegar:
            </DialogDescription>
          </div> */}
        </Slider>

        <DialogFooter>
          <div className="w-full flex items-center gap-4 text-white">
            <Button
              className="flex flex-1 items-center font-semibold text-base space-x-2 bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-100"
              onClick={() => onClose()}
            >
              Pular
            </Button>
            <Button className="flex-1" onClick={handleNextSlide}>
              Continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OnBoardingModal
