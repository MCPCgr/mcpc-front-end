import { App } from "vue";
import TatatongaCrud from "./TatatongaCrud.vue";

/**
 * Initialize Krud component
 * @param app vue instance
 */
export function installKrud(app: App<Element>) {
    app.component("TatatongaCrud", TatatongaCrud);
}

export default null
