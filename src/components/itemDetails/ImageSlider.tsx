import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import backpackImg from '../../assets/image/backpack.jpeg';
import { Badge } from '../Badge';

// TODO: 이미지 순서에 맞게 페이지 표시 기능 구현하기

type ImageSliderProps = {
  imageList: { id: number; url: string }[];
};

export function ImageSlider({ imageList }: ImageSliderProps) {
  const [isDragStart, setIsDragStart] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  let positionDiff = 0;

  const onDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragStart(true);

    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    setPrevPageX(pageX);
    setPrevScrollLeft(sliderRef.current.scrollLeft);
  };

  const onDragging = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragStart || !sliderRef.current) return;
    // event.preventDefault();
    setIsDragging(true);
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    positionDiff = pageX - prevPageX;
    sliderRef.current.scrollLeft = prevScrollLeft - positionDiff;
  };

  const onDragStop = () => {
    setIsDragStart(false);

    if (!isDragging) return;
    setIsDragging(false);
    autoSlide();
  };

  const autoSlide = () => {
    if (!sliderRef.current) return;
    if (
      sliderRef.current.scrollLeft -
        (sliderRef.current.scrollWidth - sliderRef.current.clientWidth) >
        -1 ||
      sliderRef.current.scrollLeft <= 0
    )
      return;

    positionDiff = Math.abs(positionDiff);
    const imgWidth = sliderRef.current?.children[0].clientWidth;
    const diffValue = imgWidth - positionDiff;

    if (sliderRef.current.scrollLeft > prevScrollLeft) {
      sliderRef.current.scrollLeft +=
        positionDiff > imgWidth / 3 ? diffValue : -positionDiff;
      return;
    }
    sliderRef.current.scrollLeft -=
      positionDiff > imgWidth / 3 ? diffValue : -positionDiff;
  };

  return (
    <Container>
      <Slider
        ref={sliderRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragging}
        onMouseUp={onDragStop}
        onMouseLeave={onDragStop}
        onTouchStart={onDragStart}
        onTouchMove={onDragging}
        onTouchEnd={onDragStop}
      >
        {imageList.map(item => (
          <SliderItem
            key={item.id}
            src={item.url}
            alt={`Item image${item.id}`}
            draggable="false"
          />
        ))}
        {/* <SliderItem src={backpackImg} alt="상품 이미지" draggable="false" />
        <SliderItem src={backpackImg} alt="상품 이미지" draggable="false" />
        <SliderItem src={backpackImg} alt="상품 이미지" draggable="false" />
        <SliderItem src={backpackImg} alt="상품 이미지" draggable="false" />
        <SliderItem src={backpackImg} alt="상품 이미지" draggable="false" /> */}
      </Slider>
      <PageNav
        fontColor="neutralTextWeak"
        badgeColor="neutralBackgroundBlur"
        text="1 / 2"
        size="M"
        type="container"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 491px;
  position: relative;
`;

const Slider = styled.div`
  white-space: nowrap;
  overflow-x: hidden;
  cursor: pointer;
`;

const SliderItem = styled.img`
  width: 100%;
  height: 491px;
  object-fit: cover;
`;

const PageNav = styled(Badge)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
