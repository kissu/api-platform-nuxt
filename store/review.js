import reviewsService from "../services/review";
import makeCrudModule from "./crud";

export default makeCrudModule({
  service: reviewsService,
});
