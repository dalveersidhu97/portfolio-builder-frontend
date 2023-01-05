import { IoImage } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";

export const ImageSlider = ({ images, onClickItem }: { images: string[], onClickItem?: () => any }) => {
    const onChange = () => { };
    const onClickThumb = () => { };
    const imagePlaceholder = (
        <div className="w-full aspect-video flex items-center justify-center rounded-md overflow-hidden">
            <IoImage className="h-1/2 w-1/2 text-gray-400"></IoImage>
        </div>
    );
    return (
        <Carousel showArrows showThumbs={false} autoPlay infiniteLoop onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} swipeable emulateTouch>
            {images.map(imageSrc => {
                return <div className="rounded-md overflow-hidden">
                    {imageSrc 
                    ? <img src={imageSrc} className="aspect-video object-cover rounded-md" /> 
                    : imagePlaceholder}
                </div>
            })}
        </Carousel>
    );
}