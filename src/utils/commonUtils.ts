import {
  ContentImage,
  Label,
  Painting,
  PresetColor,
  Sculpture,
  SculptureImage,
  Theme,
} from "@prisma/client";
import { TYPE } from "@/constants";
import { THEME } from "@/constants/database";
import {
  ContentFull,
  DrawingFull,
  Image,
  PaintingFull,
  PostFull,
  SculptureFull,
} from "@/lib/db/item";

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

export const getPresentationContent = (
  contents: ContentFull[],
): ContentFull | undefined => {
  return (
    contents?.filter((c) => c.label === Label.PRESENTATION)[0] || undefined
  );
};

export const getPresentationText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.text || "";
};

export const getPresentationImage = (contents: ContentFull[]): Image[] => {
  return (
    contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.images || []
  );
};

export const getDemarcheText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.DEMARCHE)[0]?.text || "";
};

export const getInspirationText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.INSPIRATION)[0]?.text || "";
};

export const getIntroText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.INTRO)[0]?.text || "";
};

export const getSliders = (contents: ContentFull[]): Image[] | [] => {
  return contents?.filter((c) => c.label === Label.SLIDER)[0]?.images || [];
};

export const getAddressText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.ADDRESS)[0]?.text || "";
};

export const getPhoneText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.PHONE)[0]?.text || "";
};

export const getEmailText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.EMAIL)[0]?.text || "";
};

export const getContactText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.TEXT_CONTACT)[0]?.text || "";
};

export const getMainImage = (post: PostFull) => {
  return post?.images?.filter((i) => i.isMain)[0] || undefined;
};

export const getGalleryImages = (post: PostFull) => {
  return post?.images?.filter((i) => !i.isMain) || undefined;
};

export const isPaintingFull = (item: any): item is PaintingFull =>
  Object.values(item).includes(TYPE.PAINTING);

export const isSculptureFull = (item: any): item is SculptureFull =>
  Object.values(item).includes(TYPE.SCULPTURE);

export const isPostFull = (item: any): item is PostFull =>
  Object.values(item).includes(TYPE.POST);

export const getEmptySculptureImage = (): SculptureImage[] => {
  return [
    {
      id: 0,
      height: 0,
      width: 0,
      filename: "",
      isMain: false,
      sculptureId: null,
    },
  ];
};

export const getEmptyContentImage = (): ContentImage[] => {
  return [
    {
      id: 0,
      height: 0,
      width: 0,
      filename: "",
      isMain: false,
      contentId: null,
    },
  ];
};

export const getEmptyPainting = (): Painting => {
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
    imageFilename: "",
    imageHeight: 0,
    imageWidth: 0,
    category: null,
    categoryId: null,
  };
};

export const getEmptyContent = (): ContentFull => {
  return {
    id: 0,
    label: "",
    title: "",
    text: "",
    images: getEmptyContentImage(),
  };
};

export const getEmptySculpture = (): Sculpture => {
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
    images: getEmptySculptureImage(),
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

export const getImagesTab = (
  item: SculptureFull | PaintingFull | DrawingFull,
): Image[] => {
  if (isSculptureFull(item)) {
    return item.images.map((i) => {
      return {
        id: i.id,
        filename: i.filename,
        width: i.width,
        height: i.height,
        isMain: i.isMain,
      };
    });
  }
  return [
    {
      id: 0,
      filename: item.imageFilename,
      width: item.imageWidth,
      height: item.imageHeight,
      isMain: false,
    },
  ];
};
