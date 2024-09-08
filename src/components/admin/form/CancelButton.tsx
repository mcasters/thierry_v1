"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
  classname?: string;
  disabled?: boolean;
  handleCancel?: () => void;
}

export default function CancelButton({
  text,
  classname,
  disabled,
  handleCancel,
}: Props) {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCancel
          ? handleCancel()
          : setTimeout(function () {
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
