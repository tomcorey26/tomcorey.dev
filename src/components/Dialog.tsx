import '../styles/dialog.css';

import { useEffect, useRef, useState } from 'react';
import { dialogTree } from '../constants';
import { Card } from './Card';

interface DialogOptionProps {
  option: { text: string; next: string };
  onClick: () => void;
}

const DialogOption: React.FC<DialogOptionProps> = ({ option, onClick }) => {
  return (
    <button className="dialog__option" onClick={onClick}>
      {option.text}
    </button>
  );
};

// TODO:
// rap battle with the hamster where 90s hip hop beat plays and he wears a sideways hat and timberlands
// add googly eyes to my self portrait

export const Dialog: React.FC = (props) => {
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

    // generate random number 1 - 5
    const random = () => Math.floor(Math.random() * 5) + 1;

    interval.current = setInterval(() => {
      if (charIndex < text.length) {
        // Play sound for each character (but not for spaces)
        if (text[charIndex] !== ' ') {
          audio.current = new Audio(`hamster${random()}.mp3`);
          audio.current.volume = 0.3; // Lower volume for better experience
          audio.current.play().catch(() => {}); // Ignore audio errors
        }

        setDialogText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval.current);
        setTimeout(() => setIsTalking(false), 1000);
      }
    }, 35); // Faster typing speed for better UX
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
    return <button className="hamster-button" onClick={init}>🐹 Talk to hamster</button>;
  }

  const currentDialog = dialogTree[dialogKey];
  return (
    <Card className="dialog">
      <button className="dialog__close" onClick={closeDialog}>✕</button>
      <img
        className="dialog__img"
        src="facetime-hamster.jpeg"
        alt="FaceTime hamster"
      />
      <div className="dialog__text">
        {isTalking ? (
          <p>{dialogText}_</p>
        ) : (
          currentDialog.options.map((option) => (
            <DialogOption
              key={option.text}
              option={option}
              onClick={() => talk(option.next)}
            />
          ))
        )}
      </div>
    </Card>
  );
};
