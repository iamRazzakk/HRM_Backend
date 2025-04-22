
import { attendanceManagementService } from "../app/attendanceManagement/attendanceManagement.service";
import { prisma } from "../app/user/user.service";
import { presentStatus } from "../enum/presentStatus";
import { ApiError } from "../error/ApiError";

// Mock data with realistic IDs
const mockUserId = "cm9pty4rv0000eqzid1iqimgs";
const mockEmployId = "cm9pu1r6a0001eqzi44kvussu";

const mockAttendanceData: any = {
  userId: mockUserId,
  date: new Date("2023-05-15"),
  timeIn: "09:00:00",
  timeOut: "17:00:00",
  status: presentStatus.PRESENT,
  methodSignIn: "biometic",
  methodSignOut: "biometic",
  verifyStatus: true,
};

const mockEmployeeData = {
  employid: mockEmployId,
  ...mockAttendanceData,
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    id: mockUserId,
  },
};

// Mock Prisma client
jest.mock("../app/attendanceManagement/attendanceManagement.service", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    employee: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  },
}));

// Mock PrismaQueryBuilder
jest.mock("../utils/queryBuilder", () => ({
  PrismaQueryBuilder: jest.fn().mockImplementation(() => ({
    search: jest.fn().mockReturnThis(),
    filter: jest.fn().mockReturnThis(),
    paginate: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({
      where: {},
      take: 10,
      skip: 0,
    }),
    getMeta: jest.fn().mockResolvedValue({
      total: 1,
      limit: 10,
      page: 1,
      totalPages: 1,
    }),
  })),
}));

describe("Attendance Management Service - Complete Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Create Attendance Tests
  describe("createAttendanceManagementIntoDB", () => {
    it("should successfully create attendance record", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: mockUserId });
      (prisma.employee.create as jest.Mock).mockResolvedValue(mockEmployeeData);

      const result = await attendanceManagementService.createAttendanceManagementIntoDB(
        mockAttendanceData
      );

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
      expect(prisma.employee.create).toHaveBeenCalledWith({
        data: {
          user: { connect: { id: mockUserId } },
          date: mockAttendanceData.date,
          timeIn: mockAttendanceData.timeIn,
          timeOut: mockAttendanceData.timeOut,
          status: mockAttendanceData.status,
          methodSignIn: mockAttendanceData.methodSignIn,
          methodSignOut: mockAttendanceData.methodSignOut,
          verifyStatus: mockAttendanceData.verifyStatus,
        },
      });
      expect(result).toEqual(mockEmployeeData);
    });

    it("should throw error when user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        attendanceManagementService.createAttendanceManagementIntoDB(mockAttendanceData)
      ).rejects.toThrow("❌ User not found!");
    });

    it("should throw error when attendance creation fails", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: mockUserId });
      (prisma.employee.create as jest.Mock).mockResolvedValue(null);

      await expect(
        attendanceManagementService.createAttendanceManagementIntoDB(mockAttendanceData)
      ).rejects.toThrow("Failed to create attendance");
    });
  });

  // 2. Get All Attendances Tests
  describe("getAllAttendanceManagementFromDB", () => {
    const mockQuery = { page: "1", limit: "10", search: "John" };

    it("should return all attendance records with metadata", async () => {
      (prisma.employee.findMany as jest.Mock).mockResolvedValue([mockEmployeeData]);

      const result = await attendanceManagementService.getAllAttendanceManagementFromDB(
        mockQuery
      );

      expect(prisma.employee.findMany).toHaveBeenCalled();
      expect(result).toEqual({
        meta: {
          total: 1,
          limit: 10,
          page: 1,
          totalPages: 1,
        },
        getAll: [mockEmployeeData],
      });
    });

    it("should throw error when no records found", async () => {
      (prisma.employee.findMany as jest.Mock).mockResolvedValue([]);

      await expect(
        attendanceManagementService.getAllAttendanceManagementFromDB(mockQuery)
      ).rejects.toThrow(ApiError);
    });
  });

  // 3. Get Single Attendance Tests
  describe("getSingleAttendanceManagementFromDB", () => {
    it("should return single attendance record", async () => {
      (prisma.employee.findUnique as jest.Mock).mockResolvedValue(mockEmployeeData);

      const result = await attendanceManagementService.getSingleAttendanceManagementFromDB(
        mockEmployId
      );

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: { employid: mockEmployId },
      });
      expect(result).toEqual(mockEmployeeData);
    });

    it("should throw error when record not found", async () => {
      (prisma.employee.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        attendanceManagementService.getSingleAttendanceManagementFromDB(mockEmployId)
      ).rejects.toThrow(ApiError);
    });
  });

  // 4. Delete Attendance Tests
  describe("deleteAttendanceManagementFromDB", () => {
    it("should successfully delete attendance record", async () => {
      (prisma.employee.delete as jest.Mock).mockResolvedValue(mockEmployeeData);

      const result = await attendanceManagementService.deleteAttendanceManagementFromDB(
        mockEmployId
      );

      expect(prisma.employee.delete).toHaveBeenCalledWith({
        where: { employid: mockEmployId },
      });
      expect(result).toEqual(mockEmployeeData);
    });

    it("should throw error when deletion fails", async () => {
      (prisma.employee.delete as jest.Mock).mockResolvedValue(null);

      await expect(
        attendanceManagementService.deleteAttendanceManagementFromDB(mockEmployId)
      ).rejects.toThrow(ApiError);
    });
  });

  // 5. Update Attendance Tests
  describe("updateAttendanceManagementFromDB", () => {
    const updateData = {
      timeOut: "18:30:00",
      verifyStatus: false,
    };

    const updatedEmployeeData = {
      ...mockEmployeeData,
      ...updateData,
    };

    it("should successfully update attendance record", async () => {
      (prisma.employee.update as jest.Mock).mockResolvedValue(updatedEmployeeData);

      const result = await attendanceManagementService.updateAttendanceManagementFromDB(
        mockEmployId,
        updateData
      );

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: { employid: mockEmployId },
        data: updateData,
      });
      expect(result).toEqual(updatedEmployeeData);
    });

    it("should handle userId connection when provided", async () => {
      const updateWithUserId = {
        userId: "new_user_id_123",
        timeOut: "19:00:00",
      };

      (prisma.employee.update as jest.Mock).mockResolvedValue({
        ...mockEmployeeData,
        ...updateWithUserId,
      });

      await attendanceManagementService.updateAttendanceManagementFromDB(
        mockEmployId,
        updateWithUserId
      );

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: { employid: mockEmployId },
        data: {
          user: { connect: { id: "new_user_id_123" } },
          timeOut: "19:00:00",
        },
      });
    });

    it("should throw error when update fails", async () => {
      (prisma.employee.update as jest.Mock).mockResolvedValue(null);

      await expect(
        attendanceManagementService.updateAttendanceManagementFromDB(mockEmployId, updateData)
      ).rejects.toThrow(ApiError);
    });
  });
});