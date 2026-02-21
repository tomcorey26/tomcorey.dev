import '../styles/dialog.css';

import { useRef, useState } from 'react';
import { dialogTree } from '../constants';
import { Card } from './Card';

interface DialogOptionProps {
  index: number;
  option: { text: string; next: string };
  onClick: () => void;
}

const DialogOption: React.FC<DialogOptionProps> = ({ index, option, onClick }) => {
  return (
    <button className="dialog__option" onClick={onClick}>
      {index}. {option.text}
    </button>
  );
};

export const Dialog: React.FC = () => {
  const [dialogText, setDialogText] = useState<string>('');
  const [dialogKey, setDialogKey] = useState<keyof typeof dialogTree>('1');
  const [active, setActive] = useState<boolean>(false);
  const [isTalking, setIsTalking] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timeout>();
  const audio = useRef<HTMLAudioElement>();

  const init = () => {
    setActive(true);
    talk('1');
  };

  const talk = (dialogKey: keyof typeof dialogTree) => {
    setIsTalking(true);
    setDialogText('');
    setDialogKey(dialogKey);

    const text = dialogTree[dialogKey].text;
    let charIndex = 0;

    const random = () => Math.floor(Math.random() * 5) + 1;

    interval.current = setInterval(() => {
      if (charIndex < text.length) {
        if (text[charIndex] !== ' ') {
          audio.current = new Audio(`hamster${random()}.mp3`);
          audio.current.volume = 0.3;
          audio.current.play().catch(() => {});
        }

        setDialogText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval.current);
        setTimeout(() => setIsTalking(false), 1000);
      }
    }, 35);
  };

  const closeDialog = () => {
    clearInterval(interval.current);
    setDialogText('');
    audio.current?.pause();
    interval.current = undefined;
    audio.current = undefined;

    setActive(false);
    setIsTalking(false);
    setDialogText('');
    setDialogKey('1');
  };

  if (!active) {
    return <button className="hamster-button" onClick={init}>&gt; TALK TO WASTELAND HAMSTER</button>;
  }

  const currentDialog = dialogTree[dialogKey];
  return (
    <Card className="dialog">
      <button className="dialog__close" onClick={closeDialog}>[X]</button>
      <img
        className="dialog__img"
        src="facetime-hamster.jpeg"
        alt="Wasteland hamster"
      />
      <div className="dialog__text">
        {isTalking ? (
          <p>{dialogText}_</p>
        ) : (
          currentDialog.options.map((option, i) => (
            <DialogOption
              key={option.text}
              index={i + 1}
              option={option}
              onClick={() => talk(option.next)}
            />
          ))
        )}
      </div>
    </Card>
  );
};
