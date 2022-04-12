import booksService from "../services/book";
import makeCrudModule from "./crud";

export default makeCrudModule({
  service: booksService,
});
