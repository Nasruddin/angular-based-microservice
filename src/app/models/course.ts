export interface Course {
    courseId: string,
    courseName: string,
    description: string,
    duration: number,
    type: string,
    totalSeats: number,
    availableSeats: number,
    expired: boolean,
    featured: boolean,
    trending: boolean
}