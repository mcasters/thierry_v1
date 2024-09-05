"use client";

import React from "react";

interface Props {
  text?: string;
  classname?: string;
}

export default function CancelButton({ text, classname }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setTimeout(function () {
          window.location.reload();
        }, 0);
      }}
      className={`${classname ? classname : ""} adminButton`}
    >
      {text ? text : "Annuler"}
    </button>
  );
}
