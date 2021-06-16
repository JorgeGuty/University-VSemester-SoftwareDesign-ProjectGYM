import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
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

  dataSource: any;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.client);
  }

  onDelete(client: Client) {
    console.log("Emitiendo client");
    console.log(client);
    console.log("Emitiendo client");
    this.clientDeleted.emit(client);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.dataSource = new MatTableDataSource(this.client);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
