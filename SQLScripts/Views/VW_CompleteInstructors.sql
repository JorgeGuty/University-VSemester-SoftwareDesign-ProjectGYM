USE PlusGymProject ;
GO  
ALTER VIEW dbo.CompleteInstructors AS  
    SELECT 
        [instructor].Id AS InstructorID,
        [instructor].Nombre AS InstructorName,
        [instructor].Correo AS InstructorEmail,
        [instructor].Cedula AS InstructorIdentification,

        [type].Id AS TypeID,
        [type].Nombre AS Type

    FROM 
        dbo.Instructor AS [instructor]
    INNER JOIN 
        dbo.TipoInstructor AS [type]
        ON [type].Id = instructor.Tipo
    ;
GO
-- Query to test
SELECT *  
FROM dbo.CompleteInstructors
