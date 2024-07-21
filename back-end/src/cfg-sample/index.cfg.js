import authService from "../services/auth.service.js";
import bedTypeService from "../services/bedType.service.js";
import extensionService from "../services/extension.service.js";
import roomTypeService from "../services/roomType.service.js";
import subExtensionService from "../services/subExtension.service.js";

import authCfg from "./auth.cfg.json" assert { type: "json" };
import bedTypeCfg from "./bedType.cfg.json" assert { type: "json" };
import extensionCfg from "./extension.cfg.json" assert { type: "json" };
import hotelCfg from "./hotelList.cfg.json" assert { type: "json" };
import roomTypeCfg from "./roomType.cfg.json" assert { type: "json" };
import subExtensionCfg from "./subExtension.cfg.json" assert { type: "json" };

async function initData() {
	await authService.initAuth(authCfg);
	await bedTypeService.initBedType(bedTypeCfg);
	await subExtensionService.initSubExtension(subExtensionCfg);
	await extensionService.initExtensions(extensionCfg);
	await roomTypeService.initRoomType(roomTypeCfg);
}

export default initData;
