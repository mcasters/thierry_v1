import React from "react";
import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarche,
  getInspiration,
  getPresentationContent,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/PresentationComponent";

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentationContent = getPresentationContent(contents);
  const demarche = getDemarche(contents);
  const inspiration = getInspiration(contents);

  return (
    <PresentationComponent
      presentationContent={presentationContent}
      demarcheText={demarche}
      inspirationText={inspiration}
    />
  );
}
