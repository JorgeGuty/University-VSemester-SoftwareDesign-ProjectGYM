import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import Service from "src/app/Models/Schedule/Service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { InstructorDetailsComponent } from "../instructor-details/instructor-details.component";
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

  openInstructorDetails(instructor: Instructor) {
    const dialogRef = this.dialog.open(InstructorDetailsComponent, {
      data: {
        instructor: instructor,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadInstructors();
    });
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        console.log(instructorList);
        this.instructor = [];
        instructorList.forEach((instructor: any, key: any) => {
          if (this.columnContent.length == 0) {
            delete instructor.services;
            this.columnContent = Object.keys(instructor);
            let indexService = this.columnContent.indexOf("services");
            console.log(indexService);
          }
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

  // TODO: implement dialogue
  onDetails(instructorJSON: any) {
    let instructor = this.initInstructor(instructorJSON);
    this.instructorService.getInstructorDetails(instructor).subscribe(
      (res) => {
        console.log(res);
        let instructor = this.initInstructor(res);
        this.openInstructorDetails(instructor);
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

    if (instructorJSON.services != null) {
      let serviceList = this.loadInstructorServices(instructorJSON);
      instructor.services = serviceList;
      console.log("Lista Instructor");
      console.log(instructor.services);
    } else {
      // Implementar pop up de que no hay servicios
      console.log(instructorJSON.services);
    }

    return instructor;
  }

  initService(serviceJson: any): Service {
    let service: Service = new Service();
    service.id = serviceJson.id;
    service.name = serviceJson.name;
    service.maxSpaces = serviceJson.max_spaces;
    service.cost = serviceJson.cost;
    return service;
  }

  loadInstructorServices(instructorJson: any): Service[] {
    let listServices: Service[] = [];
    instructorJson.services.forEach((serviceJson: any, key: any) => {
      let service = this.initService(serviceJson);
      listServices.push(service);
    });
    return listServices;
  }
}
