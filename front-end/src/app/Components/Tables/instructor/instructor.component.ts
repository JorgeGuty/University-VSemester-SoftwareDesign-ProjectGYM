import { Component, OnInit } from "@angular/core";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-instructor",
  templateUrl: "./instructor.component.html",
  styleUrls: ["./instructor.component.scss"],
})
export class InstructorComponent implements OnInit {
  instructor: Instructor[] = [];
  columnContent: string[] = ["name"];

  constructor(public instructorService: InstructorsService) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        instructorList.forEach((instructor: any, key: any) => {
          // if (this.columnContent.length == 0)
          //   this.columnContent = Object.keys(instructor);
          this.instructor.push(instructor);
        });
        console.log(this.columnContent);
        console.log(this.instructor);
      });
  }
}
