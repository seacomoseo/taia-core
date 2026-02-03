declare module 'png-to-ico' {
  const pngToIco: (input: Buffer) => Promise<Buffer>
  export default pngToIco
}
