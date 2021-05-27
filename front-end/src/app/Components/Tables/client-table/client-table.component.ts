import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import Client from "src/app/Models/Clients/Client";

@Component({
  selector: "app-client-table",
  templateUrl: "./client-table.component.html",
  styleUrls: ["./client-table.component.scss"],
})
export class ClientTableComponent implements OnInit {
  @Input()
  client!: any;
  @Input()
  columnContent!: any;
  @Output()
  clientDeleted = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(client: Client) {
    console.log("Emitiendo client");
    console.log(client);
    console.log("Emitiendo client");
    this.clientDeleted.emit(client);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
