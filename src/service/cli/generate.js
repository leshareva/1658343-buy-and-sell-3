"use strict";
const utils = require(`../../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = (min) => {
  return min >= 10 ? `item${min}.jpg` : `item0${min}.jpg`;
};

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      title: TITLES[utils.getRandomInt(0, TITLES.length - 1)],
      description: utils.shuffle(SENTENCES).slice(1, 5).join(` `),
      sum: utils.getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      picture: getPictureFileName(utils.getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      category: [CATEGORIES[utils.getRandomInt(0, CATEGORIES.length - 1)]],
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 4);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  },
};