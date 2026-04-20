import { useState } from 'react'
import { X, CaretLeft, CaretRight, MagnifyingGlassPlus,
import { Button } from '@/components/ui/button'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PhotoGalleryModalProps {
  images, 
  open, 
  title 
  const [currentIndex, setCurrentIndex]
  const [zoom, s
 

  }
  const ha
    setCurrentIndex(
  }
  const handleK
    if (
  }
  const variants = {
      x: direction > 0 ? 1000 : -1000,
    }),

    },
      x: direction <
    })

   

      >
          <div clas
              {title && (
              
   

            <div className="flex items-center gap-2">
                variant="ghost"
                onClick={() => setZoom(Math.
                className="text-white hover:bg-
   

                vari
                onClick={() => setZo
                className="text-white 
                

             
           
              >
      
          </div>
          <div className="flex-1 relat
              <m
      
   

          
                exit="exit"
                  x: 
                }}
                dragConstraints={
       
                  bottom: 200 * zoom
              />

              <>
                  variant="ghost"
                
                >
                </Button>
                <B
                  

                  <CaretRight size={24} weight="bold"
              </>
          </div>
          <div className="a
              {images.map((image, idx) => (
                  key={idx}
                    setDirection(idx > currentIndex ? 1 
               
                  className={cn(
                    idx
              
                >
                    src={image}
                    classNa
                </button>
            </div>
        </div>
    </Dialog>
}

































                  right: 200 * zoom,
                  top: -200 * zoom,
                  bottom: 200 * zoom
                }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-12 w-12 rounded-full z-10"
                >
                  <CaretLeft size={24} weight="bold" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-12 w-12 rounded-full z-10"
                >
                  <CaretRight size={24} weight="bold" />
                </Button>
              </>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                    setZoom(1)
                  }}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all",
                    idx === currentIndex 
                      ? "ring-2 ring-white opacity-100 scale-105" 
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
