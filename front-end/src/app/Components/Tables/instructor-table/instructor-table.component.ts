import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { Output, EventEmitter } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}

  onDelete(instructor: Instructor) {
    this.instructorDeleted.emit(instructor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
