import top_booksService from "../services/topbook";
import makeCrudModule from "./crud";

export default makeCrudModule({
  service: top_booksService,
});
