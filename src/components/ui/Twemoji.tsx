import React from 'react';
import twemoji from 'twemoji';

type TwemojiProps = {
   emoji: string;
   className?: string;
   size?: number;
   title?: string;
};

const Twemoji: React.FC<TwemojiProps> = ({ emoji, className, size, title }) => {
   const code = twemoji.convert.toCodePoint(emoji);
   const src = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;

   return <img src={src} className={className} width={size} height={size} alt="" aria-hidden draggable={false} title={title} />;
};

export default Twemoji;
