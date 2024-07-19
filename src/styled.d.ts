import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    textBoxColor: string;
    accentColor: string;
  }
}
