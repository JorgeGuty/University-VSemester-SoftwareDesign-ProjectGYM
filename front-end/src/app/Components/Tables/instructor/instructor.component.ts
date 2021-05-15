import { Component, OnInit } from "@angular/core";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-instructor",
  templateUrl: "./instructor.component.html",
  styleUrls: ["./instructor.component.scss"],
})
export class InstructorComponent implements OnInit {
  instructorArray: any = [];

  constructor(public instructorService: InstructorsService) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        instructorList.forEach((instructor: any, key: any) => {
          this.instructorArray.push(instructor);
          console.log("Object keys");
          console.log(Object.keys(instructor));
        });
      });
  }
}
