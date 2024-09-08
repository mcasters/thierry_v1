"use client";

import React from "react";

interface Props {
  text?: string;
  classname?: string;
  disabled?: boolean;
}

export default function CancelButton({ text, classname, disabled }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setTimeout(function () {
          window.location.reload();
        }, 0);
      }}
      className={`${classname ? classname : ""} adminButton`}
      disabled={disabled ? disabled : false}
    >
      {text ? text : "Annuler"}
    </button>
  );
}
