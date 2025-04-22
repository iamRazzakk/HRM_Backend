// import { userService } from '../app/user/user.service';
// import { hashPassword } from '../helper/generateSalt';
// import { PrismaClient, Role, Department, Designation } from '@prisma/client';

// // Mock Prisma and hashPassword
// jest.mock('@prisma/client');
// jest.mock('./password-utils');

// const mockPrisma = {
//   user: {
//     findUnique: jest.fn(),
//     create: jest.fn(),
//   },
// };

// const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;

// describe('createUserIntoDB', () => {
//   const mockUserData:any = {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '1234567890',
//     address: '123 Main St',
//     role: Role.Employee,
//     department: Department.HR,
//     designation: Designation.USER,
//     dateOfBirth: '1990-01-01',
//     joiningDate: '2020-01-01',
//     salary: 50000,
//     profilePicture: 'profile.jpg',
//     password: 'password123',
//   };

//   const expectedCreatedUser = {
//     id: 'clxyz123456789',
//     ...mockUserData,
//     dateOfBirth: new Date(mockUserData.dateOfBirth),
//     joiningDate: new Date(mockUserData.joiningDate),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     password: 'hashedPassword123',
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (PrismaClient as jest.Mock).mockImplementation(() => mockPrisma);
//   });

//   it('should create a new user when email is not in use', async () => {
//     mockPrisma.user.findUnique.mockResolvedValue(null);
//     mockHashPassword.mockResolvedValue('hashedPassword123');
//     mockPrisma.user.create.mockResolvedValue(expectedCreatedUser);

//     const result = await userService.createUserIntoDB(mockUserData);

//     expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
//       where: { email: mockUserData.email },
//     });
    
//     expect(mockHashPassword).toHaveBeenCalledWith(mockUserData.password);
    
//     expect(mockPrisma.user.create).toHaveBeenCalledWith({
//       data: {
//         firstName: mockUserData.firstName,
//         lastName: mockUserData.lastName,
//         email: mockUserData.email,
//         phone: mockUserData.phone,
//         address: mockUserData.address,
//         role: mockUserData.role,
//         department: mockUserData.department,
//         designation: mockUserData.designation,
//         dateOfBirth: new Date(mockUserData.dateOfBirth),
//         joiningDate: new Date(mockUserData.joiningDate),
//         salary: mockUserData.salary,
//         profilePicture: mockUserData.profilePicture,
//         password: 'hashedPassword123',
//       },
//     });
    
//     expect(result).toEqual(expectedCreatedUser);
//   });

//   it('should throw an error when user with email already exists', async () => {
//     mockPrisma.user.findUnique.mockResolvedValue({
//       id: 'clxyz987654321',
//       email: mockUserData.email
//     });

//     await expect(userService.createUserIntoDB(mockUserData)).rejects.toThrow(
//       'User with this email already exists'
//     );
//   });

//   it('should use default values when optional fields are not provided', async () => {
//     const minimalUserData = {
//       firstName: 'Jane',
//       lastName: 'Smith',
//       email: 'jane.smith@example.com',
//       password: 'password123',
//     };

//     const expectedMinimalUser = {
//       id: 'clxyz987654321',
//       ...minimalUserData,
//       role: Role.Employee,
//       department: Department.HR,
//       designation: Designation.USER,
//       password: 'hashedPassword123',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     mockPrisma.user.findUnique.mockResolvedValue(null);
//     mockHashPassword.mockResolvedValue('hashedPassword123');
//     mockPrisma.user.create.mockResolvedValue(expectedMinimalUser);

//     const result = await userService.createUserIntoDB(minimalUserData);

//     expect(mockPrisma.user.create).toHaveBeenCalledWith({
//       data: {
//         firstName: minimalUserData.firstName,
//         lastName: minimalUserData.lastName,
//         email: minimalUserData.email,
//         password: 'hashedPassword123',
//         role: Role.Employee,
//         department: Department.HR,
//         designation: Designation.USER,
//       },
//     });
//   });
// });