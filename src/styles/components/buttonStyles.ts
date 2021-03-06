// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/components/input.ts
export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    outline: "none",
    _focus: { boxShadow: "none" },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: "#21ba45",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#fff",
      fontWeight: "700",
      _hover: {
        bg: "#0d912c",
        boxShadow: "md",
        _disabled: {
          bg: "#0d912c",
          color: "black",
        },
      },
    }),
    secondary: () => ({
      bg: "#EEEEEE",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      _hover: {
        bg: "#E5EBF5",
        boxShadow: "md",
        outline: "none",
      },
    }),
    secondaryOutline: () => ({
      bg: "#3E3E3E",
      border: "1px solid",
      borderRadius: "4px",
      transition: "all 200ms ease",
      color: "#ffffff",
      _hover: {
        bg: "transparent",
        color: "#000000",

        boxShadow: "md",
        transform: "scale(1.02)",
      },
      _focus: {
        outline: "none",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
  },
};
