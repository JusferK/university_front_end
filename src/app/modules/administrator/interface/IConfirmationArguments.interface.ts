import {ConfirmationService} from "primeng/api";

export interface IConfirmationArguments {
  event: Event;
  confirmationService: ConfirmationService,
  acceptHandler: () => void,
  rejectHandler?: () => void,
}
