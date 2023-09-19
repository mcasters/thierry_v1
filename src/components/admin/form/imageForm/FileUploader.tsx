import React, { useRef } from 'react';

interface Props {
  handleFiles: (filesUploaded: FileList) => void;
  name: string;
  isMultiple: boolean;
}

export const FileUploader = ({ handleFiles, isMultiple, name }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) handleFiles(e.target.files);
  };
  return (
    <>
      <button className="adminButton" onClick={handleClick}>
        {isMultiple ? 'Ajouter des fichiers' : 'Ajouter un fichier'}
      </button>
      <input
        type="file"
        name={name}
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        multiple={isMultiple}
      />
    </>
  );
};
