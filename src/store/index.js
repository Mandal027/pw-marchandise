import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: "#EFBD48",
    isLogoTexture: true,
    isfullTexture: false,
    logoDecal: "./Tshirt_logo.png",
    fullDecal: "./Tshirt_logo.png",
});

export default state;