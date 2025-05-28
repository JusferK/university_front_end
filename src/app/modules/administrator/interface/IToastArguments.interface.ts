import { MessageService } from "primeng/api";

export interface IToastArguments {
  messageService: MessageService;
  detail: string;
  summary: string
}
