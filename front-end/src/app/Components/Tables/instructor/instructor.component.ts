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
  isButtonsLoaded: boolean = false;

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
      this.loadInstructors();
    });
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        this.instructor = [];
        instructorList.forEach((instructor: any, key: any) => {
          if (this.columnContent.length == 0)
            this.columnContent = Object.keys(instructor);
          this.instructor.push(instructor);
        });
        if (!this.isButtonsLoaded) {
          this.isButtonsLoaded = true;
          this.columnContent.push("Actions");
        }
        //console.log(this.columnContent);
        //console.log(this.instructor);
      });
  }

  onDelete(instructorJSON: any) {
    let instructor = this.initInstructor(instructorJSON);
    console.log(instructor);
    this.instructorService.deleteInstructor(instructor).subscribe(
      (res) => {
        this.loadInstructors();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initInstructor(instructorJSON: any): Instructor {
    let instructor: Instructor = new Instructor();
    instructor.email = instructorJSON.email;
    instructor.id = instructorJSON.id.toString();
    instructor.identification = instructorJSON.identification;
    instructor.name = instructorJSON.name;
    instructor.type = instructorJSON.type;
    return instructor;
  }
}
