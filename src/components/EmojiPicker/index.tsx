import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import './style.css';

interface IProps {
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ onSelect }: IProps) => {
  return (
    <Picker
      set="facebook"
      showPreview={false}
      showSkinTones={false}
      useButton={false}
      onSelect={emojiObject => onSelect(emojiObject.native)}
    />
  );
};
