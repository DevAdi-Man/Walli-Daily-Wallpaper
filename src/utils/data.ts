
interface filtersProps {
  order: any;
  orientation: any;
  type: any;
  colors: any;
  [key: string]: any;
}
const categories: string[] = [
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people', 'religion',
  'places',
  'animals', 'industry',
  'computer', 'food',
  'sports',
  'transportation', 'travel',
  'buildings',
  'business',
  'music',
];
const filters: filtersProps = {
  order: ['popular', 'latest'],

  orientation: ['horizontal', 'vertical'],

  type: ['photo', 'illustration', 'vector'],

  colors: [
    'red',

    'orange',

    'yellow',

    'green',

    'turquoise',

    'blue',

    'pink',

    'gray',

    'black',

    'brown',

    'white',
  ],
} as const;
export const data = {
  categories,
  filters,
};
