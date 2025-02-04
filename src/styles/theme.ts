export const theme = {
  colors: {
    white: '#fff',
    black: '#ccc',

    //neutral
    neutral: (opacity: number) => `rgba(10,10,10,${opacity})`,
  },
  fontWeight: {
    medium: 500 as const,
    semiBold: 600 as const,
    bold: 700 as const,
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
