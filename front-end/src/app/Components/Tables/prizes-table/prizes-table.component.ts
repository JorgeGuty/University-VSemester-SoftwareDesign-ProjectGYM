import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { PrizeServiceService } from "src/app/Services/Prizes/prize-service.service";

@Component({
  selector: "app-prizes-table",
  templateUrl: "./prizes-table.component.html",
  styleUrls: ["./prizes-table.component.scss"],
})
export class PrizesTableComponent implements OnInit {
  @Input()
  notifications!: any;
  @Input()
  columnContent!: any[];

  dataSource: any;

  constructor(private prizeService: PrizeServiceService) {
    console.log(this.columnContent);
  }

  ngOnInit(): void {
    console.log(this.notifications);
    this.dataSource = new MatTableDataSource(this.notifications);
  }

  notifyUser() {
    console.log("Notification send 🥧🥧🥧");
    this.prizeService.updatePrizes().subscribe(
      (res) => {
        console.log("holis");
        console.log(res);
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }

  openCalendar() {
    console.log("Calendar Opened");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.dataSource = new MatTableDataSource(this.notifications);
  }

  applyFilter(event: Event) {
    console.log("hola");
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
