import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/FileUploader';

type Props = {
  existantImageSrc?: string;
  setHasImage: (boolean) => void;
  reset: number;
};

export default function SingleImageForm({
  existantImageSrc,
  setHasImage,
  reset,
}: Props) {
  const [newImage, setNewImage] = useState<string>('');

  useEffect(() => {
    setHasImage(existantImageSrc || newImage !== '');
  }, [newImage]);

  useEffect(() => {
    setNewImage('');
  }, [reset]);

  const getPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length) {
      const file = filesUploaded[0];
      if (file) {
        setNewImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <>
      <h4 className={s.separate}>Image :</h4>
      {existantImageSrc && (
        <div className={s.imageContainer}>
          <Image
            src={`${existantImageSrc}`}
            alt="image"
            layout="fill"
            sizes="150px"
            className={s.image}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADOElEQVR4nO2bu2oVURSGv5g0YtQUFrY+gResxEoDVjaWvoSVIqghD2Bjl4BVtDjkYGXjE/gGFhaGVIKXIrVilmzYgWM8l5mT2Wetnfl/+CFhOJk1+1uX2XMmIEmSJEmSJEmSJElSLJlMpDVwD0BGQCxwIrgHICMgFjgR3AOQERALnAjuAcgIiAVOBPcAZATEAieCewAyAmKBE8E9ABkBscCJ4B6AjIBY4ERwD0BGQKxhInwDngHXgHPZ14Hn+ZgqhMVV1C5wfspX3+nYUC2LhcFYavA+wlIBKOrh/N+mplXGcV0AvgsIxRIpzYy2eiEgFANydQ4gadCrZVEGyOocQFKLExDKAGkzP0bnSHggvwv+bSvotOc4dS1rANwDDgMssLV02vS11UZkIAnGSg50K8ACW+Hb3ovAj6hARmGQL2w/wCJbSw9bbAzfdXzuYjCOtF5p6xrmYT2tMrqG0RmQSTCouHVZ3oGnTd+NfDu8mn/e6LhNdQpkdwYM8lPSLwEW2Cpw55WRfn85ZjDW2rqsFiDjKmMZeJuPb52i1mXRgcyCYbka0l5ErYuyQJrAOPL+mNZ1R62LzoBMmhmDKZ8Z17q2G57vsOPvGmpwkcqwOVvXV+A9sAncBy7lc7wJsFChgMxTGbNa13qG/AS4C6yNqaR5zlW7i1VGk9bVRss9qZSFwJjUugSF5kBO2qaatq5RreX29TifZ7tADNFdvDKOOy0y+cHdbeARsAN8Av5MeMi30qP2tZDKON669lp+ZtCjSllYZZzUw55UShUwbAqUtjoLvIoOpAYY1iGUpAfAz4hAaoJhHUO5DHyIBqTWYTnoCMoZ4CnwKwqQmirDTuh0d3drApibwOcAMfYGho28wLeZrzfiwO8VDBvxR+BKwIHfSxiWfQA8DDbwqxjgVtivJ7z17jHw3RcjiveCDHz3hahl4C9M3otQ28AvLu+Lr3HgF5X3hUf3zpz/5iYgnA67ByAjIBY4EdwDkBEQC5wI7gHICIgFTgT3AGQExAIngnsAMgJigRPBPQAZAbHAieAegIyAWOBEcA9ARkAscCK4ByAjIBY4EdwDkPkXiCRJkiRJkiRJkiRJBNFfoXWi9Mu7THgAAAAASUVORK5CYII="
          />
        </div>
      )}
      <FileUploader name="file" handleFile={getPreview} isMultiple={false} />
      {newImage !== '' && (
        <div className={s.imageContainer}>
          <Image
            src={newImage}
            alt="image"
            layout="fill"
            sizes="150px"
            className={s.image}
          />
        </div>
      )}
    </>
  );
}
