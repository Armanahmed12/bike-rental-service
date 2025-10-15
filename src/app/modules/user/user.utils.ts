// import { User } from './user.model.js';

// const findLastStudentId = async (
//   semesterYear: string,
//   semesterCode: string
// ) => {
//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//       id: { $regex: new RegExp(`^${semesterYear}${semesterCode}`) },
//     },
//     {
//       id: 1,
//       _id: 0,
//     }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
// };
