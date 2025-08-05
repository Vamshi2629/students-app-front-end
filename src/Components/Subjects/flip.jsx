import { Howl } from "howler";
const flipSound = new Howl({ src: ["/page-flip.mp3"] });

const handleFlip = () => {
  flipSound.play();
};
