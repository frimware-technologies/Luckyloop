import { MantineThemeOverride, Input } from "@mantine/core";
import classes from "../src/global.module.css";
export const theme: MantineThemeOverride = {
  components: {
    Anchor: {
      styles: {
        root: {
          fontWeight: 700, // Set global font weight for all anchors
          color: "#1098AD", // Set global text color for all anchors
        },
      },
    },
    Button: {
      defaultProps: {
        color: "#1098AD",
        h: "56",
        size: "xl",
        // Set default button color
      },
    },
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
    NavLink: {
      defaultProps: {
        h: "56",
      },
    },

    NumberInput: {
      defaultProps: {
        size: "md", // Set default button color
      },
    },
  },
};
