import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-instructor-table",
  templateUrl: "./instructor-table.component.html",
  styleUrls: ["./instructor-table.component.scss"],
})
export class InstructorTableComponent implements OnInit {
  @Input()
  instructor!: any;
  @Input()
  columnContent!: any;
  @Output()
  instructorDeleted = new EventEmitter<any>();
  @Output()
  instructorDetails = new EventEmitter<any>();

  dataSource: any;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.instructor);
  }

  onDelete(instructor: Instructor) {
    this.instructorDeleted.emit(instructor);
  }

  onDetails(instructor: Instructor) {
    this.instructorDetails.emit(instructor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
