"use client";

import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import toast from "react-hot-toast";
import React from "react";

type Props = {
  api: string;
};
export default function DeleteButton({ api }: Props) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(api).then((res) => {
        if (res.ok) {
          toast("supprimé");
          window.location.reload();
        } else toast("Erreur à la suppression");
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="iconButton"
      aria-label="Supprimer"
    >
      <FiTrash2 />
    </button>
  );
}
