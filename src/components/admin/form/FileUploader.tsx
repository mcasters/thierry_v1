import React, { useRef } from 'react';

interface Props {
  handleFile: (filesUploaded: FileList) => void;
  name: string;
  isMultiple: boolean;
}

export const FileUploader = ({ handleFile, isMultiple, name }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>();

  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    handleFile(e.target.files);
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
