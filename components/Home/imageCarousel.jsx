import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ImageCarousel({
  images = [
    { src: "spring.png", alt: "Spring" },
    { src: "summer.png", alt: "Summer" },
    { src: "autumn.png", alt: "Autumn" },
    { src: "winter.png", alt: "Winter" },
  ],

  interval = 3200,
  autoPlay = true,
  showControls = false,
  showIndicators = false
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    )
  }, [images.length])

  const goToIndex = useCallback(index => {
    setCurrentIndex(index)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  useEffect(() => {
    let timer = null

    if (isPlaying) {
      timer = setInterval(goToNext, interval)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isPlaying, interval, goToNext])

  return (
    <div className="relative w-full overflow-hidden h-64 ">
      <div className="relative aspect-video">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {showControls && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-primary/50 hover:bg-primary/75"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
