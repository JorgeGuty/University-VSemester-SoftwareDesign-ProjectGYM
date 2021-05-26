import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { InstructorDialogueComponent } from "../instructor-dialogue/instructor-dialogue.component";

@Component({
  selector: "app-instructor",
  templateUrl: "./instructor.component.html",
  styleUrls: ["./instructor.component.scss"],
})
export class InstructorComponent implements OnInit {
  instructor: Instructor[] = [];
  columnContent: string[] = [];

  constructor(
    public dialog: MatDialog,
    public instructorService: InstructorsService
  ) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  openDialogue() {
    const dialogRef = this.dialog.open(InstructorDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.fillScheduleData(this.dateJSON);
    });
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        instructorList.forEach((instructor: any, key: any) => {
          if (this.columnContent.length == 0)
            this.columnContent = Object.keys(instructor);
          this.instructor.push(instructor);
        });
        this.columnContent.push("Actions");
        //console.log(this.columnContent);
        //console.log(this.instructor);
      });
  }

  onDelete(instructor: any) {
    // TODO: Implement delete Instructor service
    console.log(instructor);
  }
}
