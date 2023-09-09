import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';
import { ItemData } from '../types';
import { fakeItems } from './faker';

export const mainHandlers = [
  rest.get(API_ENDPOINT.ITEMS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(homeData));
  }),

  rest.get(API_ENDPOINT.CATEGORIES, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoryData));
  }),
];

const homeData: ItemData = {
  userLocation: '서울특별시 강남구 역삼1동',
  categoryName: null,
  items: [
    {
      id: 1,
      title: '글제목',
      locationName: '역삼 1동',
      createdAt: new Date('2023-08-28T23:04:33'),
      statusName: '예약중',
      price: 10000,
      countData: {
        chat: 10,
        favorite: 10,
      },
      thumbnailUrl:
        'https://www.ikea.com/kr/ko/images/products/alex-storage-unit-white__1209817_pe909458_s5.jpg?f=xl',
      isSeller: true,
    },
    ...fakeItems(),
  ],
  nextCursor: 1,
};

const categoryData = {
  categories: [
    {
      id: 1,
      name: '디지털기기',
      iconName: 'icon_digital',
    },
    {
      id: 2,
      name: '생활가전',
      iconName: 'icon_appliance',
    },
    {
      id: 3,
      name: '가구/인테리어',
      iconName: 'icon_furniture',
    },
    {
      id: 4,
      name: '생활/주방',
      iconName: 'icon_kitchen',
    },
    {
      id: 5,
      name: '유아동',
      iconName: 'icon_baby',
    },
    {
      id: 6,
      name: '유아도서',
      iconName: 'icon_book',
    },
    {
      id: 7,
      name: '여성의류',
      iconName: 'icon_clothes',
    },
    {
      id: 8,
      name: '여성잡화',
      iconName: 'icon_accessories',
    },
    {
      id: 9,
      name: '남성패션/잡화',
      iconName: 'icon_man',
    },
    {
      id: 10,
      name: '뷰티/미용',
      iconName: 'icon_beauty',
    },
    {
      id: 11,
      name: '스포츠/레저',
      iconName: 'icon_sports',
    },
    {
      id: 12,
      name: '취미/게임/음반',
      iconName: 'icon_hobby',
    },
    {
      id: 13,
      name: '중고차',
      iconName: 'icon_car',
    },
    {
      id: 14,
      name: '티켓/교환권',
      iconName: 'icon_ticket',
    },
    {
      id: 15,
      name: '가공식품',
      iconName: 'icon_food',
    },
    {
      id: 16,
      name: '반려동물식품',
      iconName: 'icon_pet',
    },
    {
      id: 17,
      name: '식물',
      iconName: 'icon_plant',
    },
    {
      id: 18,
      name: '기타 중고물품',
      iconName: 'icon_etc',
    },
  ],
};