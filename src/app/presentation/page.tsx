import React from "react";
import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarche,
  getInspiration,
  getPresentation,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/PresentationComponent";

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentation = getPresentation(contents);
  const demarche = getDemarche(contents);
  const inspiration = getInspiration(contents);

  return (
    <PresentationComponent
      presentation={presentation}
      demarche={demarche}
      inspiration={inspiration}
    />
  );
}
