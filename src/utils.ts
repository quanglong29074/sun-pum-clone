export const getBase64 = (file: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
};

export const minimizeAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}