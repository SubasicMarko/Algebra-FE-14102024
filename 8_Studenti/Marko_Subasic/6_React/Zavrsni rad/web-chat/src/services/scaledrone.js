export const initScaledrone = (channelID, member) => {
  return new window.Scaledrone(channelID, { data: member });
};
