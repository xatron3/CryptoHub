import nums from "./helpers/numbers";
import xa from "./helpers/general";
import { setProvider } from "./helpers/web3";

import "./config/axios";
import "./config/darkmode";
import "../css/app.css";

setProvider();

window.nums = nums;
window.xa = xa;
