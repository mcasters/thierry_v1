import React, { useRef } from 'react';

interface Props {
  handleFile: (filesUploaded: FileList) => void;
  name: string;
  isMultiple: boolean;
}

export const FileUploader = ({ handleFile, isMultiple, name }: Props) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    handleFile(e.target.files);
  };
  return (
    <>
      <button className="button-upload" onClick={handleClick}>
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
