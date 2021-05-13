import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { selectItems } from "../../selectors/firebase";
import Item from "./Item";
import "../../styles/carousel.css";

const CarouselPrint = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const items = useSelector(selectItems);
  let arrayItems = [...items].slice(0, 9);
  return (
    <div className="carousel-main">
      <h1 className="carousel-title">BENEFIT MUST-HAVES</h1>
      <h3 className="carousel-subtitle">
        Meet the products you‘ve made best-sellers.
      </h3>
      <div className="slider">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          transitionDuration={100}
          customTransition="transform 1000ms ease-in-out"
          focusOnSelect
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {arrayItems.map((item, i) => {
            return (
              <Item key={item.itemId} ind={i} {...item} showThumbs={false} />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default CarouselPrint;
