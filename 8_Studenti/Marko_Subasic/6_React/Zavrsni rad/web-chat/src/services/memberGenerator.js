import randomColor from 'randomcolor';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export const generateMember = () => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-',
    style: 'lowerCase',
  });

  const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${name}`;

  return {
    name,
    color: randomColor(),
    avatar: avatarUrl,
  };
};
