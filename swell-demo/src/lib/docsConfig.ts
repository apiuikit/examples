import type { ConfigInterface } from "apiuikit";

/**
 * One config object, shared by every APIUIKit component on the site, so the
 * API reference picks up Swell's colors instead of looking like a third-party embed.
 */
export const docsConfig: ConfigInterface = {
  topOffset: 64, // height of Swell's sticky site header
  show: { tryIt: true },
  theme: {
    mode: "light",
    colors: {
      primary: {
        50: "#ECFDF8",
        100: "#D0F7EC",
        200: "#A3EDDA",
        300: "#5FD9BF",
        500: "#14A88A",
        600: "#0E8670",
        700: "#0B6A5A",
      },
    },
    light: {
      background: "#FBF8F2",
      surface: "#FFFFFF",
      border: "#E7E0D2",
      textPrimary: "#0B2A3C",
      textSecondary: "#3D5566",
      textMuted: "#7C8B95",
    },
    depthColors: ["#14A88A", "#2F7DD1", "#E08A3C", "#B5579B", "#6A5ACD", "#3C9D5D"],
  },
};
