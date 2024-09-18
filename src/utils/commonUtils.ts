import { Image, Label, PostImage } from ".prisma/client";
import { ContentFull } from "@/app/api/content/content";
import { PostFull } from "@/app/api/post/post";
import { PaintingFull } from "@/app/api/peinture/painting";
import { SculptureFull } from "@/app/api/sculpture/sculpture";
import { TYPE } from "@/constants";
import { THEME } from "@/constants/database";
import { PresetColor, Theme } from "@prisma/client";
import { OnlyString } from "@/app/api/theme/theme";

export const transformValueToKey = (value: string): string => {
  return value
    .toLowerCase()
    .split(" ")
    .join("_")
    .replace(/[`~!@#$%^&*()'”‘|+\-=?;:",.<>{}\[\]\\\/]/gi, "")
    .replace(/à/gi, "a")
    .replace(/é/gi, "e")
    .replace(/è/gi, "e")
    .replace(/ê/gi, "e")
    .replace(/ù/gi, "u")
    .replace(/ç/gi, "c")
    .replace(/î/gi, "i")
    .replace(/ë/gi, "e");
};

export const getPresentation = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.PRESENTATION)[0] || null;
};

export const getDemarche = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.DEMARCHE)[0] || null;
};

export const getInspiration = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.INSPIRATION)[0] || null;
};

export const getIntro = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.INTRO)[0] || null;
};

export const getSliders = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.SLIDER)[0] || null;
};

export const getAddress = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.ADDRESS)[0] || null;
};

export const getPhone = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.PHONE)[0] || null;
};

export const getEmail = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.EMAIL)[0] || null;
};

export const getTextContact = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.TEXT_CONTACT)[0] || null;
};

export const getMainImage = (post: PostFull | undefined) => {
  return post?.images?.filter((i: PostImage) => i.isMain)[0] || undefined;
};

export const getGalleryImages = (post: PostFull | undefined) => {
  return post.images.filter((i) => !i.isMain) || undefined;
};

export const isPaintingFull = (item: any): item is PaintingFull =>
  Object.values(item).includes(TYPE.PAINTING);

export const isSculptureFull = (item: any): item is SculptureFull =>
  Object.values(item).includes(TYPE.SCULPTURE);

export const isPostFull = (item: any): item is PostFull =>
  Object.values(item).includes(TYPE.POST);

export const getEmptyImage = (): Image => {
  return {
    id: 0,
    height: 0,
    width: 0,
    filename: "",
    isMain: false,
    sculptureId: null,
  };
};

export const getEmptyPainting = (): PaintingFull => {
  return {
    id: 0,
    type: TYPE.PAINTING,
    title: "",
    date: new Date(),
    technique: "",
    description: "",
    height: 0,
    width: 0,
    isToSell: false,
    sold: false,
    price: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageId: 0,
    image: getEmptyImage(),
    category: null,
    categoryId: null,
  };
};

export const getEmptySculpture = (): SculptureFull => {
  return {
    id: 0,
    type: TYPE.SCULPTURE,
    title: "",
    date: new Date(),
    technique: "",
    description: "",
    height: 0,
    width: 0,
    length: 0,
    isToSell: false,
    sold: false,
    price: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [getEmptyImage()],
    category: null,
    categoryId: null,
  };
};

export const getBaseThemeData = () => {
  return {
    name: THEME.BASE_THEME,
    isActive: true,
    lineColor: "#a4874f",
    backgroundColor: "#f8f8f8",
    backgroundColorItem: "#24445C",
    color: "#2e6177",
    colorItem: "#a4874f",
    titleColor: "#2e6177",

    linkColor: "#2e6177",
    linkHoverColor: "#66c3d3",
    linkItemColor: "#2e6177",
    linkHoverItemColor: "#66c3d3",

    menu1Color: "#e7e7e7",
    menu1HomeColor: "#e7e7e7",
    menu1ItemColor: "#0f1f26",
    menu1LinkColor: "#2e6177",
    menu1LinkHoverColor: "#a4874f",
    menu1LinkHomeColor: "#2e6177",
    menu1LinkHomeHoverColor: "#a4874f",
    menu1LinkItemColor: "#66c3d3",
    menu1LinkHoverItemColor: "#b5d1d5",

    menu2Color: "#f8f8f8",
    menu2HomeColor: "#f8f8f8",
    menu2ItemColor: "#13262f",
    menu2LinkColor: "#a4874f",
    menu2LinkHoverColor: "#d9bf94",
    menu2LinkHomeColor: "#a4874f",
    menu2LinkHomeHoverColor: "#d9bf94",
    menu2LinkItemColor: "#a4874f",
    menu2LinkHoverItemColor: "#d9bf94",
  };
};

export const getBasePresetColorData = () => {
  return {
    name: "Prussian blue",
    color: "#24445C",
  };
};

export const themeToHexa = (
  theme: Theme,
  presetColors: PresetColor[],
): Theme => {
  let updatedTheme = theme;
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "string" && value.charAt(0) !== "#") {
      presetColors.find((p) => {
        if (p.name === value) {
          updatedTheme[key as keyof OnlyString<Theme>] = p.color;
        }
      });
    }
  });
  return updatedTheme;
};

export const colorNameToHex = (
  colorName: string,
  presetColors: PresetColor[],
): string => {
  let colorHex = colorName;
  if (colorName.charAt(0) !== "#") {
    presetColors.find((p) => {
      if (p.name === colorName) {
        colorHex = p.color;
      }
    });
  }
  return colorHex;
};

export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
} // hexToRgb("#0033ff").g; // "51";

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
} // rgbToHex(0, 51, 255); // #0033ff
